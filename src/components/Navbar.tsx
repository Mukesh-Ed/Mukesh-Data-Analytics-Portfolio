import React, { useState, useEffect } from "react";

interface NavbarProps {
  onReturnWelcome: () => void;
  onOpenAiAssistant: () => void;
  onOpenContactModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onReturnWelcome,
  onOpenAiAssistant,
  onOpenContactModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
        scrolled
          ? "bg-[#0c1324]/95 backdrop-blur-xl py-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          : "bg-[#0c1324]/80 backdrop-blur-md py-5"
      }`}
    >
      <div className="flex justify-between items-center px-5 md:px-16 max-w-[1280px] mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a
            href="#home"
            className="font-headline text-2xl font-bold text-[#adc6ff] tracking-tighter hover:opacity-90 transition-opacity"
          >
            Mukesh.dev
          </a>
          <button
            onClick={onReturnWelcome}
            title="Switch to 3D Intro Experience"
            className="hidden sm:flex items-center gap-1 text-[11px] font-mono-code px-2.5 py-1 rounded-md bg-[#2e3447]/60 text-[#2fd9f4] hover:bg-[#2e3447] transition-all border border-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xs">auto_awesome</span> Intro
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`font-medium text-sm transition-all duration-200 ${
                activeSection === link.id
                  ? "text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] pb-1"
                  : "text-[#c2c6d6] hover:text-[#adc6ff]"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Ask AI Agent Button */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-2 bg-[#571bc1]/20 hover:bg-[#571bc1]/40 text-[#d0bcff] px-4 py-2 rounded-full border border-[#d0bcff]/30 text-xs font-semibold transition-all shadow-[0_0_15px_rgba(87,27,193,0.3)] cursor-pointer active:scale-95"
            title="Ask Mukesh's AI Assistant"
          >
            <span className="material-symbols-outlined text-base text-[#2fd9f4]">
              psychology
            </span>
            <span className="hidden sm:inline">Ask AI Agent</span>
          </button>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            className="hidden md:inline-block bg-[#adc6ff] text-[#001a42] px-5 py-2 rounded-full font-bold text-xs hover:shadow-[0_0_20px_rgba(173,198,255,0.4)] transition-all active:scale-95 cursor-pointer"
          >
            Hire Me
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#dce1fb] p-2 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c1324] border-b border-white/10 px-6 py-6 space-y-4 animate-reveal">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? "text-[#adc6ff] font-bold"
                    : "text-[#c2c6d6]"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReturnWelcome();
              }}
              className="w-full text-center py-2.5 rounded-xl bg-[#2e3447] text-[#2fd9f4] font-mono-code text-xs flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span> View 3D Intro Screen
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactModal();
              }}
              className="w-full text-center py-3 rounded-xl bg-[#adc6ff] text-[#001a42] font-bold text-sm"
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
