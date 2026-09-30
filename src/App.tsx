import React, { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ShaderBackground } from "./components/ShaderBackground";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { AiAssistantModal } from "./components/AiAssistantModal";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { PythonRunnerModal } from "./components/PythonRunnerModal";
import { ResumeModal } from "./components/ResumeModal";
import { Project } from "./types";

export function App() {
  const [viewMode, setViewMode] = useState<"welcome" | "portfolio">("welcome");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [pythonRunnerOpen, setPythonRunnerOpen] = useState(false);
  const [pythonCode, setPythonCode] = useState<string | undefined>(undefined);
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleOpenPythonRunner = (code?: string) => {
    setPythonCode(code);
    setPythonRunnerOpen(true);
  };

  const handleOpenContactModal = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (viewMode === "welcome") {
    return (
      <WelcomeScreen
        onEnterPortfolio={() => setViewMode("portfolio")}
        onOpenGithub={() => window.open("https://github.com", "_blank")}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0c1324] text-[#dce1fb] font-body-md overflow-x-hidden selection:bg-[#adc6ff]/30">
      {/* Background Shader animation */}
      <ShaderBackground className="fixed inset-0 w-full h-full opacity-30 pointer-events-none z-0" />

      {/* Main Navbar */}
      <Navbar
        onReturnWelcome={() => setViewMode("welcome")}
        onOpenAiAssistant={() => setAiModalOpen(true)}
        onOpenContactModal={handleOpenContactModal}
      />

      {/* Content Layout */}
      <main className="relative z-10">
        <HeroSection
          onOpenPythonRunner={handleOpenPythonRunner}
          onOpenResume={() => setResumeOpen(true)}
        />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenContact={handleOpenContactModal}
        />

        <ExperienceSection />

        <ContactSection />

        {/* Footer */}
        <footer className="w-full py-10 px-5 md:px-16 bg-[#070d1f] border-t border-white/5 text-center text-xs text-[#c2c6d6]/70">
          <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2026 Mukesh.dev — Data Analyst &amp; Python Developer. All rights reserved.</p>
            <div className="flex gap-6 font-mono-code text-[11px]">
              <button
                onClick={() => setViewMode("welcome")}
                className="hover:text-[#adc6ff] transition-colors cursor-pointer"
              >
                3D Welcome Screen
              </button>
              <button
                onClick={() => setAiModalOpen(true)}
                className="hover:text-[#2fd9f4] transition-colors cursor-pointer"
              >
                Ask Gemini AI
              </button>
              <button
                onClick={() => handleOpenPythonRunner()}
                className="hover:text-[#adc6ff] transition-colors cursor-pointer"
              >
                Python Sandbox
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Modals */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenPythonRunner={handleOpenPythonRunner}
      />

      <PythonRunnerModal
        isOpen={pythonRunnerOpen}
        initialCode={pythonCode}
        onClose={() => setPythonRunnerOpen(false)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}

export default App;
