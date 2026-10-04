"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUp, Globe } from "lucide-react";
import PortfolioExperience from "../components/PortfolioExperience";
import ServicesExperience from "../components/ServicesExperience";
import AboutExperience from "../components/AboutExperience";
import WhyUsExperience from "../components/WhyUsExperience";

export type ViewState = "hub" | "portfolio" | "services" | "whyus" | "about";
export type Language = "en" | "es";
export type Industry = "general" | "industrial" | "restaurants" | "realestate";

const industriesList = [
  { id: "general", label: { en: "General", es: "General" } },
  { id: "industrial", label: { en: "Industrial Operations", es: "Operaciones Industriales" } },
  { id: "restaurants", label: { en: "Restaurants & Food", es: "Restaurantes y Comida" } },
  { id: "realestate", label: { en: "Real Estate Agents", es: "Agentes Inmobiliarios" } }
] as const;

const hubImages: Record<Industry, { left: string, center: string, right: string }> = {
  general: {
    left: "/app_showcase_1.png",
    center: "/enterprise_analytics_dashboard.jpg",
    right: "/app_showcase_3.png"
  },
  industrial: {
    left: "/logistics_app_mockup.jpg",
    center: "/industrial_tablet_mockup.jpg",
    right: "/analytics_dashboard_panel.jpg"
  },
  restaurants: {
    left: "/mobile_app_mockup.jpg",
    center: "/kds_tablet_mockup.jpg",
    right: "/restaurant_comparison.jpg"
  },
  realestate: {
    left: "/realestate_app_mockup.jpg",
    center: "/realestate_dashboard.jpg",
    right: "/realestate_virtual_tour.jpg"
  }
};

const dict = {
  en: {
    nav: { portfolio: "Case Studies", services: "Enterprise Stack", whyus: "Why Us", about: "Submit Dossier", partners: "Partner Portal" },
    hub: {
      general: {
        pills: ["Sovereign Infrastructure", "Systemic Diagnosis", "Workflow Automation"],
        headline: "Your Software is Sabotaging Your Growth.",
        subhead: "Off-the-shelf software is built for everyone, meaning it's perfect for no one. We diagnose operational bottlenecks and engineer custom, sovereign digital infrastructure. Stop bleeding margins to bloated SaaS subscriptions and take total control.",
        stats: [
          { num: "20", title: "Margin Reclaimed", desc: "Our custom integrations eliminate redundant subscriptions and inefficiencies, reclaiming 20-30% in pure profit. — McKinsey & Company" },
          { num: "250", title: "Unfair Advantage", desc: "Bespoke digital infrastructure yields a 250% average ROI, creating a moat your competitors cannot cross. — Nucleus Research" },
          { num: "100", title: "Data Sovereignty", desc: "Own your data. Never let a third-party platform dictate your capabilities or hold your customer data hostage again. — Forrester" }
        ],
        cta1: "Apply for Consultation",
        cta2: "View Infrastructure"
      },
      industrial: {
        pills: ["Risk Mitigation", "Predictive Dominance", "Asset Control"],
        headline: "Stop Losing Money to Avoidable Downtime.",
        subhead: "Every minute a machine is down, you bleed cash. We engineer robust, predictive software for heavy operations that eliminates unexpected failures. We don't just track assets; we give you absolute control over your operational margins.",
        stats: [
          { num: "50", title: "Failure Prevented", desc: "Our predictive telemetry systems detect anomalies before they become catastrophes, reducing downtime by up to 50%. — U.S. Department of Energy" },
          { num: "40", title: "Lifespan Extended", desc: "Digital monitoring extends the life of multi-million dollar equipment by 40%. Stop replacing machines prematurely. — Deloitte Industrial" },
          { num: "25", title: "Cost Eradicated", desc: "Digitizing inventory and maintenance schedules ruthlessly cuts 25% of your operational waste. — World Economic Forum" }
        ],
        cta1: "Apply for Consultation",
        cta2: "View Industrial Stack"
      },
      restaurants: {
        pills: ["Margin Protection", "Direct Audience", "Operational Control"],
        headline: "Delivery Apps Are Stealing Your Business.",
        subhead: "Third-party apps are hijacking your customers and slicing your margins. We build custom, sovereign ordering systems and loyalty apps. Reclaim your profits, own your customer data, and cut out the parasites.",
        stats: [
          { num: "30", title: "Profits Reclaimed", desc: "Our custom ordering platforms bypass predatory third-party networks, instantly saving you 30% per order. — National Restaurant Association" },
          { num: "26", title: "Spend Increased", desc: "Customers spend 26% more when they are locked into your proprietary, frictionless digital ecosystem. — Deloitte Digital" },
          { num: "100", title: "Data Ownership", desc: "Never rent your audience. Own 100% of your customer data to drive targeted, highly-converting campaigns on command. — Forbes" }
        ],
        cta1: "Apply for Consultation",
        cta2: "View Restaurant Stack"
      },
      realestate: {
        pills: ["Sovereign Pipeline", "Lead Monopolization", "AI Subjugation"],
        headline: "Stop Giving Away 40% of Your Commission.",
        subhead: "You do all the work, but your brokerage takes the cut. We architect 'Shadow Pipelines' that let you capture and close your personal network outside of your team's CRM. Build a sovereign brand and keep what you kill.",
        stats: [
          { num: "100", title: "Commission Retained", desc: "Process your personal network independently. Stop splitting your hard-earned money with brokerages that don't generate your leads. — RESO" },
          { num: "0", title: "Leads Lost", desc: "Our AI receptionists engage every missed call instantly. If you miss a call, you lose a deal. We ensure that never happens. — Harvard Business Review" },
          { num: "71", title: "Authority Established", desc: "71% of buyers choose agents based on perceived authority. A custom VIP portal makes you look like the only logical choice. — NAR" }
        ],
        cta1: "Build Your Shadow Pipeline",
        cta2: "View Agent Stack"
      }
    },
    dock: { hub: "Hub" }
  },
  es: {
    nav: { portfolio: "Casos de Estudio", services: "Stack Empresarial", whyus: "Por Qué Elegirnos", about: "Enviar Dossier", partners: "Portal de Socios" },
    hub: {
      general: {
        pills: ["Infraestructura Soberana", "Diagnóstico Sistémico", "Automatización"],
        headline: "Tu Software Está Saboteando Tu Crecimiento.",
        subhead: "El software genérico está hecho para todos, lo que significa que no es perfecto para nadie. Diagnosticamos cuellos de botella y diseñamos infraestructura digital soberana. Deja de sangrar márgenes en SaaS y toma el control total.",
        stats: [
          { num: "20", title: "Margen Recuperado", desc: "Nuestras integraciones eliminan ineficiencias, recuperando un 20-30% en pura ganancia. — McKinsey & Company" },
          { num: "250", title: "Ventaja Injusta", desc: "La infraestructura digital a medida genera un ROI del 250%, creando un foso que tus competidores no pueden cruzar. — Nucleus Research" },
          { num: "100", title: "Soberanía de Datos", desc: "Sé dueño de tus datos. Nunca dejes que una plataforma de terceros dicte tus capacidades o secuestre tu información. — Forrester" }
        ],
        cta1: "Solicitar Consulta",
        cta2: "Ver Infraestructura"
      },
      industrial: {
        pills: ["Mitigación de Riesgos", "Dominio Predictivo", "Control de Activos"],
        headline: "Deja de Perder Dinero por Inactividad Evitable.",
        subhead: "Cada minuto que una máquina se detiene, pierdes efectivo. Diseñamos software predictivo para operaciones pesadas que elimina fallas inesperadas. Te damos control absoluto sobre tus márgenes operativos.",
        stats: [
          { num: "50", title: "Fallas Prevenidas", desc: "Nuestros sistemas de telemetría detectan anomalías antes de que sean catástrofes, reduciendo la inactividad hasta un 50%. — U.S. Department of Energy" },
          { num: "40", title: "Vida Extendida", desc: "El monitoreo digital extiende la vida de equipos multimillonarios en un 40%. Deja de reemplazar máquinas prematuramente. — Deloitte Industrial" },
          { num: "25", title: "Costo Erradicado", desc: "Digitalizar el inventario y el mantenimiento recorta despiadadamente el 25% de tu desperdicio operativo. — World Economic Forum" }
        ],
        cta1: "Solicitar Consulta",
        cta2: "Ver Stack Industrial"
      },
      restaurants: {
        pills: ["Protección de Margen", "Audiencia Directa", "Control Operativo"],
        headline: "Las Apps de Delivery Están Robando Tu Negocio.",
        subhead: "Las aplicaciones de terceros secuestran a tus clientes y cortan tus márgenes. Construimos sistemas de pedidos soberanos. Recupera tus ganancias, sé dueño de tus datos y corta a los intermediarios.",
        stats: [
          { num: "30", title: "Ganancias Recuperadas", desc: "Nuestras plataformas eluden las redes de terceros, ahorrándote instantáneamente un 30% por pedido. — National Restaurant Association" },
          { num: "26", title: "Gasto Aumentado", desc: "Los clientes gastan un 26% más cuando están inmersos en tu ecosistema digital propietario y sin fricciones. — Deloitte Digital" },
          { num: "100", title: "Propiedad de Datos", desc: "Nunca alquiles tu audiencia. Posee el 100% de los datos de tus clientes para lanzar campañas de alta conversión a voluntad. — Forbes" }
        ],
        cta1: "Solicitar Consulta",
        cta2: "Ver Stack de Restaurantes"
      },
      realestate: {
        pills: ["Pipeline Soberano", "Monopolio de Leads", "Subyugación IA"],
        headline: "Deja de Regalar el 40% de tu Comisión.",
        subhead: "Tú haces todo el trabajo, pero tu agencia se lleva el corte. Arquitectamos 'Pipelines Ocultos' para capturar y cerrar tu red personal fuera del CRM de tu equipo. Construye una marca soberana.",
        stats: [
          { num: "100", title: "Comisión Retenida", desc: "Procesa tu red de forma independiente. Deja de dividir tu dinero con agencias que no generan tus leads. — RESO" },
          { num: "0", title: "Leads Perdidos", desc: "Nuestras recepcionistas IA atienden cada llamada perdida al instante. Si pierdes una llamada, pierdes un trato. Nos aseguramos de que eso nunca pase. — Harvard Business Review" },
          { num: "71", title: "Autoridad Establecida", desc: "El 71% elige agentes por su autoridad percibida. Un portal VIP te hace ver como la única opción lógica. — NAR" }
        ],
        cta1: "Construye tu Pipeline",
        cta2: "Ver Stack de Agentes"
      }
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
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>("general");
  const [showIndustryPopup, setShowIndustryPopup] = useState(true);
  const [hasInitiated, setHasInitiated] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [maskWidth, setMaskWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      setMaskWidth(window.innerWidth - 32); // 16px left + 16px right padding
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    const savedIndustry = sessionStorage.getItem("zayron_industry") as Industry | null;
    const savedName = sessionStorage.getItem("zayron_visitor_name");

    if (savedName) {
      const formatted = savedName.charAt(0).toUpperCase() + savedName.slice(1);
      setVisitorName(formatted);
    }

    // Check for direct consultation link to skip modal
    if (window.location.search.includes("consultation=true")) {
      setShowIndustryPopup(false);
      setHasInitiated(true);
      setCurrentView("about");
    } else {
      if (sessionStorage.getItem("zayron_access") === "granted") {
        setHasInitiated(true);
      }
      if (savedIndustry) {
        setSelectedIndustry(savedIndustry);
        setShowIndustryPopup(false);
      }
    }
    
    setIsReady(true);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleInitiate = () => {
    if (!visitorName.trim()) return;
    const formattedName = visitorName.trim().charAt(0).toUpperCase() + visitorName.trim().slice(1);
    sessionStorage.setItem("zayron_visitor_name", formattedName);
    sessionStorage.setItem("zayron_access", "granted");
    setVisitorName(formattedName);
    setHasInitiated(true);
  };

  const handleIndustrySelect = (indId: Industry) => {
    sessionStorage.setItem("zayron_industry", indId);
    setSelectedIndustry(indId);
    setShowIndustryPopup(false);
  };
  
  const t = dict[lang];
  const hubData = t.hub[selectedIndustry];

  const handleNavClick = (view: ViewState) => setCurrentView(view);

  if (!isReady) {
    return <div className="w-full h-[100dvh] bg-black" />; // Prevent UI flash during hydration
  }

  return (
    <main className={`relative w-full h-[100dvh] overflow-x-hidden bg-black flex flex-col ${currentView === 'hub' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
      
      {/* Initial Gateway / Micro-Commitment 1 */}
      <AnimatePresence>
        {!hasInitiated && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
          >
            {/* Extremely subtle, deep ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
            
            {/* Top Left Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-8 left-8 md:top-12 md:left-12 z-20"
            >
              <img 
                src="/logo.png" 
                alt="ZayronSystems" 
                className="h-8 md:h-12 w-auto object-contain opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
              />
            </motion.div>

            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center justify-center z-10 relative w-full h-full px-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col items-center gap-8 w-full max-w-sm"
              >
                <input 
                  type="text" 
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && visitorName.trim()) handleInitiate();
                  }}
                  maxLength={20}
                  placeholder="IDENTIFY YOURSELF"
                  className="w-full bg-transparent border-b border-white/20 text-center text-white text-xl md:text-2xl tracking-[0.3em] uppercase pb-4 outline-none focus:border-[#00ff66] transition-colors placeholder:text-white/20 font-light"
                  autoFocus
                />
                
                <button 
                  onClick={handleInitiate}
                  disabled={!visitorName.trim()}
                  className="group relative w-full py-5 bg-transparent border border-white/30 hover:border-white hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-white/30 transition-all duration-700 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]"
                >
                  <span className="relative z-10 text-white/70 group-hover:text-black disabled:group-hover:text-white/70 text-xs md:text-sm font-bold tracking-[0.5em] uppercase transition-colors duration-700">
                    Initialize
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial Industry Selection Modal / Micro-Commitment 2 */}
      <AnimatePresence>
        {hasInitiated && showIndustryPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 pointer-events-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 max-w-2xl w-full text-center relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              
              <img src="/logo.png" alt="ZayronSystems Logo" className="h-10 md:h-12 w-auto object-contain mx-auto mb-8" />
              
              <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tighter text-white mb-4">
                Identify Your Sector.
              </h2>
              <p className="text-white/60 text-sm md:text-base mb-10 max-w-md mx-auto">
                We engineer sovereign digital infrastructure for high-performance operations. Select your sector below to see how we dominate your industry:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industriesList.filter(ind => ind.id !== "general").map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => handleIndustrySelect(ind.id)}
                    className="group relative overflow-hidden rounded-2xl border border-white/20 bg-black/50 p-6 hover:border-[#00ff66]/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,255,102,0.1)]"
                  >
                     <div className="absolute inset-0 bg-gradient-to-br from-[#00ff66]/0 via-[#00ff66]/0 to-[#00ff66]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <span className="relative z-10 text-white font-bold text-sm tracking-widest uppercase block mb-1">
                       {ind.id === 'realestate' && lang === 'en' ? 'Real Estate' : ind.label[lang].split(" ")[0]}
                     </span>
                     <span className="relative z-10 text-white/50 text-[10px] tracking-widest uppercase block">
                       {ind.id === 'realestate' && lang === 'en' ? 'Agents' : ind.label[lang].split(" ").slice(1).join(" ")}
                     </span>
                  </button>
                ))}
                
                <a
                  href="/barbers"
                  className="group relative overflow-hidden rounded-2xl border border-white/20 bg-black/50 p-6 hover:border-[#00ff66]/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,255,102,0.1)] block no-underline"
                >
                   <div className="absolute inset-0 bg-gradient-to-br from-[#00ff66]/0 via-[#00ff66]/0 to-[#00ff66]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <span className="relative z-10 text-white font-bold text-sm tracking-widest uppercase block mb-1">
                     {lang === 'es' ? "Barberos" : "Barbers"}
                   </span>
                   <span className="relative z-10 text-white/50 text-[10px] tracking-widest uppercase block">
                     {lang === 'es' ? "Ver Plataforma" : "View Platform"}
                   </span>
                </a>
              </div>
              
              <div className="mt-4">
                <a
                  href="/partners"
                  className="group relative overflow-hidden rounded-2xl border border-[#00ff66]/30 bg-[#00ff66]/5 p-4 md:p-6 hover:border-[#00ff66]/60 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,255,102,0.15)] block no-underline w-full text-center"
                >
                   <div className="absolute inset-0 bg-gradient-to-r from-[#00ff66]/0 via-[#00ff66]/10 to-[#00ff66]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <span className="relative z-10 text-[#00ff66] font-bold text-sm md:text-base tracking-widest uppercase block mb-1">
                     Referral Portal (Earn 30%)
                   </span>
                   <span className="relative z-10 text-white/50 text-[10px] tracking-widest uppercase block">
                     It's a no brainer (less than 19 seconds)
                   </span>
                </a>
              </div>
              
              <button 
                onClick={() => handleIndustrySelect("general")}
                className="mt-6 text-white/30 hover:text-white/80 text-xs tracking-widest uppercase underline underline-offset-4 transition-colors"
              >
                Skip & View General Enterprise
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <div className="absolute inset-0 z-0 bg-black pointer-events-none" />
      <img src="/hub_background.jpg" className="absolute inset-0 z-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-overlay" alt="Background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50vh] bg-white opacity-[0.03] blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        <header className="flex-none flex items-center justify-between px-8 py-8 md:px-16 md:py-10 pointer-events-auto">
          <img src="/logo.png" alt="ZayronSystems Logo" className="h-10 md:h-16 w-auto object-contain" />
          <nav className="hidden md:flex space-x-12 items-center">
            <button onClick={() => handleNavClick("portfolio")} className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors">{t.nav.portfolio}</button>
            <button onClick={() => handleNavClick("services")} className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors">{t.nav.services}</button>
            <button onClick={() => handleNavClick("whyus")} className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors">{t.nav.whyus}</button>
            <button onClick={() => handleNavClick("about")} className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors">{t.nav.about}</button>
            <a href="/partners" className="text-[#00ff66]/80 hover:text-[#00ff66] text-xs tracking-widest uppercase transition-colors drop-shadow-[0_0_8px_rgba(0,255,102,0.3)]">{t.nav.partners}</a>
            
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
            <a href="/partners" className="flex items-center justify-center px-4 py-2 rounded-full border border-[#00ff66]/30 bg-[#00ff66]/10 text-[#00ff66] text-xs font-bold uppercase">
              {t.nav.partners}
            </a>
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
                  
                  {/* Industry Selector */}
                  <div className="flex flex-col items-center gap-4 mb-12 w-full relative z-30">
                    <p className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                      {selectedIndustry === "general" ? "Select Your Industry Context" : "Active Industry Context"}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl w-full">
                      {industriesList.map((ind) => {
                        const isSelected = selectedIndustry === ind.id;
                        const isGeneral = selectedIndustry === "general";
                        return (
                          <button
                            key={ind.id}
                            onClick={() => setSelectedIndustry(ind.id)}
                            className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-[11px] font-bold tracking-widest uppercase transition-all duration-500 whitespace-nowrap ${
                              isSelected 
                                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105" 
                                : isGeneral
                                  ? "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/20"
                                  : "bg-transparent text-white/20 border border-transparent hover:border-white/10 hover:text-white/60 opacity-30 hover:opacity-100 scale-95"
                            }`}
                          >
                            {ind.label[lang]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Content Area */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedIndustry}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="flex flex-col items-center w-full"
                    >
                      <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {hubData.pills.map((feature) => (
                          <span key={feature} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            {feature}
                          </span>
                        ))}
                      </div>

                      <h1 className="font-sans text-5xl md:text-[70px] lg:text-[85px] leading-[0.9] text-center font-bold tracking-tighter bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent pb-4 max-w-6xl">
                        {visitorName && <span className="text-[#00ff66] italic">{visitorName},</span>} <br className="hidden md:block"/> {hubData.headline}
                      </h1>
                      
                      <p className="text-white/60 font-sans text-sm md:text-base font-light max-w-2xl text-center leading-relaxed mb-12">
                        {hubData.subhead}
                      </p>

                      <div className="w-full max-w-5xl mx-auto mb-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                          {hubData.stats.map((stat, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + (i * 0.1) }}
                              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col items-start text-left hover:bg-white/10 transition-colors"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-4xl md:text-5xl font-bold font-sans tracking-tighter text-white">{stat.num}<span className="text-white/40 text-3xl">{stat.num !== "0" && stat.num !== "3x" && stat.num !== "5x" ? "%" : ""}</span></span>
                                <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                                  <ArrowUp className="text-[#00ff66] w-5 h-5 md:w-6 md:h-6 drop-shadow-[0_0_15px_rgba(0,255,102,0.6)]" strokeWidth={3} />
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
                          {hubData.cta1}
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleNavClick("portfolio")}
                          className="text-white border border-white/20 hover:bg-white/10 px-8 py-4 rounded-full font-bold transition-all duration-500 w-max text-xs md:text-sm tracking-[0.1em] flex items-center gap-2"
                        >
                          {hubData.cta2}
                          <motion.span 
                            animate={{ x: [0, 3, 0] }} 
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-[#00ff66] text-lg leading-none inline-block ml-2"
                          >
                            &rarr;
                          </motion.span>
                        </motion.button>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-12 md:mt-16 w-full max-w-2xl bg-gradient-to-r from-[#00ff66]/10 to-transparent border border-[#00ff66]/20 rounded-3xl p-6 md:p-8 backdrop-blur-sm pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-6"
                      >
                        <div>
                          <h4 className="text-[#00ff66] font-bold text-lg md:text-xl tracking-tight mb-2">Earn 30% Commission</h4>
                          <p className="text-white/70 text-xs md:text-sm max-w-md">Join our Partner Program. Refer clients and earn a massive 30% commission on every closed deal. Fully transparent tracking.</p>
                        </div>
                        <a href="/partners" className="flex-none whitespace-nowrap bg-[#00ff66] text-black px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,255,102,0.3)]">
                          View Portal
                        </a>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex-none w-full flex items-center justify-center -space-x-12 md:space-x-0 md:gap-10 px-8 mt-12 z-10 pointer-events-none perspective-[1200px]">
                  <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }} className="w-[140px] md:w-[220px] lg:w-[260px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-black/50 rotate-[-6deg] md:rotate-0 translate-y-4 md:translate-y-0 relative">
                    <AnimatePresence>
                      <motion.img key={hubImages[selectedIndustry].left} initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} src={hubImages[selectedIndustry].left} alt="App UI Left" className="absolute inset-0 w-full h-full object-cover" />
                    </AnimatePresence>
                  </motion.div>
                  <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="w-[160px] md:w-[260px] lg:w-[300px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_60px_100px_rgba(0,0,0,0.8)] bg-black/50 z-20 relative">
                    <AnimatePresence>
                      <motion.img key={hubImages[selectedIndustry].center} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} src={hubImages[selectedIndustry].center} alt="App UI Center" className="absolute inset-0 w-full h-full object-cover" />
                    </AnimatePresence>
                  </motion.div>
                  <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="w-[140px] md:w-[220px] lg:w-[260px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-black/50 rotate-[6deg] md:rotate-0 translate-y-4 md:translate-y-0 relative">
                    <AnimatePresence>
                      <motion.img key={hubImages[selectedIndustry].right} initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} src={hubImages[selectedIndustry].right} alt="App UI Right" className="absolute inset-0 w-full h-full object-cover" />
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentView === "portfolio" && (
              <OverlayWrapper key="portfolio" onClose={() => setCurrentView("hub")}>
                <PortfolioExperience lang={lang} industry={selectedIndustry} visitorName={visitorName} onBack={() => setCurrentView("hub")} onNavigateToApply={() => setCurrentView("about")} />
              </OverlayWrapper>
            )}
            
            {currentView === "services" && (
              <OverlayWrapper key="services" onClose={() => setCurrentView("hub")}>
                <ServicesExperience lang={lang} visitorName={visitorName} onBack={() => setCurrentView("hub")} onThemeChange={setServicesTheme} onNavigateToApply={() => setCurrentView("about")} />
              </OverlayWrapper>
            )}

            {currentView === "whyus" && (
              <OverlayWrapper key="whyus" onClose={() => setCurrentView("hub")}>
                <WhyUsExperience lang={lang} visitorName={visitorName} onBack={() => setCurrentView("hub")} onNavigateToApply={() => setCurrentView("about")} />
              </OverlayWrapper>
            )}

            {currentView === "about" && (
              <OverlayWrapper key="about" onClose={() => setCurrentView("hub")}>
                <AboutExperience lang={lang} visitorName={visitorName} onBack={() => setCurrentView("hub")} />
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
              className="fixed bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-[300] flex flex-col items-center pointer-events-none max-w-[95vw] md:max-w-none"
            >
              {/* Unified Masked Dock (Single continuous piece of glass, carved via pure SVG) */}
              {(() => {
                const W = maskWidth || (typeof window !== 'undefined' ? window.innerWidth - 32 : 358);
                const svgPath = `M 30,0 H ${W - 30} A 30,30 0 0 1 ${W},30 A 30,30 0 0 1 ${W - 30},60 H ${W/2 + 92} C ${W/2 + 77},60 ${W/2 + 77},70 ${W/2 + 77},82 A 20,26 0 0 1 ${W/2 + 57},108 H ${W/2 - 57} A 20,26 0 0 1 ${W/2 - 77},82 C ${W/2 - 77},70 ${W/2 - 77},60 ${W/2 - 92},60 H 30 A 30,30 0 0 1 0,30 A 30,30 0 0 1 30,0 Z`;
                const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="112"><path d="${svgPath}" fill="black"/></svg>`;
                const encodedSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

                return (
                  <div 
                    className={`mobile-svg-mask flex flex-col items-center pointer-events-auto w-full md:w-auto relative z-[5] transition-colors duration-500 backdrop-blur-xl ${
                      isLightMode ? "bg-black/10 md:border md:border-black/10" : "bg-white/5 md:border md:border-white/10"
                    }`}
                    style={{ '--dynamic-svg': `url("${encodedSvg}")` } as React.CSSProperties}
                  >
                    {/* Mobile-only CSS Mask injected via a style block to handle media queries easily */}
                    <style dangerouslySetInnerHTML={{__html: `
                      @media (max-width: 767px) {
                        .mobile-svg-mask {
                          border-radius: 0 !important;
                          -webkit-mask-image: var(--dynamic-svg);
                          mask-image: var(--dynamic-svg);
                          -webkit-mask-size: 100% 100%;
                          mask-size: 100% 100%;
                          -webkit-mask-repeat: no-repeat;
                          mask-repeat: no-repeat;
                        }
                      }
                      @media (min-width: 768px) {
                        .mobile-svg-mask {
                          border-radius: 9999px !important;
                          -webkit-mask-image: none;
                          mask-image: none;
                        }
                      }
                    `}} />

                {/* Top Row (60px exactly on mobile) */}
                <div className="flex flex-nowrap items-center justify-center gap-1.5 md:gap-2 h-[60px] md:h-auto px-2 md:p-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible w-full md:w-auto relative z-10">
                  {[
                    { id: "hub", label: t.dock.hub },
                    { id: "portfolio", label: t.nav.portfolio },
                    { id: "services", label: t.nav.services },
                    { id: "whyus", label: t.nav.whyus }
                  ].map((item) => {
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id as ViewState)}
                        className={`relative px-4 md:px-8 py-3 rounded-full text-center transition-colors duration-500 flex-shrink-0 ${
                          isActive
                            ? isLightMode ? "text-white" : "text-black"
                            : isLightMode ? "text-black/60 hover:text-black" : "text-white/60 hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="liquid-nav-blob"
                            className={`absolute inset-0 rounded-full -z-10 shadow-lg ${
                              isLightMode ? "bg-black" : "bg-white"
                            }`}
                            transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1.2 }}
                          />
                        )}
                        <span className="relative z-10 font-sans text-[10px] md:text-xs font-semibold tracking-[0.1em] uppercase whitespace-nowrap">{item.label}</span>
                      </button>
                    );
                  })}

                  {/* Desktop Consultation Button (Inline) */}
                  <div className="hidden md:block">
                    <button
                      onClick={() => handleNavClick("about")}
                      className={`relative px-8 py-3 rounded-full text-center transition-colors duration-500 ${
                        currentView === "about"
                          ? "text-[var(--color-void)] font-bold"
                          : isLightMode
                            ? "text-black font-bold bg-[#00ff66]/40 border border-[#00ff66] hover:bg-[#00ff66]/60 shadow-[0_0_15px_rgba(0,255,102,0.3)]"
                            : "text-[#00ff66] font-bold bg-[#00ff66]/10 hover:bg-[#00ff66]/20 shadow-[0_0_15px_rgba(0,255,102,0.1)]"
                      }`}
                    >
                      {currentView === "about" && (
                        <motion.div
                          layoutId="liquid-nav-blob"
                          className="absolute inset-0 rounded-full -z-10 shadow-lg bg-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.4)]"
                          transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1.2 }}
                        />
                      )}
                      <span className="relative z-10 font-sans text-xs font-semibold tracking-[0.1em] uppercase whitespace-nowrap">{t.nav.about}</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Row (Flexible Width for Mobile) */}
                <div className="md:hidden flex items-center justify-center h-[52px] w-auto relative z-10 pb-2 px-2">
                  <button
                    onClick={() => handleNavClick("about")}
                    className={`relative w-auto px-6 h-[36px] flex items-center justify-center rounded-full text-center transition-colors duration-500 ${
                      currentView === "about"
                        ? "text-[var(--color-void)] font-bold"
                        : isLightMode
                          ? "text-black font-bold bg-[#00ff66]/40 border border-[#00ff66] hover:bg-[#00ff66]/60 shadow-[0_0_15px_rgba(0,255,102,0.3)]"
                          : "text-[#00ff66] font-bold bg-[#00ff66]/10 hover:bg-[#00ff66]/20 shadow-[0_0_15px_rgba(0,255,102,0.1)]"
                    }`}
                  >
                    {currentView === "about" && (
                      <motion.div
                        layoutId="liquid-nav-blob"
                        className="absolute inset-0 rounded-full -z-10 shadow-lg bg-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.4)]"
                        transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1.2 }}
                      />
                    )}
                    <span className="relative z-10 font-sans text-[10px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap">{t.nav.about}</span>
                  </button>
                </div>
              </div>
              );
            })()}
            </motion.nav>
          );
        })()}

      </div>

    </main>
  );
}
