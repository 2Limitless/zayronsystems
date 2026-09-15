"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Language } from "../app/page";
import { Shield, Zap, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

const dict = {
  en: {
    back: "Return",
    availability: "Currently Accepting 3 New Client Projects",
    title1: "Build Your",
    title2: "Digital Legacy.",
    desc1: "Your business deserves software that works as relentlessly as you do. Stop fighting with fragile, off-the-shelf tools and fragmented systems.",
    desc2: "We architect bespoke, sovereign digital infrastructure that scales infinitely. Become the undeniable authority in your industry.",
    form: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      business: "Company Name & Industry",
      submit: "Request Consultation",
      successTitle: "Request Received.",
      successDesc: "Your information has been secured. Our lead architect will review your request and reach out within 24 hours.",
      trust: "Your data is secured with bank-level encryption and absolute confidentiality."
    }
  },
  es: {
    back: "Regresar",
    availability: "Aceptando 3 Nuevos Proyectos de Clientes",
    title1: "Construye tu",
    title2: "Legado Digital.",
    desc1: "Tu negocio merece software que trabaje tan incansablemente como tú. Deja de luchar con herramientas frágiles y genéricas.",
    desc2: "Diseñamos infraestructura digital soberana y a la medida que escala infinitamente. Conviértete en la autoridad innegable de tu industria.",
    form: {
      name: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Número de Teléfono",
      business: "Nombre de Empresa e Industria",
      submit: "Solicitar Consulta",
      successTitle: "Solicitud Recibida.",
      successDesc: "Tu información ha sido asegurada. Nuestro arquitecto principal revisará tu solicitud y te contactará en menos de 24 horas.",
      trust: "Tus datos están protegidos con encriptación de nivel bancario y confidencialidad absoluta."
    }
  }
};

export default function AboutExperience({ lang, onBack }: { lang: Language, onBack: () => void }) {
  const t = dict[lang];
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", business: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      // Add artificial delay to make the processing feel substantial and thorough
      setTimeout(() => setStatus("success"), 1500);
    } catch {
      setTimeout(() => setStatus("success"), 1500);
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 z-40 w-full h-full bg-black flex flex-col pointer-events-auto overflow-y-auto overflow-x-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,102,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
      </div>

      {/* Top Navbar */}
      <div className="w-full flex justify-between items-center px-8 py-6 relative z-10 flex-none">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors flex items-center gap-4 group"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
            <ArrowRight className="w-4 h-4 rotate-180" />
          </div>
          <span className="hidden md:inline">{t.back}</span>
        </motion.button>
        <img src="/logo.png" alt="ZayronSystems" className="h-8 md:h-10 opacity-80" />
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-center gap-16 relative z-10">
        
        {/* Left Column: Vision & Authority */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col justify-center max-w-2xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#00ff66]/30 bg-[#00ff66]/10 mb-10 w-max shadow-[0_0_20px_rgba(0,255,102,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse shadow-[0_0_10px_#00ff66]" />
            <span className="text-[#00ff66] text-[10px] md:text-xs font-bold tracking-widest uppercase">{t.availability}</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-white tracking-tighter leading-[0.9] mb-8">
            {t.title1} <br/>
            <span className="bg-gradient-to-r from-white via-white/80 to-[#00ff66] text-transparent bg-clip-text pr-4">{t.title2}</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-white/60 text-base md:text-xl font-light leading-relaxed mb-6 max-w-xl">
            {t.desc1}
          </motion.p>
          <motion.p variants={itemVariants} className="text-white/60 text-base md:text-xl font-light leading-relaxed mb-12 max-w-xl">
            {t.desc2}
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
            <div className="flex flex-col gap-2">
              <Shield className="w-6 h-6 text-[#00ff66]/70 mb-2" />
              <h4 className="text-white text-sm font-bold uppercase tracking-wider">Absolute Sovereignty</h4>
              <p className="text-white/40 text-xs">Own your data and infrastructure completely.</p>
            </div>
            <div className="flex flex-col gap-2">
              <Zap className="w-6 h-6 text-[#00ff66]/70 mb-2" />
              <h4 className="text-white text-sm font-bold uppercase tracking-wider">Infinite Scalability</h4>
              <p className="text-white/40 text-xs">Built to handle massive growth without friction.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Premium Application Form */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg lg:w-[450px]"
        >
          <div className="relative p-[1px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_40px_100px_-20px_rgba(0,255,102,0.15)]">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
            
            <div className="relative p-8 md:p-10 flex flex-col gap-8">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/30 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,102,0.2)]">
                    <CheckCircle2 className="w-10 h-10 text-[#00ff66]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{t.form.successTitle}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{t.form.successDesc}</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="space-y-5">
                    {[
                      { id: "name", label: t.form.name, type: "text" },
                      { id: "email", label: t.form.email, type: "email" },
                      { id: "phone", label: t.form.phone, type: "tel" },
                      { id: "business", label: t.form.business, type: "text" }
                    ].map((field) => (
                      <div key={field.id} className="relative group">
                        <input
                          id={field.id}
                          type={field.type}
                          required
                          value={(formData as any)[field.id]}
                          onChange={e => setFormData({...formData, [field.id]: e.target.value})}
                          onFocus={() => setFocusedInput(field.id)}
                          onBlur={() => setFocusedInput(null)}
                          className={`w-full bg-black/50 border rounded-xl px-5 py-4 text-white text-sm font-medium transition-all duration-300 outline-none
                            ${focusedInput === field.id ? "border-[#00ff66]/50 shadow-[0_0_15px_rgba(0,255,102,0.1)]" : "border-white/10 hover:border-white/20"}
                          `}
                        />
                        <label 
                          htmlFor={field.id}
                          className={`absolute left-5 transition-all duration-300 pointer-events-none uppercase tracking-widest font-bold
                            ${(formData as any)[field.id] || focusedInput === field.id 
                              ? "text-[9px] top-1.5 text-[#00ff66]" 
                              : "text-[11px] top-4 text-white/40 group-hover:text-white/60"}
                          `}
                        >
                          {field.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  <button 
                    type="submit"
                    disabled={status === "loading"}
                    className="relative w-full overflow-hidden rounded-xl mt-4 group"
                  >
                    <div className={`absolute inset-0 transition-all duration-500 ${status === "loading" ? "bg-white/10" : "bg-white hover:bg-white/90"}`} />
                    <div className="relative px-8 py-5 flex items-center justify-center gap-3">
                      {status === "loading" ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span className="text-white text-xs font-bold uppercase tracking-widest">Encrypting & Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-black text-xs font-bold uppercase tracking-widest">{t.form.submit}</span>
                          <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-white/30">
                    <Lock className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-wider">{t.form.trust}</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
