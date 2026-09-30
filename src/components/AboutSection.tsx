import React from "react";
import profileImage from "../assets/mukesh-profile.jpeg";

export const AboutSection: React.FC = () => (
  <section className="py-20 px-5 md:px-16 max-w-[1280px] mx-auto" id="about">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-5 relative group">
        <div className="absolute inset-0 bg-[#571bc1]/20 blur-[80px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="glass-card aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-xl relative">
          <img src={profileImage} alt="Mukesh N." className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <p className="text-xs text-[#2fd9f4] font-mono-code uppercase tracking-widest"># ABOUT_MUKESH</p>
        <h2 className="font-headline text-3xl sm:text-4xl font-bold text-[#adc6ff]">Learning, Building, Analysing</h2>
        <p className="text-base sm:text-lg text-[#c2c6d6] leading-relaxed">I completed my B.Sc Computer Science from VLB Janakiammal College of Arts and Science, Coimbatore with a CGPA of 8.0. I also completed Data Analytics with Python and GenAI training through Anudip Foundation and a Full Stack Development internship at Accent Techno Soft.</p>
        <p className="text-base sm:text-lg text-[#c2c6d6] leading-relaxed">My current focus is Data Analytics, Python development and practical AI/ML applications. I enjoy learning new technologies, working with data and building projects that solve real-world problems.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card p-6 rounded-2xl border border-white/10"><span className="material-symbols-outlined text-[#2fd9f4] text-2xl mb-2 block">bolt</span><h4 className="font-bold text-[#dce1fb] mb-1">Quick Learner</h4><p className="text-xs text-[#c2c6d6]">Adaptable and interested in learning new technologies.</p></div>
          <div className="glass-card p-6 rounded-2xl border border-white/10"><span className="material-symbols-outlined text-[#adc6ff] text-2xl mb-2 block">groups</span><h4 className="font-bold text-[#dce1fb] mb-1">Team Player</h4><p className="text-xs text-[#c2c6d6]">Comfortable collaborating and contributing to team goals.</p></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-4 border-t border-white/10">
          <div><span className="block text-3xl font-extrabold text-[#adc6ff]">8.0</span><span className="text-xs text-[#c2c6d6]">CGPA</span></div>
          <div><span className="block text-3xl font-extrabold text-[#adc6ff]">B.Sc</span><span className="text-xs text-[#c2c6d6]">Computer Science</span></div>
          <div><span className="block text-3xl font-extrabold text-[#2fd9f4]">Python</span><span className="text-xs text-[#c2c6d6]">Core Focus</span></div>
          <div><span className="block text-3xl font-extrabold text-[#d0bcff]">AI/ML</span><span className="text-xs text-[#c2c6d6]">Current Interest</span></div>
        </div>
      </div>
    </div>
  </section>
);
