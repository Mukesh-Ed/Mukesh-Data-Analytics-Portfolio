import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const __dirname = process.cwd();

const PORT = Number(process.env.PORT || 3000);

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "n.mukesh8072@gmail.com";

const app = express();

app.use(express.json({ limit: "1mb" }));

/* =========================================================
   GEMINI CONFIGURATION
   ========================================================= */

const getAi = (): GoogleGenAI | null => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "mukesh-portfolio",
      },
    },
  });
};

/*
 * Gemini 3.8 Flash is the primary model.
 * 3.7 and 3.6 are fallback models.
 *
 * You can override the first model through .env:
 *
 * GEMINI_MODEL=gemini-3.8-flash
 */
const PRIMARY_MODEL =
  process.env.GEMINI_MODEL || "gemini-3.8-flash";

const FALLBACK_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
];

const GEMINI_MODELS = [
  PRIMARY_MODEL,
  ...FALLBACK_MODELS.filter(
    (model) => model !== PRIMARY_MODEL
  ),
];

/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getErrorText = (error: any): string => {
  return String(
    error?.message ||
      error?.error?.message ||
      error ||
      ""
  ).toLowerCase();
};

/*
 * Retry only temporary errors.
 *
 * 429 = rate/quota pressure
 * 408 = request timeout
 * 500+ = temporary server errors
 *
 * Do NOT retry permanent errors such as:
 * 400 = bad request
 * 401/403 = authentication/permission
 * 404 = invalid/unavailable model
 */
const isRetryableGeminiError = (error: any): boolean => {
  const text = getErrorText(error);

  return (
    text.includes("429") ||
    text.includes("resource exhausted") ||
    text.includes("rate limit") ||
    text.includes("408") ||
    text.includes("timeout") ||
    text.includes("500") ||
    text.includes("502") ||
    text.includes("503") ||
    text.includes("504") ||
    text.includes("unavailable") ||
    text.includes("overloaded") ||
    text.includes("high demand")
  );
};

/*
 * Generate Gemini content with:
 *
 * 1. Retry
 * 2. Exponential backoff
 * 3. Small random jitter
 * 4. Automatic model fallback
 */
const generateWithRetry = async (
  ai: GoogleGenAI,
  contents: string,
  config?: any
): Promise<any> => {
  let lastError: any = null;

  /*
   * Maximum 3 attempts per model.
   */
  const MAX_ATTEMPTS = 2;

  for (const model of GEMINI_MODELS) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        console.log(
          `[Gemini] model=${model} attempt=${attempt}/${MAX_ATTEMPTS}`
        );

        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            thinkingConfig: {
              thinkingLevel: "low",
            },
            ...(config || {}),
          },
        });

        console.log(
          `[Gemini] Success using ${model}`
        );

        return response;
      } catch (error: any) {
        lastError = error;

        console.error(
          `[Gemini] ${model} attempt ${attempt} failed:`,
          error?.message || error
        );

        /*
         * Permanent error:
         * Don't waste time retrying.
         */
        if (!isRetryableGeminiError(error)) {
          throw error;
        }

        /*
         * If this was the last attempt for this model,
         * move to the next fallback model.
         */
        if (attempt === MAX_ATTEMPTS) {
          console.warn(
            `[Gemini] ${model} failed after ${MAX_ATTEMPTS} attempts.`
          );

          break;
        }

        /*
         * Exponential backoff:
         *
         * attempt 1 → ~2 seconds
         * attempt 2 → ~4 seconds
         * attempt 3 → ~8 seconds
         *
         * Small random jitter prevents repeated
         * requests from happening at exactly
         * the same time.
         */
        const baseDelay =
          2000 * Math.pow(2, attempt - 1);

        const jitter = Math.floor(
          Math.random() * 1000
        );

        const delay = baseDelay + jitter;

        console.log(
          `[Gemini] Retrying ${model} in ${delay}ms...`
        );

        await sleep(delay);
      }
    }

    console.warn(
      `[Gemini] Switching from ${model} to next fallback model...`
    );
  }

  throw (
    lastError ||
    new Error(
      "All Gemini models are temporarily unavailable."
    )
  );
};

/* =========================================================
   HEALTH CHECK
   ========================================================= */

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    geminiConfigured: Boolean(
      process.env.GEMINI_API_KEY
    ),
    primaryModel: PRIMARY_MODEL,
    availableModels: GEMINI_MODELS,
  });
});

/* =========================================================
   AI ASSISTANT
   ========================================================= */

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const ai = getAi();

    if (!ai) {
      return res.status(503).json({
        error:
          "Gemini is not configured. Add GEMINI_API_KEY to the server environment.",
      });
    }

    const systemInstruction = `
You are Mukesh's portfolio AI assistant.

Your job is to answer questions about Mukesh's
education, skills, training, internship, projects,
and career interests.

IMPORTANT RULES:
- Use ONLY the profile information provided below.
- Never invent jobs.
- Never invent companies.
- Never invent degrees.
- Never invent certifications.
- Never invent project results or metrics.
- Never claim Mukesh has professional experience that is not listed.
- If information is not listed, clearly say:
  "That information is not listed in Mukesh's portfolio."
- Keep answers friendly, concise and professional.
- Do not make up salary information.
- Do not make up years of experience.

MUKESH N.

Location:
Coimbatore, Tamil Nadu, India

Career Focus:
- Data Analyst
- Python Developer
- AI/ML opportunities
- GenAI roles
- IT fresher opportunities

Education:
B.Sc Computer Science
VLB Janakiammal College of Arts and Science,
Coimbatore
CGPA: 8.0
Status: Completed

Training:
Data Analytics with Python and GenAI
Anudip Foundation
3-month training course
Status: Completed

Internship:
Full Stack Development Intern
Accent Techno Soft
May 2025 – June 2025

Technologies used:
- HTML
- CSS
- Bootstrap
- PHP
- MySQL

Academic Paper:
"Malware Analysis Using WannaCry Ransomware Attack"
Presented at NCCTIS 2025.

Technical Skills:
- Python
- Excel
- SQL
- MySQL
- Power BI
- Tableau basics
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Scikit-learn
- GenAI
- Gemini API
- ChromaDB
- RAG
- FastAPI
- Flask
- Streamlit
- HTML
- CSS
- Bootstrap
- PHP
- Git
- GitHub
- Docker
- Postman

Projects:

1. AI-Powered Packaging Industry Operations Control Tower

Description:
An AI-powered packaging industry analytics and
operations monitoring project focused on anomaly
detection, risk prediction, root-cause analysis and
operational decision support.

2. Local Business Profit Leak Detector

Description:
A data analytics application designed to identify
possible business profit leaks and provide insights
for improving business performance.

3. SmartInventory AI

Description:
An AI-based inventory intelligence project that
helps identify inventory expiry risks, demand patterns,
revenue at risk and inventory-related decisions.

4. SmartStudy Planner AI

Description:
An AI-based study planning application designed
to help users organize learning activities and
create structured study plans.

GitHub:
https://github.com/Mukesh-Ed

Contact:
n.mukesh8072@gmail.com
`;

    const response = await generateWithRetry(
      ai,
      message.trim(),
      {
        systemInstruction,
      }
    );

    const reply =
      response?.text ||
      "Sorry, I couldn't generate a response right now.";

    return res.json({
      reply,
    });
  } catch (err: any) {
    console.error(
      "[Chat Error]",
      err?.message || err
    );

    const errorText = getErrorText(err);

    if (
      errorText.includes("401") ||
      errorText.includes("403") ||
      errorText.includes("api key")
    ) {
      return res.status(502).json({
        error:
          "Gemini API authentication failed. Please check your GEMINI_API_KEY.",
      });
    }

    if (
      errorText.includes("404") ||
      errorText.includes("not found")
    ) {
      return res.status(502).json({
        error:
          "The configured Gemini model is unavailable. Please check GEMINI_MODEL.",
      });
    }

    if (
      errorText.includes("503") ||
      errorText.includes("unavailable") ||
      errorText.includes("high demand")
    ) {
      return res.status(503).json({
        error:
          "Gemini is temporarily busy. The portfolio tried multiple models and retries. Please try again shortly.",
      });
    }

    if (
      errorText.includes("429") ||
      errorText.includes("resource exhausted")
    ) {
      return res.status(429).json({
        error:
          "Gemini request limit was reached temporarily. Please try again shortly.",
      });
    }

    return res.status(500).json({
      error:
        "Failed to generate AI response. Please try again.",
    });
  }
});

/* =========================================================
   PYTHON RUNNER
   ========================================================= */

app.post("/api/python-runner", async (req, res) => {
  try {
    const { code } = req.body;

    if (
      !code ||
      typeof code !== "string" ||
      !code.trim()
    ) {
      return res.status(400).json({
        error: "Python code is required",
      });
    }

    const ai = getAi();

    /*
     * If Gemini is not configured, keep the existing
     * demo behaviour.
     */
    if (!ai) {
      return res.json({
        output:
          ">>> Simulated Python runner\n" +
          "[SUCCESS] Demo simulation completed.",
      });
    }

    const prompt = `
Simulate the stdout/result of the following
Python code snippet.

IMPORTANT:
- Do NOT claim that you actually executed the code.
- This is only a simulation for a portfolio demo.
- Explain the expected output concisely.
- If the code has an obvious error, explain the likely error.

Python code:

${code}
`;

    const response = await generateWithRetry(
      ai,
      prompt
    );

    return res.json({
      output:
        response?.text ||
        "No simulated output was generated.",
    });
  } catch (err: any) {
    console.error(
      "[Python Runner Error]",
      err?.message || err
    );

    return res.status(500).json({
      error:
        "Could not generate the Python simulation. Please try again.",
    });
  }
});

/* =========================================================
   CONTACT FORM / GMAIL SMTP
   ========================================================= */

app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    /*
     * Validate required fields.
     */
    if (
      !name ||
      !email ||
      !message
    ) {
      return res.status(400).json({
        error:
          "Name, email and message are required.",
      });
    }

    /*
     * Basic email validation.
     */
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please enter a valid email address.",
      });
    }

    const smtpUser =
      process.env.GMAIL_USER;

    const smtpPass =
      process.env.GMAIL_APP_PASSWORD;

    /*
     * Check Gmail configuration.
     */
    if (!smtpUser || !smtpPass) {
      return res.status(503).json({
        error:
          "Email delivery is not configured yet. Add GMAIL_USER and GMAIL_APP_PASSWORD to the server environment.",
      });
    }

    /*
     * Create Gmail SMTP transporter.
     */
    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

    /*
     * Verify SMTP connection before sending.
     */
    await transporter.verify();

    /*
     * Send enquiry to Mukesh's Gmail.
     */
    await transporter.sendMail({
      from: smtpUser,

      to: CONTACT_TO_EMAIL,

      replyTo: email,

      subject:
        `[Portfolio] ${
          subject || "New enquiry"
        }`,

      text: `
New portfolio enquiry

Name:
${name}

Email:
${email}

Subject:
${subject || ""}

Message:
${message}

--------------------------------
Sent from Mukesh's Portfolio
      `.trim(),
    });

    console.log(
      `[Contact] Email sent successfully from ${email}`
    );

    return res.json({
      ok: true,
      message:
        "Your message has been sent successfully.",
    });
  } catch (err: any) {
    console.error(
      "[Contact Email Error]",
      err?.message || err
    );

    return res.status(500).json({
      error:
        "Could not send the email. Check the Gmail SMTP settings and App Password.",
    });
  }
});

/* =========================================================
   SERVE FRONTEND
   ========================================================= */

/* =========================================================
   SERVE FRONTEND + START SERVER
   ========================================================= */

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");

    app.use(express.static(distPath));

    app.use((req, res, next) => {
      if (req.method !== "GET") {
        return next();
      }

      res.sendFile(path.join(distPath, "index.html"), (err) => {
        if (err) {
          next(err);
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`[Gemini] Primary model: ${PRIMARY_MODEL}`);
    console.log(`[Gemini] Fallback models: ${FALLBACK_MODELS.join(", ")}`);
    console.log(`[Email] Contact destination: ${CONTACT_TO_EMAIL}`);
  });
}

startServer().catch((error) => {
  console.error("[Server Startup Error]", error);
  process.exit(1);
});
