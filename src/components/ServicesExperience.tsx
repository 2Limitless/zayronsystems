"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Smartphone, BookOpen, MonitorSmartphone, Megaphone, MessageSquare, HeartHandshake, ChevronDown, LayoutDashboard, Gift, BarChart3, Tablet } from "lucide-react";
import type { Language } from "../app/page";

const dict = {
  en: {
    back: "Back to Hub",
    title: "Enterprise ",
    titleHighlight: "Stack.",
    desc: "A complete infrastructure. We architect high-performance data systems while delivering world-class reliability.",
    scrollCompare: "Compare Tiers Below",
    tier1: {
      headerSubtitle: "Core",
      headerTitle: "Core Infrastructure.",
      headerDesc: "The foundational software stack for industrial operations.",
      cards: [
        { title: "Logistics Hub", desc: "Custom dashboards for real-time tracking and dispatching." },
        { title: "Data Warehouse", desc: "Centralized storage for critical operational data." },
        { title: "API Gateway", desc: "Secure endpoints for third-party service integration." },
        { title: "Live Analytics", desc: "100% ownership of your performance metrics and usage trends." }
      ]
    },
    complete: {
      headerSubtitle: "Full-Scale",
      headerTitle: "Full-Scale Transformation.",
      headerDesc: "Everything in Core, PLUS our 'White-Glove' enterprise deployment.",
      cards: [
        { title: "Cloud Deployment", desc: "We manage AWS/GCP provisioning, security, and VPC setup." },
        { title: "Legacy Migration", desc: "We manually migrate your old data to the new architecture." },
        { title: "Hardware Provisioning", desc: "Pre-configured rugged industrial tablets and IoT sensors." },
        { title: "SOP Development", desc: "Custom digital standard operating procedures and documentation." },
        { title: "Automated Alerts", desc: "Critical system notifications and maintenance reminders via SMS." },
        { title: "24/7 Support SLA", desc: "Dedicated engineering support and guaranteed uptime SLAs." }
      ]
    }
  },
  es: {
    back: "Volver al Inicio",
    title: "Stack ",
    titleHighlight: "Empresarial.",
    desc: "Una infraestructura completa. Diseñamos sistemas de datos de alto rendimiento con confiabilidad mundial.",
    scrollCompare: "Compara Niveles Abajo",
    tier1: {
      headerSubtitle: "Base",
      headerTitle: "Infraestructura Base.",
      headerDesc: "El stack de software fundamental para operaciones industriales.",
      cards: [
        { title: "Hub Logístico", desc: "Paneles personalizados para seguimiento y despacho en tiempo real." },
        { title: "Almacén de Datos", desc: "Almacenamiento centralizado para datos operativos críticos." },
        { title: "Gateway API", desc: "Endpoints seguros para la integración de servicios de terceros." },
        { title: "Análisis en Vivo", desc: "Propiedad del 100% de tus métricas de rendimiento y tendencias." }
      ]
    },
    complete: {
      headerSubtitle: "Escala Total",
      headerTitle: "Transformación a Escala Total.",
      headerDesc: "Todo en la Base, MÁS nuestro despliegue empresarial 'VIP'.",
      cards: [
        { title: "Despliegue en la Nube", desc: "Manejamos AWS/GCP, seguridad y configuración de VPC." },
        { title: "Migración de Sistemas", desc: "Migramos manualmente tus datos antiguos a la nueva arquitectura." },
        { title: "Hardware Industrial", desc: "Tabletas industriales resistentes preconfiguradas y sensores IoT." },
        { title: "Desarrollo de SOPs", desc: "Procedimientos operativos estándar digitales personalizados." },
        { title: "Alertas Automatizadas", desc: "Notificaciones críticas del sistema y recordatorios de mantenimiento." },
        { title: "Soporte SLA 24/7", desc: "Soporte de ingeniería dedicado y garantías de tiempo de actividad." }
      ]
    }
  }
};

export default function ServicesExperience({ lang, onBack, onThemeChange }: { lang: Language, onBack: () => void, onThemeChange?: (theme: "dark" | "light") => void }) {
  const t = dict[lang];
  const [activeTier, setActiveTier] = useState<"tier1" | "complete">("complete");

  const handleTierChange = (tier: "tier1" | "complete") => {
    setActiveTier(tier);
    if (onThemeChange) {
      onThemeChange(tier === "tier1" ? "light" : "dark");
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "10%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute inset-0 z-40 w-full h-full transition-colors duration-700 p-6 md:p-12 overflow-y-auto overflow-x-hidden pointer-events-auto ${activeTier === "tier1" ? "bg-[var(--color-ice)]" : "bg-[var(--color-void)]"}`}
    >
      <div className="w-full max-w-7xl mx-auto pt-12 md:pt-0 pb-32 relative z-10">
        
        {/* Decorative Glows for Complete Package */}
        <AnimatePresence>
          {activeTier === "complete" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 pointer-events-none -z-10">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-acid)]/5 blur-[120px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00ff66]/5 blur-[120px] rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>

        <header className={`flex flex-col md:flex-row md:justify-between md:items-end mb-12 border-b pb-8 gap-8 transition-colors duration-700 ${activeTier === "tier1" ? "border-[var(--color-void)]/10" : "border-white/10"}`}>
          <div>
            <button 
              onClick={onBack}
              className={`text-xs tracking-[0.3em] uppercase mb-6 transition-colors flex items-center gap-4 group w-max ${activeTier === "tier1" ? "text-[var(--color-void)]/60 hover:text-[var(--color-cobalt)]" : "text-white/60 hover:text-[var(--color-acid)]"}`}
            >
              <span className={`w-8 h-[2px] transition-all duration-500 group-hover:w-16 ${activeTier === "tier1" ? "bg-[var(--color-void)]/30 group-hover:bg-[var(--color-cobalt)]" : "bg-white/30 group-hover:bg-[var(--color-acid)]"}`} /> 
              {t.back}
            </button>
            <h2 className={`text-4xl md:text-6xl font-serif font-light transition-colors duration-700 ${activeTier === "tier1" ? "text-[var(--color-void)]" : "text-white"}`}>
              {t.title} <span className={`italic transition-colors duration-700 ${activeTier === "tier1" ? "text-[var(--color-cobalt)]" : "text-[var(--color-acid)]"}`}>{t.titleHighlight}</span>
            </h2>
          </div>
          <p className={`font-sans text-sm max-w-sm md:text-right leading-relaxed transition-colors duration-700 ${activeTier === "tier1" ? "text-[var(--color-void)]/50" : "text-white/50"}`}>
            {t.desc}
          </p>
        </header>

        {/* The Toggle Switch */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className={`p-1.5 rounded-full flex gap-1 relative transition-colors duration-700 ${activeTier === "tier1" ? "bg-[var(--color-void)]/5 border border-[var(--color-void)]/10" : "bg-white/5 border border-white/10"}`}>
            <button
              onClick={() => handleTierChange("tier1")}
              className={`relative px-6 md:px-10 py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-500 z-10 ${activeTier === "tier1" ? "text-white" : "text-white/50 hover:text-white"}`}
            >
              {activeTier === "tier1" && (
                <motion.div layoutId="tier-toggle" className="absolute inset-0 bg-[var(--color-void)] rounded-full -z-10 shadow-lg" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              {t.tier1.headerSubtitle}
            </button>
            <button
              onClick={() => handleTierChange("complete")}
              className={`relative px-6 md:px-10 py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-500 z-10 ${activeTier === "complete" ? "text-black" : "text-[var(--color-void)]/50 hover:text-[var(--color-void)]"}`}
            >
              {activeTier === "complete" && (
                <motion.div layoutId="tier-toggle" className="absolute inset-0 bg-[var(--color-acid)] rounded-full -z-10 shadow-[0_0_20px_rgba(204,255,0,0.4)]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              {t.complete.headerSubtitle}
            </button>
          </div>
        </div>

             {/* Dynamic Content Area */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTier === "tier1" ? (
              <motion.div 
                key="tier1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="max-w-3xl mb-8 md:mb-12 mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-serif font-light text-[var(--color-void)] tracking-tight mb-4">
                    {t.tier1.headerTitle}
                  </h2>
                  <p className="text-[var(--color-void)]/60 text-base md:text-lg leading-relaxed">
                    {t.tier1.headerDesc}
                  </p>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 gap-3 md:gap-6"
                >
                  {[MonitorSmartphone, LayoutDashboard, Gift, BarChart3].map((Icon, idx) => (
                    <motion.div 
                      key={idx}
                      variants={itemVariants}
                      className="bg-white p-4 md:p-8 rounded-[1rem] md:rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 border border-[var(--color-void)]/5 flex flex-col gap-2 md:gap-4 group"
                    >
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[var(--color-ice)] flex items-center justify-center text-[var(--color-cobalt)] group-hover:bg-[var(--color-cobalt)] group-hover:text-white transition-colors duration-500">
                        <Icon className="w-4 h-4 md:w-6 md:h-6" />
                      </div>
                      <h4 className="font-serif text-base md:text-xl text-[var(--color-void)] mt-1 md:mt-2 leading-tight">{t.tier1.cards[idx].title}</h4>
                      <p className="text-[var(--color-void)]/60 text-xs md:text-sm leading-relaxed">{t.tier1.cards[idx].desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="max-w-3xl mb-8 md:mb-12 mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight mb-4">
                    {t.complete.headerTitle}
                  </h2>
                  <p className="text-white/60 text-base md:text-lg leading-relaxed">
                    {t.complete.headerDesc}
                  </p>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
                >
                  {[Smartphone, BookOpen, Tablet, Megaphone, MessageSquare, HeartHandshake].map((Icon, idx) => (
                    <motion.div 
                      key={idx}
                      variants={itemVariants}
                      className="bg-white/5 border border-white/10 hover:bg-white/10 p-4 md:p-8 rounded-[1rem] md:rounded-[1.5rem] transition-all duration-500 flex flex-col gap-2 md:gap-4 group"
                    >
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[var(--color-acid)]/10 flex items-center justify-center text-[var(--color-acid)] group-hover:bg-[var(--color-acid)] group-hover:text-black transition-colors duration-500">
                        <Icon className="w-4 h-4 md:w-6 md:h-6" />
                      </div>
                      <h4 className="font-serif text-base md:text-xl text-white mt-1 md:mt-2 leading-tight">{t.complete.cards[idx].title}</h4>
                      <p className="text-white/50 text-xs md:text-sm leading-relaxed">{t.complete.cards[idx].desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        </div>

        {/* Legitimate SEO Footer Credit */}
        <footer className="w-full text-center py-4 relative z-10 bg-transparent mt-12 md:mb-8 pointer-events-auto">
          <p className="text-white/20 text-[9px] md:text-[10px] tracking-widest uppercase font-mono selection:bg-[#00ff66]/20">
            &copy; {new Date().getFullYear()} ZayronSystems. Enterprise System Software Development.
          </p>
        </footer>
      </motion.div>
  );
}
