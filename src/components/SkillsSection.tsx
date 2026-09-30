import React, { useState } from "react";
import { SkillCategory } from "../types";

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; category: string; description: string } | null>(null);
  const categories: SkillCategory[] = [
    { id: "analytics", title: "Data Analytics", icon: "analytics", borderColor: "border-t-[#adc6ff]/40", iconColor: "text-[#adc6ff]", skills: [
      { name: "Excel", level: "Working", description: "Data cleaning, formulas, pivot tables and dashboard preparation" },
      { name: "SQL / MySQL", level: "Working", description: "Queries, filtering, joins, grouping and analytical data work" },
      { name: "Power BI", level: "Working", description: "Interactive dashboards, KPIs and data visualization" },
      { name: "Tableau", level: "Basics", description: "Basic visual analytics and dashboard concepts" },
      { name: "Pandas", level: "Working", description: "Data cleaning, transformation and exploratory analysis" },
      { name: "NumPy", level: "Working", description: "Numerical arrays and data processing" },
      { name: "Matplotlib / Seaborn", level: "Working", description: "Exploratory and analytical visualizations" },
    ] },
    { id: "python", title: "Python Development", icon: "terminal", borderColor: "border-t-[#2fd9f4]/40", iconColor: "text-[#2fd9f4]", skills: [
      { name: "Python", level: "Core", description: "Programming, data analysis and project development" },
      { name: "Flask", level: "Learning", description: "Lightweight web and API development" },
      { name: "FastAPI", level: "Learning", description: "REST API development for project backends" },
      { name: "HTML / CSS", level: "Working", description: "Frontend fundamentals and responsive layouts" },
      { name: "Bootstrap", level: "Working", description: "Responsive UI components and layouts" },
      { name: "PHP", level: "Internship", description: "Full-stack internship development" },
    ] },
    { id: "ml-ai", title: "AI & Machine Learning", icon: "memory", borderColor: "border-t-[#adc6ff]/40", iconColor: "text-[#adc6ff]", skills: [
      { name: "Scikit-learn", level: "Working", description: "ML workflows including anomaly detection and model evaluation" },
      { name: "Machine Learning", level: "Foundation", description: "Supervised and unsupervised learning concepts" },
      { name: "GenAI", level: "Working", description: "Generative AI concepts and application development" },
      { name: "Gemini API", level: "Project", description: "AI-assisted application and recruiter-assistant integration" },
      { name: "RAG / ChromaDB", level: "Project", description: "Retrieval-based AI workflow used in the packaging control tower" },
      { name: "Prompt Engineering", level: "Working", description: "Structured prompts for useful AI responses" },
    ] },
    { id: "tools", title: "Tools & Deployment", icon: "build", borderColor: "border-t-[#2fd9f4]/40", iconColor: "text-[#2fd9f4]", skills: [
      { name: "Git / GitHub", level: "Working", description: "Version control and project repositories" },
      { name: "Streamlit", level: "Project", description: "Interactive data and AI application development" },
      { name: "Docker", level: "Learning", description: "Containerization concepts and project deployment" },
      { name: "Postman", level: "Working", description: "REST API testing" },
      { name: "MySQL", level: "Working", description: "Relational data storage and queries" },
      { name: "VS Code", level: "Daily", description: "Development environment for projects" },
    ] },
  ];
  return <section className="py-20 bg-[#070d1f]/60 border-y border-white/5" id="skills"><div className="px-5 md:px-16 max-w-[1280px] mx-auto"><div className="text-center mb-12"><p className="text-xs text-[#2fd9f4] font-mono-code uppercase tracking-widest mb-2"># TECH_STACK</p><h2 className="font-headline text-3xl sm:text-4xl font-bold text-[#dce1fb] mb-4">Technical Skills</h2><div className="h-1 w-24 bg-[#adc6ff] mx-auto rounded-full mb-6" /><input type="text" placeholder="Search tech stack..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full max-w-md px-4 py-2.5 bg-[#191f31] border border-white/10 rounded-full text-sm text-[#dce1fb] outline-none" /></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{categories.map((cat) => { const filtered = cat.skills.filter(s => `${s.name} ${s.description}`.toLowerCase().includes(searchQuery.toLowerCase())); if (searchQuery && !filtered.length) return null; return <div key={cat.id} className={`glass-card p-6 rounded-3xl space-y-4 border-t-2 ${cat.borderColor}`}><div className="flex justify-between"><span className={`material-symbols-outlined text-3xl ${cat.iconColor}`}>{cat.icon}</span><span className="text-[10px] text-[#c2c6d6]/60">{filtered.length} items</span></div><h3 className="font-headline font-bold text-xl text-[#dce1fb]">{cat.title}</h3><div className="flex flex-wrap gap-2">{filtered.map(s => <button key={s.name} onClick={() => setSelectedSkill({ name: s.name, category: cat.title, description: s.description })} className="px-3 py-1 bg-[#571bc1]/10 text-[#d0bcff] text-xs rounded-full border border-[#d0bcff]/20">{s.name}</button>)}</div></div>})}</div></div>{selectedSkill && <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"><div className="glass-card max-w-md w-full p-6 rounded-3xl border border-white/20"><p className="text-xs text-[#2fd9f4]">{selectedSkill.category}</p><h3 className="text-2xl font-bold text-[#dce1fb] mt-2">{selectedSkill.name}</h3><p className="text-sm text-[#c2c6d6] mt-4">{selectedSkill.description}</p><button onClick={() => setSelectedSkill(null)} className="mt-6 px-4 py-2 rounded-xl bg-[#adc6ff] text-[#001a42] font-bold">Close</button></div></div>}</section>;
};
