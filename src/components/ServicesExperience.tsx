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
      headerDesc: "The foundational software stack for operational dominance.",
      cards: [
        { title: "Command Center", desc: "Watch your entire operation run on autopilot from a single, flawless pane of glass." },
        { title: "Absolute Memory", desc: "Never lose a data point again. Have your entire operational history instantly accessible." },
        { title: "System Control", desc: "Command external tools effortlessly. Your software becomes the central brain of your business." },
        { title: "Predictive Analytics", desc: "Predict market trends and operational bottlenecks before your competitors even wake up." }
      ]
    },
    complete: {
      headerSubtitle: "Full-Scale",
      headerTitle: "Full-Scale Transformation.",
      headerDesc: "Total operational takeover. We handle the transition while you focus on scaling.",
      cards: [
        { title: "Infinite Scale", desc: "Sleep soundly knowing your bespoke cloud architecture can handle massive growth without breaking." },
        { title: "Painless Extraction", desc: "We surgically extract your business from archaic legacy systems without you lifting a finger." },
        { title: "Workforce Weaponization", desc: "Your team hits the ground running on day one with pre-configured, rugged hardware." },
        { title: "Replicable Genius", desc: "We encode your operational SOPs into software, making your business infinitely scalable." },
        { title: "Peace of Mind", desc: "Critical updates and automated alerts find you instantly, wherever you are in the world." },
        { title: "Digital Perimeter", desc: "An elite engineering team on standby 24/7. We guard your infrastructure while you sleep." }
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
      headerDesc: "El stack de software fundamental para el dominio operativo.",
      cards: [
        { title: "Centro de Comando", desc: "Observa cómo toda tu operación funciona en piloto automático desde un solo panel perfecto." },
        { title: "Memoria Absoluta", desc: "Nunca vuelvas a perder un dato. Ten todo tu historial operativo accesible al instante." },
        { title: "Control de Sistemas", desc: "Comanda herramientas externas sin esfuerzo. Tu software se convierte en el cerebro central." },
        { title: "Análisis Predictivo", desc: "Predice tendencias del mercado y cuellos de botella antes de que tus competidores despierten." }
      ]
    },
    complete: {
      headerSubtitle: "Escala Total",
      headerTitle: "Transformación a Escala Total.",
      headerDesc: "Toma de control operativo total. Manejamos la transición mientras tú te enfocas en crecer.",
      cards: [
        { title: "Escala Infinita", desc: "Duerme tranquilo sabiendo que tu arquitectura en la nube manejará un crecimiento masivo sin fallar." },
        { title: "Extracción Sin Dolor", desc: "Extraemos quirúrgicamente tu negocio de sistemas arcaicos sin que muevas un dedo." },
        { title: "Fuerza Laboral Armada", desc: "Tu equipo entra en acción el primer día con hardware preconfigurado y resistente." },
        { title: "Genio Replicable", desc: "Codificamos tus procesos en el software, haciendo que tu negocio sea infinitamente escalable." },
        { title: "Tranquilidad", desc: "Actualizaciones críticas y alertas automatizadas te encuentran al instante, dondequiera que estés." },
        { title: "Perímetro Digital", desc: "Un equipo de élite en espera 24/7. Protegemos tu infraestructura mientras duermes." }
      ]
    }
  }
};

export default function ServicesExperience({ lang, onBack, onThemeChange, onNavigateToApply, visitorName }: { lang: Language, onBack: () => void, onThemeChange?: (theme: "dark" | "light") => void, onNavigateToApply?: () => void, visitorName?: string }) {
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

        {/* Aggressive CTA */}
        {onNavigateToApply && (
          <motion.div variants={itemVariants} initial="hidden" animate="show" className="w-full flex flex-col items-center justify-center mt-24 text-center pb-12">
            <h3 className={`text-2xl md:text-4xl font-bold mb-6 tracking-tight font-sans transition-colors duration-700 ${activeTier === "tier1" ? "text-black" : "text-white"}`}>
              {lang === 'en' ? `Is Your Operation Qualified, ${visitorName || 'Commander'}?` : `¿Tu Operación Está Calificada, ${visitorName || 'Comandante'}?`}
            </h3>
            <p className={`max-w-xl mb-8 font-light transition-colors duration-700 ${activeTier === "tier1" ? "text-black/60" : "text-white/50"}`}>
              {lang === 'en' ? "We do not deploy our architecture for everyone. Apply below to see if your business qualifies for our digital infrastructure." : "No desplegamos nuestra arquitectura para todos. Aplica a continuación para ver si calificas."}
            </p>
            <button 
              onClick={onNavigateToApply}
              className={`group relative px-12 py-5 font-bold tracking-[0.2em] text-xs md:text-sm uppercase rounded-full transition-all duration-700 overflow-hidden ${activeTier === "tier1" ? "bg-black text-white shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:shadow-[0_0_60px_rgba(0,0,0,0.4)]" : "bg-[#00ff66] text-black shadow-[0_0_40px_rgba(0,255,102,0.2)] hover:shadow-[0_0_60px_rgba(0,255,102,0.4)]"}`}
            >
              <div className={`absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ${activeTier === "tier1" ? "bg-[var(--color-cobalt)]" : "bg-white"}`} />
              <span className="relative z-10 transition-colors duration-500">
                {lang === 'en' ? "Submit Application" : "Enviar Aplicación"}
              </span>
            </button>
          </motion.div>
        )}

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
