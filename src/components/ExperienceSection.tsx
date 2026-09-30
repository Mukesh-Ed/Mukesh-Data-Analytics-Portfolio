import React from "react";
import { ExperienceItem } from "../types";

export const ExperienceSection: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: "training",
      role: "Data Analytics with Python & GenAI Training",
      company: "Anudip Foundation",
      period: "Completed 3-month training",
      description: "Completed practical training focused on data analytics with Python and Generative AI.",
      bullets: ["Python for data analysis", "Excel, SQL and BI fundamentals", "Generative AI concepts and practical projects"],
      type: "work",
    },
    {
      id: "internship",
      role: "Full Stack Development Intern",
      company: "Accent Techno Soft",
      period: "May 2025 – June 2025",
      description: "Completed a Full Stack Development internship using web technologies and database tools.",
      bullets: ["HTML, CSS and Bootstrap", "PHP development", "MySQL database work"],
      type: "work",
    },
    {
      id: "education",
      role: "B.Sc Computer Science",
      company: "VLB Janakiammal College of Arts and Science, Coimbatore",
      period: "Completed | CGPA 8.0",
      description: "Completed undergraduate studies in Computer Science.",
      bullets: ["Computer Science foundation", "Programming and database concepts", "Project-based learning"],
      type: "education",
    },
    {
      id: "paper",
      role: "Paper Presentation",
      company: "NCCTIS 2025",
      period: "2025",
      description: "Presented a paper titled “Malware Analysis Using WannaCry Ransomware Attack”.",
      type: "education",
    },
  ];

  return (
    <section className="py-20 bg-[#070d1f]/40 border-t border-white/5" id="experience">
      <div className="px-5 md:px-16 max-w-[1280px] mx-auto">
        <p className="text-xs text-[#2fd9f4] font-mono-code uppercase tracking-widest mb-2"># JOURNEY</p>
        <h2 className="font-headline text-3xl font-bold text-[#dce1fb] mb-10">Education, Training & Experience</h2>
        <div className="max-w-4xl space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
          {experiences.map((item) => (
            <div key={item.id} className="relative pl-10">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#4d8eff] border-4 border-[#0c1324]" />
              <h4 className="font-headline font-bold text-xl text-[#dce1fb]">{item.role}</h4>
              <p className="text-[#adc6ff] text-xs font-mono-code mb-2">{item.company} | {item.period}</p>
              <p className="text-sm text-[#c2c6d6] mb-3 leading-relaxed">{item.description}</p>
              {item.bullets && <ul className="space-y-1 list-disc list-inside text-xs text-[#c2c6d6]/80">{item.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
