import React, { useState } from "react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Data Analyst / Python Developer Opportunity", message: "", mathAnswer: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.name || !formData.email || !formData.message) return setError("Please complete all required fields.");
    if (formData.mathAnswer.trim() !== "8") return setError("Anti-spam verification failed (5 + 3 = 8).");
    setSending(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send your message.");
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "Data Analyst / Python Developer Opportunity", message: "", mathAnswer: "" });
    } catch (err: any) {
      setError(err.message || "Unable to send your message. Please try again.");
    } finally { setSending(false); }
  };

  return (
    <section className="py-20 px-5 md:px-16 max-w-[1280px] mx-auto" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <p className="text-xs text-[#2fd9f4] font-mono-code uppercase tracking-widest"># INITIATE_CONTACT</p>
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-[#adc6ff]">Let's Build Something Great</h2>
          <p className="text-base text-[#c2c6d6] leading-relaxed">I am open to entry-level Data Analyst, Python Developer, AI/ML and related opportunities. Send your requirement and I will receive the enquiry at my email.</p>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3"><span className="material-symbols-outlined text-[#2fd9f4]">location_on</span><div><span className="block text-[#c2c6d6]/60 text-xs">Location</span><strong>Coimbatore, Tamil Nadu, India</strong></div></div>
            <div className="flex items-center gap-3"><span className="material-symbols-outlined text-[#adc6ff]">work</span><div><span className="block text-[#c2c6d6]/60 text-xs">Target Roles</span><strong>Data Analyst • Python Developer • AI/ML</strong></div></div>
            <div className="flex items-center gap-3"><span className="material-symbols-outlined text-[#d0bcff]">mail</span><div><span className="block text-[#c2c6d6]/60 text-xs">Email</span><strong>n.mukesh8072@gmail.com</strong></div></div>
          </div>
          <a href="https://github.com/Mukesh-Ed" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm text-[#dce1fb]">GitHub / Mukesh-Ed ↗</a>
        </div>

        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
          <h3 className="font-headline font-bold text-xl text-[#dce1fb] mb-5">Direct Inquiry Form</h3>
          {submitted && <div className="mb-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">Message sent successfully to Mukesh. Thank you!</div>}
          {error && <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="text-xs text-[#c2c6d6]"><span className="block mb-2">Your Name *</span><input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#191f31] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dce1fb] outline-none focus:border-[#adc6ff]" placeholder="Your name" /></label>
              <label className="text-xs text-[#c2c6d6]"><span className="block mb-2">Your Email *</span><input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#191f31] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dce1fb] outline-none focus:border-[#adc6ff]" placeholder="you@example.com" /></label>
            </div>
            <label className="text-xs text-[#c2c6d6] block"><span className="block mb-2">Subject</span><input value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full bg-[#191f31] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dce1fb] outline-none focus:border-[#adc6ff]" /></label>
            <label className="text-xs text-[#c2c6d6] block"><span className="block mb-2">Message *</span><textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-[#191f31] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dce1fb] outline-none focus:border-[#adc6ff] resize-none" placeholder="Tell me about the role, project or requirement..." /></label>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <label className="text-xs text-[#2fd9f4] font-mono-code border border-white/10 rounded-xl px-4 py-3 bg-black/10">Anti-spam: 5 + 3 = <input required value={formData.mathAnswer} onChange={(e) => setFormData({ ...formData, mathAnswer: e.target.value })} className="w-12 ml-2 bg-transparent border-b border-[#2fd9f4]/40 outline-none text-center" /></label>
              <button disabled={sending} className="flex-1 bg-[#adc6ff] text-[#001a42] px-6 py-3 rounded-xl font-bold text-sm disabled:opacity-60">{sending ? "Sending..." : "Send Message ↗"}</button>
            </div>
          </form>
          <p className="text-[10px] text-[#c2c6d6]/50 mt-4">Email delivery requires the Gmail SMTP/App Password settings described in README.md. No API secret is exposed in the browser.</p>
        </div>
      </div>
    </section>
  );
};
