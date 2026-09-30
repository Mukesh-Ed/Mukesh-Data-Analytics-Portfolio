import React, { useState, useEffect } from "react";

interface HeroSectionProps {
  onOpenPythonRunner: (initialCode?: string) => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPythonRunner,
  onOpenResume,
}) => {
  const roles = [
    "Automation Expert",
    "Data Analyst",
    "Python Developer",
    "ML Engineer",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, [roles.length]);

  const samplePythonCode = `import pandas as pd
from sklearn import metrics

def solve_problem(data):
    analysis = data.clean().analyze()
    return analysis.visualize()

# Running professional_profile...
Status: READY_FOR_HIRE
Location: Coimbatore, Tamil Nadu`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(samplePythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="min-h-screen flex items-center pt-28 pb-16 px-5 md:px-16 max-w-[1280px] mx-auto overflow-hidden relative"
      id="home"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Column */}
        <div className="animate-reveal">
          <span className="text-[#2fd9f4] font-mono-code text-sm tracking-widest mb-4 block">
            GREETINGS_SYSTEM.LOG()
          </span>

          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#dce1fb] mb-6 leading-tight">
            Hi, I'm <span className="text-[#adc6ff] glow-text">Mukesh</span>
            <br />
            <span
              className={`text-[#c2c6d6] inline-block transition-opacity duration-300 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {roles[roleIndex]}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#c2c6d6] mb-10 max-w-xl leading-relaxed">
            I am a Computer Science graduate focused on Data Analytics, Python development and practical AI/ML applications. I build projects that turn data into useful insights and decision-support tools.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-[#adc6ff] text-[#001a42] px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(173,198,255,0.3)] transition-all cursor-pointer active:scale-95 text-sm"
            >
              View Projects{" "}
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </a>
            <button
              onClick={onOpenResume}
              className="border border-[#adc6ff]/30 bg-white/5 backdrop-blur-md text-[#adc6ff] px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all cursor-pointer text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">description</span>
              Download Resume
            </button>
          </div>
        </div>

        {/* Right Column: Code Terminal Card */}
        <div className="relative animate-reveal">
          <div className="absolute inset-0 bg-[#adc6ff]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="glass-card p-1 rounded-3xl overflow-hidden relative group shadow-2xl border border-white/10">
            <div className="bg-[#070d1f] p-6 font-mono-code text-[#adc6ff] leading-relaxed rounded-2xl relative">
              {/* Terminal Header */}
              <div className="terminal-header mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <span className="ml-14 text-[#c2c6d6]/60 text-xs">
                  mukesh@portfolio ~ analysis.py
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="text-xs text-[#c2c6d6] hover:text-[#adc6ff] p-1 rounded transition-colors flex items-center gap-1"
                    title="Copy Code"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copied ? "check" : "content_copy"}
                    </span>
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={() => onOpenPythonRunner(samplePythonCode)}
                    className="text-xs bg-[#2fd9f4]/20 text-[#2fd9f4] hover:bg-[#2fd9f4]/30 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    title="Run Code in Python Sandbox"
                  >
                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                    Run
                  </button>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="space-y-1 text-xs sm:text-sm">
                <p>
                  <span className="text-[#d0bcff]">import</span> pandas{" "}
                  <span className="text-[#d0bcff]">as</span> pd
                </p>
                <p>
                  <span className="text-[#d0bcff]">from</span> sklearn{" "}
                  <span className="text-[#d0bcff]">import</span> insight
                </p>
                <p>&nbsp;</p>
                <p>
                  <span className="text-[#2fd9f4]">def</span>{" "}
                  <span className="text-[#adc6ff]">solve_problem</span>(data):
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;analysis = data.clean().analyze()</p>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-[#d0bcff]">return</span>{" "}
                  analysis.visualize()
                </p>
                <p>&nbsp;</p>
                <p className="text-[#c2c6d6]/60">
                  # Running professional_profile...
                </p>
                <p>
                  <span className="text-white font-bold">Status:</span>{" "}
                  <span className="text-green-400 font-bold">READY_FOR_HIRE</span>
                </p>
                <p>
                  <span className="text-white font-bold">Location:</span> Remote /
                  Global
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
