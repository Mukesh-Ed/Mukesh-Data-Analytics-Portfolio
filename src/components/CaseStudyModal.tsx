import React, { useState } from "react";
import { Project } from "../types";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenPythonRunner: (code?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenPythonRunner,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const cs = project.caseStudy;

  const handleCopyCode = () => {
    if (cs?.sampleCode) {
      navigator.clipboard.writeText(cs.sampleCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[140] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="glass-card w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden animate-reveal relative my-auto">
        {/* Top Header */}
        <div className="p-6 bg-[#151b2d] border-b border-white/10 flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-[#2fd9f4] font-mono-code uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-xs text-[#c2c6d6] font-mono-code">
                Case Study Inspector
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#dce1fb]">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-[#c2c6d6] hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 bg-[#0c1324]/80">
          {/* Key Metrics Banner */}
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[#151b2d] p-4 rounded-2xl border border-white/10"
                >
                  <span className="text-2xl font-extrabold text-[#adc6ff] block">
                    {m.value}
                  </span>
                  <span className="text-xs text-[#c2c6d6] font-mono-code uppercase tracking-wider">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Image Banner if available */}
          {project.image && (
            <div className="rounded-2xl overflow-hidden border border-white/10 h-64 sm:h-80 relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1324] via-transparent to-transparent" />
            </div>
          )}

          {/* Case Study Details Grid */}
          {cs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h4 className="font-headline font-bold text-base text-[#adc6ff] mb-1">
                    Problem Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-[#c2c6d6] leading-relaxed">
                    {cs.overview}
                  </p>
                </div>

                <div>
                  <h4 className="font-headline font-bold text-base text-[#2fd9f4] mb-1">
                    Engineering Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-[#c2c6d6] leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="font-headline font-bold text-base text-[#d0bcff] mb-1">
                    Executed Solution
                  </h4>
                  <p className="text-xs sm:text-sm text-[#c2c6d6] leading-relaxed">
                    {cs.solution}
                  </p>
                </div>
              </div>

              {/* Results & Tech Stack */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-headline font-bold text-base text-emerald-400 mb-2">
                    Key Quantitative Results
                  </h4>
                  <ul className="space-y-2">
                    {cs.results.map((res, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-[#c2c6d6] flex items-start gap-2 bg-[#151b2d] p-3 rounded-xl border border-white/5"
                      >
                        <span className="material-symbols-outlined text-emerald-400 text-base">
                          check_circle
                        </span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-headline font-bold text-xs text-[#c2c6d6] uppercase tracking-wider mb-2 font-mono-code">
                    Technologies Employed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cs.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#2e3447] text-[#adc6ff] text-xs font-mono-code rounded-lg border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#c2c6d6]">{project.longDescription}</p>
          )}

          {/* Recharts Performance Visualizer */}
          {cs?.chartData && (
            <div className="bg-[#151b2d] p-6 rounded-2xl border border-white/10">
              <h4 className="font-headline font-bold text-base text-[#dce1fb] mb-4">
                Performance Benchmark Visualizer
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cs.chartData}>
                    <defs>
                      <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#adc6ff" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#adc6ff" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2fd9f4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2fd9f4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2e3447" />
                    <XAxis dataKey="name" stroke="#c2c6d6" fontSize={12} />
                    <YAxis stroke="#c2c6d6" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#070d1f",
                        borderColor: "#2e3447",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value1"
                      stroke="#adc6ff"
                      fillOpacity={1}
                      fill="url(#colorValue1)"
                      name="Optimized Metric"
                    />
                    <Area
                      type="monotone"
                      dataKey="value2"
                      stroke="#2fd9f4"
                      fillOpacity={1}
                      fill="url(#colorValue2)"
                      name="Baseline Metric"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Code Viewer Section */}
          {cs?.sampleCode && (
            <div className="bg-[#070d1f] p-5 rounded-2xl border border-white/10 relative">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-[#2fd9f4] font-mono-code">
                  # Production Core Snippet
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="text-xs text-[#c2c6d6] hover:text-[#adc6ff] flex items-center gap-1 font-mono-code"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedCode ? "check" : "content_copy"}
                    </span>
                    {copiedCode ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPythonRunner(cs.sampleCode);
                    }}
                    className="text-xs bg-[#adc6ff] text-[#001a42] px-3 py-1 rounded-lg font-bold font-mono-code flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">
                      play_arrow
                    </span>
                    Test In Python Sandbox
                  </button>
                </div>
              </div>
              <pre className="font-mono-code text-xs text-[#adc6ff] overflow-x-auto p-3 bg-black/40 rounded-xl leading-relaxed">
                {cs.sampleCode}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
