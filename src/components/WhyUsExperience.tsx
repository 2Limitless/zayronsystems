"use client";

import { motion } from "framer-motion";
import type { Language } from "../app/page";
import { X, Check, ShieldAlert, ShieldCheck } from "lucide-react";

const dict = {
  en: {
    back: "Back to Hub",
    title1: "The Agency",
    title2: "Parasite.",
    subtitle: "Stop renting your business. Start building sovereign digital real estate.",
    desc: "Traditional agencies view your business as a host to feed on. They trap you in infinite retainers, holding your code and customer data hostage while eating your margins. We are a sovereign engineering firm. We architect bespoke digital infrastructure, hand you the keys, and give you an unfair market advantage.",
    them: {
      title: "The Industry",
      subtitle: "The Parasitic Agency Model",
      points: [
        "Bloated, vulnerable template codebases",
        "Hostage-style monthly infrastructure rent",
        "Generic UX that actively bleeds conversions",
        "Infinite retainers designed to drain margins",
        "You do not own your data or codebase"
      ]
    },
    us: {
      title: "ZayronSystems",
      subtitle: "The Digital Sovereignty Model",
      points: [
        "Sovereign infrastructure engineered from scratch",
        "Absolute ownership of your data and code",
        "Ruthless performance and conversion speeds",
        "Engineered specifically for massive ROI",
        "Direct comms with elite systems architects"
      ]
    }
  },
  es: {
    back: "Volver al Inicio",
    title1: "El Parásito",
    title2: "de Agencia.",
    subtitle: "Deja de alquilar tu negocio. Empieza a construir bienes raíces digitales soberanos.",
    desc: "Las agencias tradicionales ven a tu negocio como un huésped del cual alimentarse. Te atrapan en contratos infinitos, secuestrando tu código y datos mientras devoran tus márgenes. Somos una firma de ingeniería soberana. Diseñamos infraestructura digital a medida, te entregamos las llaves y te damos una ventaja injusta.",
    them: {
      title: "La Industria",
      subtitle: "El Modelo Parasitario",
      points: [
        "Bases de código infladas y vulnerables",
        "Alquiler de infraestructura estilo rehén",
        "UX genérica que sangra tus conversiones",
        "Contratos infinitos diseñados para drenar márgenes",
        "No eres dueño de tus datos ni de tu código"
      ]
    },
    us: {
      title: "ZayronSystems",
      subtitle: "El Modelo de Soberanía Digital",
      points: [
        "Infraestructura soberana diseñada desde cero",
        "Propiedad absoluta de tus datos y código",
        "Velocidad de rendimiento y conversión despiadada",
        "Diseñado específicamente para un ROI masivo",
        "Comunicaciones directas con arquitectos de élite"
      ]
    }
  }
};

export default function WhyUsExperience({ lang, onBack }: { lang: Language, onBack: () => void }) {
  const t = dict[lang];

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-40 w-full h-full bg-[#0a0a0a] p-6 md:p-12 overflow-y-auto overflow-x-hidden pointer-events-auto flex flex-col"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />

      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="w-full flex justify-start max-w-7xl mx-auto relative z-10 pt-4 md:pt-0">
        <button 
            onClick={onBack}
            className="text-white/50 text-xs tracking-[0.3em] uppercase mb-12 hover:text-white transition-colors flex items-center gap-4 group w-max"
        >
            <span className="w-8 h-[1px] bg-white/50 group-hover:w-12 group-hover:bg-white transition-all" /> 
            {t.back}
        </button>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl mx-auto pb-32 flex flex-col flex-1 relative z-10"
      >
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-sans font-bold text-white mb-6 leading-[1.1] tracking-tighter">
                {t.title1} <br/>
                <span className="text-white/40 italic font-light">{t.title2}</span>
            </motion.h2>

            <motion.h3 variants={itemVariants} className="text-xl md:text-2xl text-[#00ff66] font-light mb-8">
                {t.subtitle}
            </motion.h3>

            <motion.p variants={itemVariants} className="text-white/60 font-sans text-sm md:text-base font-light leading-relaxed">
                {t.desc}
            </motion.p>
        </div>

        {/* Comparison Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full">
            
            {/* The Industry Standard (Them) */}
            <motion.div variants={itemVariants} className="flex flex-col p-8 md:p-12 rounded-[2rem] border border-red-500/20 bg-red-500/5 relative overflow-hidden group">
                <div className="absolute -top-4 md:-top-12 -right-2 md:-right-4 opacity-[0.03] pointer-events-none select-none overflow-visible">
                    <span className="font-sans font-black text-[100px] md:text-[180px] leading-none text-red-500 uppercase tracking-tighter">THEM</span>
                </div>
                
                <h4 className="text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                    {t.them.subtitle}
                </h4>
                <h3 className="text-white text-3xl font-bold mb-10 tracking-tight relative z-10">
                    {t.them.title}
                </h3>

                <ul className="flex flex-col gap-6 relative z-10">
                    {t.them.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-4">
                            <div className="mt-0.5 bg-red-500/20 p-1 rounded flex-shrink-0">
                                <X size={14} className="text-red-500" />
                            </div>
                            <span className="text-white/60 text-sm font-light leading-relaxed">{point}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* ZayronSystems (Us) */}
            <motion.div variants={itemVariants} className="flex flex-col p-8 md:p-12 rounded-[2rem] border border-[#00ff66]/30 bg-[#00ff66]/10 relative overflow-hidden group shadow-[0_0_50px_rgba(0,255,102,0.05)]">
                <div className="absolute -bottom-4 md:-bottom-8 -right-2 md:-right-4 opacity-[0.04] pointer-events-none select-none overflow-visible">
                    <span className="font-sans font-black text-[120px] md:text-[220px] leading-none text-[#00ff66] uppercase tracking-tighter">US</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff66]/0 to-[#00ff66]/5 pointer-events-none" />

                <h4 className="text-[#00ff66] text-xs font-bold tracking-[0.2em] uppercase mb-2 relative z-10">
                    {t.us.subtitle}
                </h4>
                <h3 className="text-white text-3xl font-bold mb-10 tracking-tight relative z-10">
                    {t.us.title}
                </h3>

                <ul className="flex flex-col gap-6 relative z-10">
                    {t.us.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-4 group/item">
                            <div className="mt-0.5 bg-[#00ff66]/20 p-1 rounded flex-shrink-0 group-hover/item:bg-[#00ff66] transition-colors duration-300">
                                <Check size={14} className="text-[#00ff66] group-hover/item:text-black transition-colors duration-300" />
                            </div>
                            <span className="text-white/90 text-sm font-medium leading-relaxed">{point}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}
