import React, { useState } from "react";
import { Project } from "../types";

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenContact: () => void;
}

const projects: Project[] = [
  {
    id: "packaging-control-tower",
    title: "AI-Powered Packaging Industry Operations Control Tower",
    category: "AI Applications",
    description:
      "An end-to-end operations control tower for packaging data, anomaly detection, risk prediction, root-cause analysis and AI-assisted operational insights.",
    longDescription:
      "A capstone project built around packaging-industry operations data. The workflow combines data cleaning, exploratory analysis, Isolation Forest anomaly detection, risk prediction, MySQL, ChromaDB-based retrieval, Gemini, FastAPI, Streamlit and real-time simulation.",
    tags: ["Python", "Pandas", "Scikit-learn", "MySQL", "ChromaDB", "Gemini", "FastAPI", "Streamlit"],
    featured: true,
    demoUrl: "https://ai-powered-packaging-industry-operations-control-tower-anudip.streamlit.app/",
    metrics: [
      { label: "Detection", value: "Anomaly + Risk" },
      { label: "AI Layer", value: "Gemini + RAG" },
      { label: "Interface", value: "Streamlit" },
    ],
    caseStudy: {
      overview:
        "Packaging operations data can contain machine anomalies, downtime patterns and operational risks that are difficult to inspect manually.",
      challenge:
        "The project needed a practical workflow that moves from raw operational data to anomaly detection, risk signals, root-cause analysis and an interactive control-tower view.",
      solution:
        "Built a staged pipeline covering data understanding, cleaning, EDA, feature engineering, Isolation Forest anomaly detection, risk prediction, MySQL storage, ChromaDB retrieval, Gemini-assisted analysis, FastAPI endpoints, Streamlit UI and real-time simulation.",
      results: [
        "Interactive machine and anomaly monitoring workflow",
        "AI-assisted retrieval and root-cause analysis flow",
        "Real-time simulation connected to the Streamlit control tower",
      ],
      techStack: ["Python", "Pandas", "Scikit-learn", "MySQL", "ChromaDB", "Gemini", "FastAPI", "Streamlit", "Docker"],
      sampleCode: `from sklearn.ensemble import IsolationForest\n\nmodel = IsolationForest(\n    n_estimators=100,\n    contamination="auto",\n    random_state=42\n)\n\nanomaly_results = model.fit_predict(X)\n`,
      chartData: [
        { name: "Normal", value1: 72, value2: 68 },
        { name: "Warning", value1: 18, value2: 20 },
        { name: "Critical", value1: 10, value2: 12 },
      ],
    },
  },
  {
    id: "profit-leak-detector",
    title: "Local Business Profit Leak Detector",
    category: "Data Analytics",
    description:
      "A Streamlit analytics application that explores business data, identifies potential profit leakage patterns and presents actionable insights.",
    longDescription:
      "The project focuses on practical business analytics: understanding sales and cost data, finding patterns that may reduce profitability, and presenting the findings through an interactive application.",
    tags: ["Python", "Pandas", "Data Analysis", "Streamlit"],
    demoUrl: "https://mukesh-ed-local-business-profit-leak-detector-app-a5mytu.streamlit.app/",
    metrics: [
      { label: "Focus", value: "Profit Analysis" },
      { label: "Workflow", value: "EDA + Insights" },
      { label: "Interface", value: "Streamlit" },
    ],
    caseStudy: {
      overview:
        "Small and local businesses need a simple way to understand where revenue, cost and margin patterns may be affecting profitability.",
      challenge:
        "The challenge was to turn business records into an easy-to-understand analytical view instead of relying only on raw tables.",
      solution:
        "Created an interactive Streamlit workflow for data exploration, profitability analysis and insight presentation.",
      results: [
        "Interactive business analysis experience",
        "Profit and cost patterns presented visually",
        "Action-oriented insights for business review",
      ],
      techStack: ["Python", "Pandas", "Data Analysis", "Streamlit"],
      sampleCode: `import pandas as pd\n\ndf = pd.read_csv("business_data.csv")\ndf["profit"] = df["revenue"] - df["cost"]\nsummary = df.groupby("category")["profit"].sum()\n`,
      chartData: [
        { name: "Sales", value1: 82, value2: 70 },
        { name: "Costs", value1: 58, value2: 62 },
        { name: "Profit", value1: 64, value2: 48 },
      ],
    },
  },
  {
    id: "smartinventory-ai",
    title: "SmartInventory AI",
    category: "Python AI",
    description:
      "An AI-assisted inventory and expiry-risk application for identifying products at risk before sale and supporting recovery actions.",
    longDescription:
      "SmartInventory AI analyses inventory and expiry-related signals to surface risk, revenue at risk, inventory health, demand level and recovery recommendations.",
    tags: ["Python", "Pandas", "Scikit-learn", "Gemini", "Streamlit", "SQL"],
    demoUrl: "https://smartinventory-ai-gkwjsp843me6dkzgh4t5pv.streamlit.app/",
    metrics: [
      { label: "Focus", value: "Expiry Risk" },
      { label: "AI", value: "Prediction + Recommendations" },
      { label: "Interface", value: "Streamlit" },
    ],
    caseStudy: {
      overview:
        "Inventory teams need early visibility into products that may expire before sale so that corrective actions can be considered in time.",
      challenge:
        "The project combines inventory health, expiry, demand and financial signals into one practical decision-support workflow.",
      solution:
        "Built an AI-assisted pipeline that analyses inventory data, derives risk indicators and supports actions such as discounting, stock transfer, reorder decisions and promotions.",
      results: [
        "Expiry-risk products surfaced for review",
        "Revenue-at-risk and inventory-health indicators included",
        "Recommendation workflow supports operational decision making",
      ],
      techStack: ["Python", "Pandas", "Scikit-learn", "SQL", "Gemini", "Streamlit"],
      sampleCode: `risk_score = (\n    expiry_risk * 0.45\n    + demand_risk * 0.35\n    + inventory_risk * 0.20\n)\n\nstatus = "High Risk" if risk_score >= 0.70 else "Review"\n`,
      chartData: [
        { name: "Health", value1: 80, value2: 65 },
        { name: "Demand", value1: 68, value2: 60 },
        { name: "Recovery", value1: 74, value2: 52 },
      ],
    },
  },
  {
    id: "smartstudy-planner",
    title: "SmartStudy Planner AI",
    category: "AI Applications",
    description:
      "An AI-powered study planning application designed to turn learning goals and available time into a practical study plan.",
    longDescription:
      "SmartStudy Planner AI focuses on personalised planning, revision support and structured study sessions through an interactive application.",
    tags: ["Python", "GenAI", "Streamlit", "AI"],
    demoUrl: "https://smartstudy-planner-ai.streamlit.app/",
    metrics: [
      { label: "Focus", value: "Study Planning" },
      { label: "AI", value: "GenAI" },
      { label: "Interface", value: "Streamlit" },
    ],
    caseStudy: {
      overview:
        "Students often need help converting subjects, deadlines and available study time into a manageable routine.",
      challenge:
        "The application needs to produce useful planning guidance while keeping the experience simple for a student user.",
      solution:
        "Built an interactive AI-assisted planner for study schedules, revision planning and learning support.",
      results: [
        "Interactive study planning workflow",
        "AI-assisted planning and revision support",
        "Simple Streamlit interface for practical use",
      ],
      techStack: ["Python", "GenAI", "Streamlit", "AI"],
      sampleCode: `def build_plan(subjects, hours_per_day):\n    sessions = max(1, int(hours_per_day))\n    return [\n        {"subject": subject, "session": i + 1}\n        for i, subject in enumerate(subjects[:sessions])\n    ]\n`,
      chartData: [
        { name: "Plan", value1: 90, value2: 72 },
        { name: "Revision", value1: 76, value2: 60 },
        { name: "Practice", value1: 82, value2: 64 },
      ],
    },
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onOpenContact,
}) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Data Analytics", "Python AI", "AI Applications"];
  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="py-20 px-5 md:px-16 max-w-[1280px] mx-auto" id="projects">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <p className="text-xs text-[#2fd9f4] font-mono-code uppercase tracking-widest mb-2"># PROJECT_SHOWCASE</p>
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-[#dce1fb]">Projects I Built</h2>
          <p className="text-sm text-[#c2c6d6] mt-3 max-w-2xl">Real projects with live demos. No placeholder case studies.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-2 rounded-lg text-xs font-mono-code border transition-all ${activeFilter === filter ? "bg-[#adc6ff] text-[#001a42] border-[#adc6ff]" : "bg-white/5 text-[#c2c6d6] border-white/10 hover:border-[#adc6ff]/40"}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((project) => (
          <article key={project.id} className="glass-card rounded-3xl border border-white/10 p-6 hover:-translate-y-1 transition-transform">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] text-[#2fd9f4] font-mono-code uppercase tracking-wider mb-2">{project.category}</p>
                <h3 className="font-headline text-xl font-bold text-[#dce1fb]">{project.title}</h3>
              </div>
              {project.featured && <span className="text-[10px] px-2 py-1 rounded-full bg-[#2fd9f4]/10 text-[#2fd9f4] border border-[#2fd9f4]/20">Featured</span>}
            </div>
            <p className="text-sm text-[#c2c6d6] leading-relaxed mt-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-[#adc6ff]">{tag}</span>)}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-5">
              {project.metrics?.map((metric) => (
                <div key={metric.label} className="bg-[#070d1f]/70 rounded-xl p-3 border border-white/5">
                  <div className="text-sm font-bold text-[#dce1fb]">{metric.value}</div>
                  <div className="text-[9px] text-[#c2c6d6]/70 uppercase tracking-wider mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => onSelectProject(project)} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#dce1fb] text-xs font-bold hover:bg-white/10">View Case Study</button>
              {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="px-4 py-2.5 rounded-xl bg-[#adc6ff] text-[#001a42] text-xs font-bold hover:shadow-lg">Live Demo ↗</a>}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-[#c2c6d6] mb-3">Interested in working together?</p>
        <button onClick={onOpenContact} className="text-[#2fd9f4] text-sm font-bold hover:underline">Start a conversation →</button>
      </div>
    </section>
  );
};
