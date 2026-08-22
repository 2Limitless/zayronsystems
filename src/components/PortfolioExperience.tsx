"use client";

import { motion } from "framer-motion";
import { Database, Zap, Gift, MonitorSmartphone, TrendingUp, Bell } from "lucide-react";
import type { Language } from "../app/page";

const dict = {
  en: {
    back: "Back to Hub",
    title: "Industrial ",
    titleHighlight: "Scale.",
    desc: "Why replacing disjointed legacy systems with custom enterprise software is a competitive necessity.",
    profit: {
      market: "Off-the-shelf Software",
      marketDesc1: "Annual cost of patching together 5 different SaaS tools.",
      marketDesc2: "High friction, data silos, monthly fees.",
      direct: "Custom Architecture",
      directDesc1: "A unified system built specifically for your operations.",
      directDesc2: "Total data sovereignty. No per-user licenses."
    },
    cards: [
      {
        title: "Data Sovereignty",
        desc: "Own your data architecture. Avoid vendor lock-in and power your operations with centralized intelligence."
      },
      {
        title: "Operational Automation",
        desc: "Reduce manual overhead by automating logistics, scheduling, and asset management in real-time."
      },
      {
        title: "Asset Tracking",
        desc: "Real-time visibility into heavy machinery, fleets, and dispersed enterprise resources."
      },
      {
        title: "Legacy System Integration",
        desc: "Seamlessly connect old databases and hardware to modern cloud infrastructure."
      },
      {
        title: "Mission Critical Uptime",
        desc: "Heavy-duty server architectures designed for the demands of industrial 24/7 environments."
      },
      {
        title: "Scalable Infrastructure",
        desc: "Built to handle massive data loads without breaking a sweat as your enterprise grows."
      }
    ]
  },
  es: {
    back: "Volver al Inicio",
    title: "Escala ",
    titleHighlight: "Industrial.",
    desc: "Por qué reemplazar los sistemas heredados con software empresarial personalizado es una necesidad competitiva.",
    profit: {
      market: "Software Comercial",
      marketDesc1: "Costo anual de usar 5 herramientas SaaS diferentes.",
      marketDesc2: "Alta fricción, silos de datos, tarifas mensuales.",
      direct: "Arquitectura Personalizada",
      directDesc1: "Un sistema unificado creado específicamente para tus operaciones.",
      directDesc2: "Soberanía total de datos. Sin licencias por usuario."
    },
    cards: [
      {
        title: "Soberanía de Datos",
        desc: "Sé dueño de tu arquitectura de datos. Evita ataduras a proveedores y potencia tus operaciones."
      },
      {
        title: "Automatización Operativa",
        desc: "Reduce costos manuales automatizando logística, programación y gestión de activos en tiempo real."
      },
      {
        title: "Seguimiento de Activos",
        desc: "Visibilidad en tiempo real de maquinaria pesada, flotas y recursos empresariales dispersos."
      },
      {
        title: "Integración de Sistemas Heredados",
        desc: "Conecta sin problemas bases de datos y hardware antiguos a una infraestructura en la nube moderna."
      },
      {
        title: "Confiabilidad Crítica",
        desc: "Arquitecturas de servidores diseñadas para las demandas de entornos industriales 24/7."
      },
      {
        title: "Infraestructura Escalable",
        desc: "Creada para manejar cargas de datos masivas sin problemas a medida que tu empresa crece."
      }
    ]
  }
};

export default function PortfolioExperience({ lang, onBack }: { lang: Language, onBack: () => void }) {
  const t = dict[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-40 w-full h-full bg-[var(--color-void)] p-6 md:p-12 overflow-y-auto overflow-x-hidden pointer-events-auto"
    >
      <div className="w-full max-w-7xl mx-auto pt-12 md:pt-0 pb-32">
        <header className="flex justify-between items-end mb-16 border-b border-[var(--color-glass-border)] pb-8">
          <div>
            <button 
              onClick={onBack}
              className="text-[var(--color-ice)]/60 text-xs tracking-[0.3em] uppercase mb-6 hover:text-[var(--color-acid)] transition-colors flex items-center gap-4 group w-max"
            >
              <span className="w-8 h-[1px] bg-[var(--color-ice)]/60 group-hover:w-12 group-hover:bg-[var(--color-acid)] transition-all" /> 
              {t.back}
            </button>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-[var(--color-ice)]">
              {t.title} <span className="italic text-[var(--color-acid)]">{t.titleHighlight}</span>
            </h2>
          </div>
          <p className="hidden md:block text-[var(--color-ice)]/50 font-sans text-sm max-w-sm text-right leading-relaxed">
            {t.desc}
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 mb-8 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col gap-2 md:gap-4 p-4 md:p-8 rounded-2xl md:rounded-[1.5rem] border border-red-500/20 bg-red-950/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-red-500 font-bold">{t.profit.market}</h3>
            <div><span className="text-3xl md:text-6xl font-sans font-bold text-white tracking-tighter">$145k+</span></div>
            <p className="text-white/70 text-xs md:text-base font-medium leading-tight">{t.profit.marketDesc1}</p>
            <div className="w-full h-[1px] bg-red-500/20 my-2 md:my-4" />
            <p className="text-red-400 text-xs md:text-sm font-semibold leading-tight">{t.profit.marketDesc2}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-2 md:gap-4 p-4 md:p-8 rounded-2xl md:rounded-[1.5rem] border border-[#00ff66]/20 bg-[#00ff66]/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ff66]/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-[#00ff66] font-bold">{t.profit.direct}</h3>
            <div><span className="text-3xl md:text-6xl font-sans font-bold text-white tracking-tighter">OWNED</span></div>
            <p className="text-white/70 text-xs md:text-base font-medium leading-tight">{t.profit.directDesc1}</p>
            <div className="w-full h-[1px] bg-[#00ff66]/20 my-2 md:my-4" />
            <p className="text-[#00ff66]/80 text-xs md:text-sm font-semibold leading-tight">{t.profit.directDesc2}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="col-span-2 md:col-span-2 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-5 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-row md:flex-col justify-start md:justify-between items-center md:items-start min-h-[auto] md:min-h-[240px] gap-4 md:gap-0">
            <div className="hidden md:block absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-acid)]/10 blur-[80px] rounded-full group-hover:bg-[var(--color-acid)]/20 transition-all duration-700" />
            <Database className="w-8 h-8 md:w-8 md:h-8 shrink-0 text-[var(--color-acid)] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-lg md:text-2xl mb-1 md:mb-3">{t.cards[0].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{t.cards[0].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-start md:justify-between min-h-[auto] md:min-h-[240px] gap-2 md:gap-0">
            <Zap className="w-6 h-6 md:w-8 md:h-8 shrink-0 text-[var(--color-ice)] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-base md:text-xl mb-1 md:mb-3 leading-tight">{t.cards[1].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{t.cards[1].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }} className="col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-start md:justify-between min-h-[auto] md:min-h-[240px] gap-2 md:gap-0">
            <Gift className="w-6 h-6 md:w-8 md:h-8 shrink-0 text-[#00ff66] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-base md:text-xl mb-1 md:mb-3 leading-tight">{t.cards[2].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{t.cards[2].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }} className="col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-start md:justify-between min-h-[auto] md:min-h-[240px] gap-2 md:gap-0">
            <MonitorSmartphone className="w-6 h-6 md:w-8 md:h-8 shrink-0 text-[#00ff66] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-base md:text-xl mb-1 md:mb-3 leading-tight">{t.cards[3].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{t.cards[3].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.5 }} className="col-span-1 md:col-span-2 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-start md:justify-between min-h-[auto] md:min-h-[240px] gap-2 md:gap-0">
            <div className="hidden md:block absolute -bottom-24 -left-24 w-64 h-64 bg-[#00ff66]/10 blur-[80px] rounded-full group-hover:bg-[#00ff66]/20 transition-all duration-700" />
            <Bell className="w-6 h-6 md:w-8 md:h-8 shrink-0 text-[#00ff66] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-base md:text-2xl mb-1 md:mb-3 leading-tight">{t.cards[4].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{t.cards[4].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }} className="col-span-2 md:col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-5 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-row md:flex-col justify-start md:justify-between items-center md:items-start min-h-[auto] md:min-h-[240px] gap-4 md:gap-0">
            <TrendingUp className="w-8 h-8 md:w-8 md:h-8 shrink-0 text-[var(--color-ice)] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-lg md:text-xl mb-1 md:mb-3 leading-tight">{t.cards[5].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{t.cards[5].desc}</p>
            </div>
          </motion.div>

        </div>

        {/* Legitimate SEO Footer Credit */}
        <footer className="w-full text-center py-4 relative z-10 bg-transparent mt-12 md:mb-8 pointer-events-auto">
          <p className="text-white/20 text-[9px] md:text-[10px] tracking-widest uppercase font-mono selection:bg-[#00ff66]/20">
            &copy; {new Date().getFullYear()} ZayronSystems. Enterprise System Software Development.
          </p>
        </footer>
      </div>
    </motion.div>
  );
}
