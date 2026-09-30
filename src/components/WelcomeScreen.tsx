import React, { useState, useEffect } from "react";
import { ShaderBackground } from "./ShaderBackground";
import { ThreeVisualizer } from "./ThreeVisualizer";

interface WelcomeScreenProps {
  onEnterPortfolio: () => void;
  onOpenGithub: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onEnterPortfolio,
  onOpenGithub,
}) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [revealing, setRevealing] = useState(false);

  // Typing effect state
  const roles = [
    "Data Analyst",
    "Python Developer",
    "AI/ML Enthusiast",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Loading simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  // Escape key handler to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && loading) {
        setProgress(100);
        setLoading(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading]);

  // Typing effect loop
  useEffect(() => {
    if (loading) return;

    const fullText = roles[currentRoleIndex];
    let typingSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && currentText === fullText) {
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && currentText === "") {
      typingSpeed = 400;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === fullText) {
        setIsDeleting(true);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        const nextChar = isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1);
        setCurrentText(nextChar);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, loading, roles]);

  const handleExplore = () => {
    setRevealing(true);
    setTimeout(() => {
      onEnterPortfolio();
    }, 1100);
  };

  return (
    <div className={`relative min-h-screen w-full bg-[#0c1324] text-[#dce1fb] overflow-hidden ${revealing ? "reveal-active" : ""}`}>
      {/* Background shader */}
      <ShaderBackground className="fixed inset-0 w-full h-full opacity-40 z-0" />

      {/* 1. Entrance Loader */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-[#0c1324] flex flex-col items-center justify-center transition-opacity duration-700">
          <div className="flex flex-col items-center gap-6">
            {/* Logo MS */}
            <div className="w-24 h-24 rounded-full border-2 border-[#adc6ff]/30 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#adc6ff]/10 animate-pulse" />
              <span className="font-headline text-3xl text-[#adc6ff] relative z-10 font-black tracking-tighter">
                MS
              </span>
            </div>
            <div className="flex flex-col items-center gap-3 w-64">
              <p className="text-xs text-[#c2c6d6] tracking-widest uppercase font-mono-code">
                Preparing Experience
              </p>
              <div className="w-full h-1 bg.surface-variant rounded-full overflow-hidden bg-[#2e3447]">
                <div
                  className="h-full bg-[#adc6ff] transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Welcome Content */}
      <main
        className={`relative z-10 min-h-screen w-full flex flex-col transition-all duration-700 ${
          loading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Header Branding */}
        <header className="w-full px-5 md:px-16 py-4 mt-2">
          <div className="max-w-[1280px] mx-auto flex justify-between items-center">
            <span className="font-headline text-2xl md:text-3xl font-bold text-[#adc6ff] tracking-tighter">
              Mukesh.dev
            </span>
            <button
              onClick={() => {
                setProgress(100);
                setLoading(false);
              }}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all text-[#c2c6d6] text-xs font-mono-code cursor-pointer"
            >
              Skip Introduction <span className="opacity-50">[ESC]</span>
            </button>
          </div>
        </header>

        {/* Hero Grid */}
        <div className="flex-grow flex items-center py-8">
          <div className="max-w-[1280px] mx-auto w-full px-5 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="flex flex-col gap-6 order-2 md:order-1">
              <div className="space-y-2">
                <p className="text-xs text-[#2fd9f4] tracking-widest uppercase font-mono-code">
                  Portfolio 2026
                </p>
                <h1 className="font-headline text-4xl md:text-6xl font-bold text-[#dce1fb] tracking-tighter leading-tight">
                  Hi, I'm <span className="text-[#adc6ff]">Mukesh</span>
                </h1>
              </div>

              <div className="h-12 flex items-center">
                <span className="font-headline text-2xl md:text-3xl text-[#c2c6d6] typing-cursor">
                  {currentText}
                </span>
              </div>

              <p className="text-base md:text-lg text-[#c2c6d6] max-w-lg leading-relaxed">
                Bridging the gap between raw data and actionable intelligence through Pythonic elegance and AI-driven insights.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleExplore}
                  className="px-8 py-4 bg-[#adc6ff] text-[#001a42] rounded-xl font-bold text-sm glow-primary hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group cursor-pointer"
                >
                  Explore My Portfolio
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
                <button
                  onClick={onOpenGithub}
                  className="px-8 py-4 glass-panel text-[#dce1fb] rounded-xl font-bold text-sm hover:bg-white/10 transition-all cursor-pointer border border-white/10"
                >
                  View Github
                </button>
              </div>
            </div>

            {/* Right Column: 3D Scene */}
            <div className="order-1 md:order-2 h-[350px] md:h-[500px] relative">
              <div className="absolute inset-0 bg-[#571bc1]/20 blur-[90px] rounded-full pointer-events-none" />
              <div className="w-full h-full glass-panel rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
                <ThreeVisualizer className="w-full h-full" />

                {/* Terminal Overlay Hint */}
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-black/70 backdrop-blur-md rounded-xl border border-white/10 font-mono-code text-xs text-[#2fd9f4]">
                  <span className="text-[#c2c6d6]">mukesh@dev:~$</span> python analyze_skills.py
                  <br />
                  <span className="text-[#d0bcff]">
                    # Processing portfolio architecture &amp; machine learning pipelines...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Shell */}
        <footer className="w-full px-5 md:px-16 py-6">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-4">
            <p className="text-xs text-[#c2c6d6]">
              © 2026 Mukesh | Data Analyst &amp; Python Developer
            </p>
            <div className="flex gap-6">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onEnterPortfolio();
                }}
                className="text-[#c2c6d6] hover:text-[#adc6ff] transition-colors flex items-center gap-1 text-xs"
              >
                <span className="material-symbols-outlined text-base">mail</span> Contact
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#c2c6d6] hover:text-[#adc6ff] transition-colors flex items-center gap-1 text-xs"
              >
                <span className="material-symbols-outlined text-base">terminal</span> Code
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* 3. Reveal Transition Layer */}
      <div
        id="reveal-layer"
        className="fixed inset-0 z-[200] bg-[#adc6ff] pointer-events-none reveal-circle flex items-center justify-center"
      >
        <span className="text-[#001a42] font-headline text-3xl md:text-5xl font-extrabold opacity-0 transition-opacity duration-500 delay-300">
          Entering Portfolio...
        </span>
      </div>
    </div>
  );
};
