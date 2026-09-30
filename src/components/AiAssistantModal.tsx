import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      sender: "ai",
      text: "Hello! I am Mukesh's AI Recruiter Assistant powered by Gemini. Ask me anything about Mukesh's background, Python projects, technical stack, or availability!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = [
    "What are Mukesh's core Python & SQL skills?",
    "What projects has Mukesh built?",
    "What roles is Mukesh looking for?",
    "What are Mukesh's main technical skills?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();

      if (data.reply) {
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error(data.error || "Failed to reach AI");
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: `[System Notice] ${err.message || "Unable to process AI query right now."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="glass-card w-full max-w-2xl h-[600px] rounded-3xl border border-[#d0bcff]/30 shadow-2xl flex flex-col overflow-hidden animate-reveal relative">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#151b2d] border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#571bc1]/40 border border-[#d0bcff]/40 flex items-center justify-center text-[#d0bcff]">
              <span className="material-symbols-outlined text-2xl">
                psychology
              </span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-[#dce1fb] flex items-center gap-2">
                Ask Mukesh's AI Agent
                <span className="text-[10px] bg-[#2fd9f4]/20 text-[#2fd9f4] px-2 py-0.5 rounded font-mono-code">
                  Gemini AI
                </span>
              </h3>
              <p className="text-xs text-[#c2c6d6]/70">
                Instant answers regarding portfolio, experience, &amp; skills
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

        {/* Message Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#070d1f]/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#4d8eff] text-white rounded-br-none"
                    : "bg-[#191f31] text-[#dce1fb] border border-white/10 rounded-bl-none"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
              <span className="text-[10px] text-[#c2c6d6]/50 font-mono-code mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#d0bcff] font-mono-code bg-[#191f31] p-3 rounded-2xl w-fit border border-white/10">
              <span className="material-symbols-outlined animate-spin text-sm">
                sync
              </span>
              Gemini AI is analyzing portfolio context...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length < 3 && (
          <div className="px-4 py-2 bg-[#0c1324] border-t border-white/5 flex gap-2 overflow-x-auto">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[11px] bg-[#191f31] hover:bg-[#23293c] text-[#adc6ff] px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap cursor-pointer transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 bg-[#151b2d] border-t border-white/10 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Ask about Mukesh's skills, training, internship, or projects..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-4 py-3 bg-[#0c1324] border border-white/10 rounded-xl text-xs sm:text-sm text-[#dce1fb] placeholder-[#c2c6d6]/50 focus:outline-none focus:border-[#adc6ff]"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-[#adc6ff] text-[#001a42] rounded-xl font-bold text-xs hover:shadow-[0_0_15px_rgba(173,198,255,0.4)] transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
