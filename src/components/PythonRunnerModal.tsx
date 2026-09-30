import React, { useState } from "react";

interface PythonRunnerModalProps {
  isOpen: boolean;
  initialCode?: string;
  onClose: () => void;
}

export const PythonRunnerModal: React.FC<PythonRunnerModalProps> = ({
  isOpen,
  initialCode,
  onClose,
}) => {
  const defaultCode =
    initialCode ||
    `import pandas as pd
import numpy as np

# Simulate customer transaction dataset
np.random.seed(42)
data = {
    'transaction_id': [f'TXN_{i}' for i in range(1001, 1006)],
    'amount': np.random.uniform(20.0, 500.0, 5).round(2),
    'category': ['Retail', 'Tech', 'Services', 'Retail', 'Tech']
}

df = pd.DataFrame(data)
print("--- Raw Ingested Data ---")
print(df)

print("\n--- Analytics Summary ---")
print(f"Total Revenue: \${df['amount'].sum():,.2f}")
print(f"Average Order: \${df['amount'].mean():,.2f}")`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  if (!isOpen) return null;

  const handleRun = async () => {
    setRunning(true);
    setOutput(">>> Initializing Python 3.11 Runtime Sandbox...\n>>> Executing dependencies (Pandas, NumPy, Scikit-Learn)...");

    try {
      const res = await fetch("/api/python-runner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (data.output) {
        setOutput(data.output);
      } else {
        throw new Error(data.error || "Failed to execute script");
      }
    } catch (err: any) {
      setOutput(`[Python Runtime Error]: ${err.message || "Failed to execute Python script."}`);
    } finally {
      setRunning(false);
    }
  };

  const presets = [
    {
      name: "Pandas Data Pipeline",
      code: `import pandas as pd
df = pd.DataFrame({
  "Month": ["Jan", "Feb", "Mar", "Apr"],
  "Revenue": [12000, 15400, 18900, 24500]
})
df["Growth_%"] = df["Revenue"].pct_change() * 100
print(df)`,
    },
    {
      name: "LSTM Neural Model",
      code: `import torch
import torch.nn as nn
print("PyTorch Version:", torch.__version__)
print("CUDA Available:", torch.cuda.is_available())
print("Model initialized: LSTM(12 inputs, 64 hidden units)")`,
    },
    {
      name: "FastAPI Route Test",
      code: `from fastapi import FastAPI
app = FastAPI(title="Mukesh AI Pipeline")

@app.get("/api/health")
def health():
    return {"status": "ACTIVE", "uptime": "99.98%"}

print("Route registered: GET /api/health -> 200 OK")`,
    },
  ];

  return (
    <div className="fixed inset-0 z-[160] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="glass-card w-full max-w-4xl h-[650px] rounded-3xl border border-[#2fd9f4]/30 shadow-2xl flex flex-col overflow-hidden animate-reveal my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#151b2d] border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2fd9f4]/20 border border-[#2fd9f4]/40 flex items-center justify-center text-[#2fd9f4]">
              <span className="material-symbols-outlined text-2xl">
                terminal
              </span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-[#dce1fb] flex items-center gap-2">
                Live Python Code Runner
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono-code">
                  Python 3.11
                </span>
              </h3>
              <p className="text-xs text-[#c2c6d6]/70">
                Interactive environment to test Mukesh's code snippets
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#c2c6d6] hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Preset Selector */}
        <div className="px-5 py-2.5 bg-[#0c1324] border-b border-white/5 flex gap-2 overflow-x-auto items-center">
          <span className="text-xs text-[#c2c6d6] font-mono-code whitespace-nowrap mr-2">
            Presets:
          </span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setCode(p.code)}
              className="text-[11px] bg-[#191f31] hover:bg-[#23293c] text-[#adc6ff] px-3 py-1 rounded-lg border border-white/10 whitespace-nowrap cursor-pointer transition-all"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Editor & Terminal Split Screen */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Code Editor */}
          <div className="p-4 bg-[#070d1f] flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
            <label className="text-xs font-mono-code text-[#c2c6d6] mb-2 flex justify-between">
              <span>script.py</span>
              <span className="text-[#c2c6d6]/50">Editable</span>
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full bg-[#0c1324] p-4 rounded-xl font-mono-code text-xs text-[#adc6ff] border border-white/10 focus:outline-none focus:border-[#2fd9f4] resize-none leading-relaxed"
            />
          </div>

          {/* Terminal Output */}
          <div className="p-4 bg-[#020617] flex flex-col justify-between">
            <div className="flex-1 flex flex-col">
              <label className="text-xs font-mono-code text-[#2fd9f4] mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  output
                </span>
                Stdout / Terminal Output
              </label>
              <div className="flex-1 bg-black/60 p-4 rounded-xl font-mono-code text-xs text-emerald-400 border border-white/10 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {output || ">>> Click 'Run Code' to execute script..."}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="p-4 bg-[#151b2d] border-t border-white/10 flex justify-between items-center">
          <button
            onClick={() => {
              setCode("");
              setOutput("");
            }}
            className="text-xs text-[#c2c6d6] hover:text-white px-3 py-2"
          >
            Clear Screen
          </button>

          <button
            onClick={handleRun}
            disabled={running || !code.trim()}
            className="px-6 py-3 bg-[#2fd9f4] text-[#001a42] rounded-xl font-bold text-xs hover:shadow-[0_0_20px_rgba(47,217,244,0.4)] transition-all disabled:opacity-40 cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">
              {running ? "sync" : "play_arrow"}
            </span>
            {running ? "Executing..." : "Run Code"}
          </button>
        </div>
      </div>
    </div>
  );
};
