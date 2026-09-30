import React from "react";

interface ResumeModalProps { isOpen: boolean; onClose: () => void; }

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-[160] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
    <div className="bg-white text-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl my-8 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-slate-900 text-white"><h2 className="font-bold">Mukesh N. — Resume</h2><button onClick={onClose}>✕</button></div>
      <div className="p-8 space-y-6 text-sm">
        <div><h1 className="text-3xl font-bold">Mukesh N.</h1><p className="mt-1">Data Analyst • Python Developer • AI/ML Enthusiast</p><p className="text-slate-600">Coimbatore, Tamil Nadu, India • n.mukesh8072@gmail.com • GitHub: github.com/Mukesh-Ed</p></div>
        <section><h3 className="font-bold border-b pb-1">Profile</h3><p className="mt-2">B.Sc Computer Science graduate with practical training in Data Analytics with Python and GenAI. Interested in entry-level Data Analyst, Python Developer and AI/ML opportunities, with project experience across analytics dashboards, AI applications and operational intelligence.</p></section>
        <section><h3 className="font-bold border-b pb-1">Education</h3><p className="mt-2 font-semibold">B.Sc Computer Science — VLB Janakiammal College of Arts and Science, Coimbatore</p><p>Completed • CGPA: 8.0</p></section>
        <section><h3 className="font-bold border-b pb-1">Training & Internship</h3><ul className="list-disc list-inside mt-2 space-y-1"><li><strong>Anudip Foundation:</strong> Completed 3-month Data Analytics with Python and GenAI training.</li><li><strong>Accent Techno Soft:</strong> Full Stack Development Internship, May 2025 – June 2025; HTML, CSS, Bootstrap, PHP and MySQL.</li></ul></section>
        <section><h3 className="font-bold border-b pb-1">Projects</h3><ul className="list-disc list-inside mt-2 space-y-1"><li>AI-Powered Packaging Industry Operations Control Tower</li><li>Local Business Profit Leak Detector</li><li>SmartInventory AI</li><li>SmartStudy Planner AI</li></ul></section>
        <section><h3 className="font-bold border-b pb-1">Technical Skills</h3><p className="mt-2">Python, Excel, SQL/MySQL, Power BI, Tableau basics, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, GenAI, Gemini API, ChromaDB/RAG, FastAPI, Flask, Streamlit, HTML, CSS, Bootstrap, PHP, Git/GitHub, Docker, Postman.</p></section>
        <section><h3 className="font-bold border-b pb-1">Paper Presentation</h3><p className="mt-2">“Malware Analysis Using WannaCry Ransomware Attack” — NCCTIS 2025.</p></section>
      </div>
    </div>
  </div>;
};
