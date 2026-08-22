"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Language } from "../app/page";

const dict = {
  en: {
    back: "Back to Hub",
    title1: "Schedule an",
    title2: "Architecture Review.",
    desc1: "Stop patching together legacy systems. It's time to build a unified enterprise infrastructure.",
    desc2: "We architect custom, heavy-duty software solutions that scale with your operations and give you complete sovereignty over your data.",
    form: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      business: "Company Name & Industry",
      submit: "Request Enterprise Build",
      success: "Received! An architect will contact you shortly."
    }
  },
  es: {
    back: "Volver al Inicio",
    title1: "Programa una",
    title2: "Revisión de Arquitectura.",
    desc1: "Deja de improvisar con sistemas heredados. Es hora de construir una infraestructura empresarial unificada.",
    desc2: "Diseñamos soluciones de software personalizadas de uso rudo que escalan con tus operaciones y te brindan soberanía total sobre tus datos.",
    form: {
      name: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Número de Teléfono",
      business: "Nombre de la Empresa e Industria",
      submit: "Solicitar Build Empresarial",
      success: "¡Recibido! Un arquitecto te contactará pronto."
    }
  }
};

export default function AboutExperience({ lang, onBack }: { lang: Language, onBack: () => void }) {
  const t = dict[lang];
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", business: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      // Always show success to user even if DB fails
      setStatus("success");
    } catch {
      setStatus("success");
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-40 w-full h-full bg-[var(--color-void)] p-6 md:p-12 overflow-y-auto overflow-x-hidden pointer-events-auto"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl mx-auto pt-12 md:pt-0 pb-32 flex flex-col-reverse md:flex-row items-center gap-12"
      >
        
        {/* Decorative Element */}
        <motion.div variants={itemVariants} className="flex w-full md:w-auto md:flex-[1.5] lg:flex-[2] relative h-auto justify-center items-center">
          <img 
            src="/enterprise_consultation_graphic.jpg" 
            alt="Enterprise Architecture Diagram" 
            className="w-full h-auto object-contain rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-[var(--color-acid)]/20" 
          />
        </motion.div>

        {/* Text & Form Section */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.button 
            variants={itemVariants}
            onClick={onBack}
            className="text-[var(--color-ice)]/50 text-xs tracking-[0.3em] uppercase mb-12 hover:text-[var(--color-acid)] transition-colors flex items-center gap-4 group w-max"
          >
            <span className="w-8 h-[1px] bg-[var(--color-ice)]/50 group-hover:w-12 group-hover:bg-[var(--color-acid)] transition-all" /> 
            {t.back}
          </motion.button>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[var(--color-ice)] mb-4 leading-tight">
            {t.title1} <br/>
            <span className="italic text-[var(--color-acid)] drop-shadow-[0_0_20px_rgba(204,255,0,0.2)]">{t.title2}</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[var(--color-ice)]/70 font-sans text-sm md:text-base font-light leading-relaxed mb-4">
            {t.desc1}
          </motion.p>
          <motion.p variants={itemVariants} className="text-[var(--color-ice)]/70 font-sans text-sm md:text-base font-light leading-relaxed mb-8">
            {t.desc2}
          </motion.p>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="w-full max-w-md">
            {status === "success" ? (
              <div className="p-6 rounded-2xl border border-[#00ff66]/30 bg-[#00ff66]/5 backdrop-blur-md flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00ff66]/20 flex items-center justify-center">
                  <span className="text-[#00ff66] text-xl">✓</span>
                </div>
                <p className="text-[#00ff66] font-bold tracking-wide text-center">{t.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                  type="text" 
                  required
                  placeholder={t.form.name}
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-acid)]/50 focus:bg-white/10 transition-all font-sans text-sm"
                />
                <input 
                  type="email" 
                  required
                  placeholder={t.form.email}
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-acid)]/50 focus:bg-white/10 transition-all font-sans text-sm"
                />
                <input 
                  type="tel" 
                  required
                  placeholder={t.form.phone}
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-acid)]/50 focus:bg-white/10 transition-all font-sans text-sm"
                />
                <input 
                  type="text" 
                  required
                  placeholder={t.form.business}
                  value={formData.business}
                  onChange={e => setFormData({...formData, business: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-acid)]/50 focus:bg-white/10 transition-all font-sans text-sm"
                />
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 bg-transparent border border-[var(--color-acid)]/30 text-[var(--color-acid)] hover:bg-[var(--color-acid)] hover:text-[var(--color-void)] disabled:opacity-50 px-8 py-4 rounded-xl font-bold font-sans text-xs tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(204,255,0,0.1)]"
                >
                  {status === "loading" ? "..." : t.form.submit}
                  {status !== "loading" && <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
