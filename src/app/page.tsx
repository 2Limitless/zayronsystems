"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUp, Globe } from "lucide-react";
import PortfolioExperience from "../components/PortfolioExperience";
import ServicesExperience from "../components/ServicesExperience";
import AboutExperience from "../components/AboutExperience";

export type ViewState = "hub" | "portfolio" | "services" | "about";
export type Language = "en" | "es";

const dict = {
  en: {
    nav: { portfolio: "Case Studies", services: "Enterprise Stack", about: "Consultation" },
    hub: {
      pills: ["Logistics Optimization", "Heavy-Duty Scalability", "Custom Enterprise Architectures"],
      headline: "Industrial Scale Software.",
      subhead: "Building custom enterprise architectures for heavy industry, logistics, sandblasting, demolition, and high-performance teams.",
      stats: [
        { num: "40", title: "Operational Efficiency", desc: "Custom software integrations reduce manual workflows and drive up to 40% increased operational efficiency." },
        { num: "65", title: "Data Unification", desc: "Centralized data architectures turn disjointed legacy systems into a single source of truth, improving reporting speeds by 65%." },
        { num: "99", title: "System Reliability", desc: "Enterprise-grade infrastructure ensures 99.99% uptime for mission-critical logistics and asset tracking operations." }
      ],
      cta1: "Schedule Architecture Review",
      cta2: "View Industrial Capabilities"
    },
    dock: { hub: "Hub" }
  },
  es: {
    nav: { portfolio: "Casos de Estudio", services: "Stack Empresarial", about: "Consulta" },
    hub: {
      pills: ["Optimización Logística", "Escalabilidad Industrial", "Arquitecturas Personalizadas"],
      headline: "Software a Escala Industrial.",
      subhead: "Construimos arquitecturas empresariales personalizadas para la industria pesada, logística, demolición y equipos de alto rendimiento.",
      stats: [
        { num: "40", title: "Eficiencia Operativa", desc: "Las integraciones de software personalizadas reducen los flujos de trabajo manuales e impulsan hasta un 40% más de eficiencia operativa." },
        { num: "65", title: "Unificación de Datos", desc: "Las arquitecturas centralizadas convierten los sistemas heredados en una única fuente, mejorando informes en un 65%." },
        { num: "99", title: "Confiabilidad del Sistema", desc: "La infraestructura empresarial garantiza un 99,99% de tiempo de actividad para operaciones logísticas críticas." }
      ],
      cta1: "Programar Revisión",
      cta2: "Ver Capacidades Industriales"
    },
    dock: { hub: "Inicio" }
  }
};

const OverlayWrapper = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: "100%" }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: "100%" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="fixed inset-0 z-[200] bg-black overflow-hidden pointer-events-auto"
  >
    <button 
      onClick={onClose}
      className="absolute top-8 right-8 md:top-12 md:right-12 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
    >
      <X size={24} />
    </button>
    {children}
  </motion.div>
);

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>("hub");
  const [lang, setLang] = useState<Language>("en");
  const [servicesTheme, setServicesTheme] = useState<"dark" | "light">("dark");
  const t = dict[lang];

  const handleNavClick = (view: ViewState) => setCurrentView(view);

  return (
    <main className={`relative w-full h-[100dvh] overflow-x-hidden bg-black flex flex-col ${currentView === 'hub' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
      <div className="absolute inset-0 z-0 bg-black pointer-events-none" />
      <img src="/hub_background.jpg" className="absolute inset-0 z-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-overlay" alt="Background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50vh] bg-white opacity-[0.03] blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        <header className="flex-none flex items-center justify-between px-8 py-8 md:px-16 md:py-10 pointer-events-auto">
          <img src="/logo.png" alt="ZayronSystems Logo" className="h-10 md:h-16 w-auto object-contain" />
          <nav className="hidden md:flex space-x-12 items-center">
            <button onClick={() => handleNavClick("portfolio")} className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors">{t.nav.portfolio}</button>
            <button onClick={() => handleNavClick("services")} className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors">{t.nav.services}</button>
            <button onClick={() => handleNavClick("about")} className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors">{t.nav.about}</button>
            
            {/* Language Toggle */}
            <button 
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
            >
              <Globe size={14} />
              {lang}
            </button>
          </nav>
          
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-all text-xs font-bold uppercase"
            >
              <Globe size={16} />
              {lang}
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col relative pointer-events-auto">
          <AnimatePresence>
            {currentView === "hub" && (
                <motion.div 
                key="hub"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col w-full min-h-screen relative"
              >
                <div className="flex-none w-full flex flex-col items-center justify-start pt-6 md:pt-12 px-4 z-20">
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {t.hub.pills.map((feature) => (
                      <span key={feature} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <h1 className="font-sans text-[12vw] md:text-[110px] leading-[0.9] text-center font-bold tracking-tighter bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent pb-4">
                    {t.hub.headline}
                  </h1>
                  
                  <p className="text-white/60 font-sans text-sm md:text-base font-light max-w-xl text-center leading-relaxed mb-12">
                    {t.hub.subhead}
                  </p>

                  <div className="w-full max-w-5xl mx-auto mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      {t.hub.stats.map((stat, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + (i * 0.2) }}
                          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col items-start text-left hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-4xl md:text-5xl font-bold font-sans tracking-tighter text-white">{stat.num}<span className="text-white/40 text-3xl">%</span></span>
                            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                              <ArrowUp className="text-[#00ff66] w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_15px_rgba(0,255,102,0.6)]" strokeWidth={3} />
                            </motion.div>
                          </div>
                          <h4 className="text-white text-sm font-bold mb-2 tracking-wide uppercase">{stat.title}</h4>
                          <p className="text-white/50 text-xs leading-relaxed font-medium">
                            {stat.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-4 pointer-events-auto">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick("about")}
                      className="text-black bg-white shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] px-10 py-4 rounded-full font-bold transition-all duration-500 w-max text-xs md:text-sm tracking-[0.1em]"
                    >
                      {t.hub.cta1}
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick("portfolio")}
                      className="text-white border border-white/20 hover:bg-white/10 px-8 py-4 rounded-full font-bold transition-all duration-500 w-max text-xs md:text-sm tracking-[0.1em] flex items-center gap-2"
                    >
                      {t.hub.cta2}
                      <motion.span 
                        animate={{ x: [0, 3, 0] }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[#00ff66] text-lg leading-none inline-block ml-2"
                      >
                        &rarr;
                      </motion.span>
                    </motion.button>
                  </div>
                </div>

                <div className="flex-none w-full flex items-center justify-center -space-x-12 md:space-x-0 md:gap-10 px-8 mt-12 z-10 pointer-events-none perspective-[1200px]">
                  <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }} className="w-[140px] md:w-[220px] lg:w-[260px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-black/50 rotate-[-6deg] md:rotate-0 translate-y-4 md:translate-y-0">
                    <img src="/logistics_app_mockup.jpg" alt="Enterprise Mobile App UI" className="w-full h-full object-cover opacity-90" />
                  </motion.div>
                  <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="w-[160px] md:w-[260px] lg:w-[300px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_60px_100px_rgba(0,0,0,0.8)] bg-black/50 z-20">
                    <img src="/industrial_tablet_mockup.jpg" alt="Industrial Control Tablet" className="w-full h-full object-cover" />
                  </motion.div>
                  <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="w-[140px] md:w-[220px] lg:w-[260px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-black/50 rotate-[6deg] md:rotate-0 translate-y-4 md:translate-y-0">
                    <img src="/enterprise_analytics_dashboard.jpg" alt="Enterprise Analytics Dashboard" className="w-full h-full object-cover opacity-90" />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentView === "portfolio" && (
              <OverlayWrapper key="portfolio" onClose={() => setCurrentView("hub")}>
                <PortfolioExperience lang={lang} onBack={() => setCurrentView("hub")} />
              </OverlayWrapper>
            )}
            
            {currentView === "services" && (
              <OverlayWrapper key="services" onClose={() => setCurrentView("hub")}>
                <ServicesExperience lang={lang} onBack={() => setCurrentView("hub")} onThemeChange={setServicesTheme} />
              </OverlayWrapper>
            )}

            {currentView === "about" && (
              <OverlayWrapper key="about" onClose={() => setCurrentView("hub")}>
                <AboutExperience lang={lang} onBack={() => setCurrentView("hub")} />
              </OverlayWrapper>
            )}
          </AnimatePresence>
        </div>

        {(() => {
          const isLightMode = currentView === "services" && servicesTheme === "light";
          return (
            <motion.nav
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className={`fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 p-2 rounded-full backdrop-blur-xl z-[300] border shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-colors duration-500 ${
                isLightMode ? "bg-black/10 border-black/10" : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-center gap-1 md:gap-2 pointer-events-auto">
                {[
                  { id: "hub", label: t.dock.hub },
                  { id: "portfolio", label: t.nav.portfolio },
                  { id: "services", label: t.nav.services },
                  { id: "about", label: t.nav.about }
                ].map((item) => {
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id as ViewState)}
                      className={`relative px-3 md:px-8 py-3 rounded-full text-center transition-colors duration-500 ${
                        item.id === "about"
                          ? isActive 
                            ? "text-[var(--color-void)] font-bold"
                            : isLightMode
                              ? "text-black font-bold bg-[#00ff66]/40 border border-[#00ff66] hover:bg-[#00ff66]/60 shadow-[0_0_15px_rgba(0,255,102,0.3)]"
                              : "text-[#00ff66] font-bold bg-[#00ff66]/10 hover:bg-[#00ff66]/20 shadow-[0_0_15px_rgba(0,255,102,0.1)]"
                          : isActive
                            ? isLightMode ? "text-white" : "text-black"
                            : isLightMode ? "text-black/60 hover:text-black" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="liquid-nav-blob"
                          className={`absolute inset-0 rounded-full -z-10 shadow-lg ${
                            item.id === "about" 
                              ? "bg-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.4)]" 
                              : isLightMode ? "bg-black" : "bg-white"
                          }`}
                          transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1.2 }}
                        />
                      )}
                      <span className="relative z-10 font-sans text-[10px] md:text-xs font-semibold tracking-[0.1em] uppercase whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          );
        })()}

      </div>

      {/* Legitimate SEO Footer Credit */}
      <footer className="w-full text-center py-4 relative z-10 bg-transparent mt-12 mb-20 md:mb-8 pointer-events-auto">
        <p className="text-white/20 text-[9px] md:text-[10px] tracking-widest uppercase font-mono selection:bg-[#00ff66]/20">
          &copy; {new Date().getFullYear()} ZayronSystems. Enterprise System Software Development.
        </p>
      </footer>
    </main>
  );
}
