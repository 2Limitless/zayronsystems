"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUp, Globe } from "lucide-react";
import PortfolioExperience from "../components/PortfolioExperience";
import ServicesExperience from "../components/ServicesExperience";
import AboutExperience from "../components/AboutExperience";
import WhyUsExperience from "../components/WhyUsExperience";

export type ViewState = "hub" | "portfolio" | "services" | "whyus" | "about";
export type Language = "en" | "es";
export type Industry = "general" | "industrial" | "restaurants" | "auto";

const industriesList = [
  { id: "general", label: { en: "General", es: "General" } },
  { id: "industrial", label: { en: "Industrial Operations", es: "Operaciones Industriales" } },
  { id: "restaurants", label: { en: "Restaurants & Food", es: "Restaurantes y Comida" } },
  { id: "auto", label: { en: "Auto Dealerships", es: "Concesionarios" } }
] as const;

const dict = {
  en: {
    nav: { portfolio: "Case Studies", services: "Enterprise Stack", whyus: "Why Us", about: "Consultation" },
    shortNav: { portfolio: "Cases", services: "Stack", whyus: "Why Us", about: "Consult" },
    hub: {
      general: {
        pills: ["Legacy Modernization", "Custom CRM/ERP", "AI Integration"],
        headline: "Digital Transformation at Scale.",
        subhead: "Off-the-shelf software restricts growth. We build custom enterprise applications designed specifically to automate workflows, eliminate silos, and scale your operations.",
        stats: [
          { num: "20", title: "Profit Increase", desc: "Successful digital transformations can increase overall profit margins by 20% to 30%. — McKinsey & Company" },
          { num: "250", title: "Average ROI", desc: "Custom enterprise software integrations yield an average Return on Investment of 250% over a 3-year period. — Nucleus Research" },
          { num: "50", title: "Higher Adoption", desc: "Applications built with custom, user-centric UX design see 50% higher employee adoption rates. — Forrester" }
        ],
        cta1: "Schedule Architecture Review",
        cta2: "View Enterprise Capabilities"
      },
      industrial: {
        pills: ["IoT Integration", "Predictive Maintenance", "Asset Tracking"],
        headline: "Industrial Operations, Optimized.",
        subhead: "Dominate the field. We build robust, custom software for manufacturing, demolition, and heavy operations that mitigates downtime and maximizes operational margins.",
        stats: [
          { num: "50", title: "Less Downtime", desc: "Predictive maintenance algorithms and IoT telemetry can reduce unexpected machine downtime by up to 50%. — McKinsey & Company" },
          { num: "40", title: "Longer Lifespan", desc: "Continuous digital monitoring and predictive care extends the useful life of heavy equipment by up to 40%. — McKinsey & Company" },
          { num: "25", title: "Cost Reduction", desc: "Digitizing inventory and predictive maintenance schedules yields a 25% reduction in overall maintenance costs. — McKinsey & Company" }
        ],
        cta1: "Schedule Architecture Review",
        cta2: "View Industrial Capabilities"
      },
      restaurants: {
        pills: ["Custom POS", "Loyalty Apps", "Kitchen Management"],
        headline: "Restaurants, Scaled.",
        subhead: "Take back your margins. We build custom ordering systems, loyalty applications, and kitchen display software that puts you back in control of your profits and customer data.",
        stats: [
          { num: "30", title: "Margin Saved", desc: "Custom ordering applications bypass third-party delivery networks, saving restaurants up to 30% in commission fees per order." },
          { num: "26", title: "Higher Tickets", desc: "Customers spend up to 26% more on average when ordering through a digital platform rather than in-person. — Deloitte" },
          { num: "14", title: "Premium Value", desc: "Consumers are willing to pay an average of 14% more at restaurants that offer seamless digital ordering options. — Deloitte" }
        ],
        cta1: "Schedule Architecture Review",
        cta2: "View Restaurant Capabilities"
      },
      auto: {
        pills: ["Digital Showrooms", "Inventory Sync", "Custom CRM"],
        headline: "Dealerships, Digitalized.",
        subhead: "Accelerate your sales pipeline. We build custom digital showroom apps, inventory management systems, and tailored CRM integrations that close deals faster.",
        stats: [
          { num: "90", title: "Omnichannel Demand", desc: "90% of modern car buyers prefer dealerships that offer a seamless bridge between digital apps and the physical showroom. — Cox Automotive" },
          { num: "45", title: "Min Saved/Deal", desc: "Integrated digital document signing and real-time financing calculators reduce time-to-close paperwork by 45 minutes per deal. — Cox Automotive" },
          { num: "25", title: "More Conversions", desc: "Dealerships utilizing custom digital retailing tools see a 25% increase in lead-to-sale conversion rates. — NADA" }
        ],
        cta1: "Schedule Architecture Review",
        cta2: "View Auto Capabilities"
      }
    },
    dock: { hub: "Hub" }
  },
  es: {
    nav: { portfolio: "Casos de Estudio", services: "Stack Empresarial", whyus: "Por Qué Elegirnos", about: "Consulta" },
    shortNav: { portfolio: "Casos", services: "Stack", whyus: "Nosotros", about: "Consulta" },
    hub: {
      general: {
        pills: ["Modernización Legacy", "CRM/ERP Personalizado", "Integración de IA"],
        headline: "Transformación Digital a Escala.",
        subhead: "El software genérico restringe el crecimiento. Construimos aplicaciones empresariales personalizadas diseñadas específicamente para automatizar flujos de trabajo, eliminar silos y escalar sus operaciones.",
        stats: [
          { num: "20", title: "Aumento de Beneficios", desc: "Las transformaciones digitales exitosas pueden aumentar los márgenes de beneficio generales entre un 20% y un 30%. — McKinsey & Company" },
          { num: "250", title: "ROI Promedio", desc: "Las integraciones de software empresarial a medida generan un ROI promedio del 250% en un período de 3 años. — Nucleus Research" },
          { num: "50", title: "Mayor Adopción", desc: "Las aplicaciones creadas con diseño UX personalizado logran tasas de adopción de empleados un 50% más altas. — Forrester" }
        ],
        cta1: "Programar Revisión",
        cta2: "Ver Capacidades Empresariales"
      },
      industrial: {
        pills: ["Integración IoT", "Mantenimiento Predictivo", "Rastreo de Activos"],
        headline: "Operaciones Industriales, Optimizadas.",
        subhead: "Domine el campo. Construimos software robusto y personalizado para manufactura, demolición y operaciones pesadas que mitiga el tiempo de inactividad y maximiza los márgenes operativos.",
        stats: [
          { num: "50", title: "Menos Inactividad", desc: "El mantenimiento predictivo y la telemetría IoT pueden reducir el tiempo de inactividad inesperado hasta en un 50%. — McKinsey & Company" },
          { num: "40", title: "Mayor Vida Útil", desc: "El monitoreo digital continuo y el cuidado predictivo extienden la vida útil del equipo pesado hasta en un 40%. — McKinsey & Company" },
          { num: "25", title: "Reducción de Costos", desc: "La digitalización del inventario y el mantenimiento predictivo produce una reducción del 25% en los costos de mantenimiento. — McKinsey & Company" }
        ],
        cta1: "Programar Revisión",
        cta2: "Ver Capacidades Industriales"
      },
      restaurants: {
        pills: ["POS Personalizado", "Apps de Lealtad", "Gestión de Cocina"],
        headline: "Restaurantes, Escalados.",
        subhead: "Recupere sus márgenes. Construimos sistemas de pedidos personalizados, aplicaciones de lealtad y software de visualización de cocina que le devuelven el control de sus ganancias y datos de clientes.",
        stats: [
          { num: "30", title: "Margen Ahorrado", desc: "Las aplicaciones de pedidos a medida evitan las redes de entrega de terceros, ahorrando hasta un 30% en comisiones por pedido." },
          { num: "26", title: "Tickets Más Altos", desc: "Los clientes gastan hasta un 26% más en promedio cuando realizan pedidos a través de una plataforma digital. — Deloitte" },
          { num: "14", title: "Valor Premium", desc: "Los consumidores están dispuestos a pagar un promedio de 14% más en restaurantes que ofrecen pedidos digitales fluidos. — Deloitte" }
        ],
        cta1: "Programar Revisión",
        cta2: "Ver Capacidades de Restaurantes"
      },
      auto: {
        pills: ["Showrooms Digitales", "Sincronización de Inventario", "CRM Personalizado"],
        headline: "Concesionarios, Digitalizados.",
        subhead: "Acelere su embudo de ventas. Construimos aplicaciones de sala de exposición digital personalizadas, sistemas de gestión de inventario e integraciones de CRM que cierran tratos más rápido.",
        stats: [
          { num: "90", title: "Demanda Omnicanal", desc: "El 90% de los compradores prefieren concesionarios que ofrecen un puente perfecto entre las aplicaciones digitales y la sala física. — Cox Automotive" },
          { num: "45", title: "Minutos Ahorrados", desc: "La firma digital integrada y las calculadoras de financiamiento reducen el papeleo de cierre en 45 minutos por trato. — Cox Automotive" },
          { num: "25", title: "Más Conversiones", desc: "Los concesionarios que utilizan herramientas de venta minorista digital ven un aumento del 25% en la conversión de clientes. — NADA" }
        ],
        cta1: "Programar Revisión",
        cta2: "Ver Capacidades Automotrices"
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
  
  const t = dict[lang];
  const hubData = t.hub[selectedIndustry];

  const handleNavClick = (view: ViewState) => setCurrentView(view);

  return (
    <main className={`relative w-full h-[100dvh] overflow-x-hidden bg-black flex flex-col ${currentView === 'hub' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
      
      {/* Initial Industry Selection Modal */}
      <AnimatePresence>
        {showIndustryPopup && (
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
                Welcome to ZayronSystems
              </h2>
              <p className="text-white/60 text-sm md:text-base mb-10 max-w-md mx-auto">
                To provide the most relevant experience and insights, please select your primary industry focus:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {industriesList.filter(ind => ind.id !== "general").map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => {
                      setSelectedIndustry(ind.id);
                      setShowIndustryPopup(false);
                    }}
                    className="group relative overflow-hidden rounded-2xl border border-white/20 bg-black/50 p-6 hover:border-[#00ff66]/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,255,102,0.1)]"
                  >
                     <div className="absolute inset-0 bg-gradient-to-br from-[#00ff66]/0 via-[#00ff66]/0 to-[#00ff66]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <span className="relative z-10 text-white font-bold text-sm tracking-widest uppercase block mb-1">
                       {ind.label[lang].split(" ")[0]}
                     </span>
                     <span className="relative z-10 text-white/50 text-[10px] tracking-widest uppercase block">
                       {ind.label[lang].split(" ").slice(1).join(" ")}
                     </span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setShowIndustryPopup(false)}
                className="mt-10 text-white/30 hover:text-white/80 text-xs tracking-widest uppercase underline underline-offset-4 transition-colors"
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

                      <h1 className="font-sans text-[12vw] md:text-[90px] lg:text-[110px] leading-[0.9] text-center font-bold tracking-tighter bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent pb-4">
                        {hubData.headline}
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
                    </motion.div>
                  </AnimatePresence>
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
                <PortfolioExperience lang={lang} industry={selectedIndustry} onBack={() => setCurrentView("hub")} />
              </OverlayWrapper>
            )}
            
            {currentView === "services" && (
              <OverlayWrapper key="services" onClose={() => setCurrentView("hub")}>
                <ServicesExperience lang={lang} onBack={() => setCurrentView("hub")} onThemeChange={setServicesTheme} />
              </OverlayWrapper>
            )}

            {currentView === "whyus" && (
              <OverlayWrapper key="whyus" onClose={() => setCurrentView("hub")}>
                <WhyUsExperience lang={lang} onBack={() => setCurrentView("hub")} />
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
              <div className="flex items-center gap-0.5 md:gap-2 pointer-events-auto">
                {[
                  { id: "hub", label: t.dock.hub, shortLabel: t.dock.hub },
                  { id: "portfolio", label: t.nav.portfolio, shortLabel: t.shortNav.portfolio },
                  { id: "services", label: t.nav.services, shortLabel: t.shortNav.services },
                  { id: "whyus", label: t.nav.whyus, shortLabel: t.shortNav.whyus },
                  { id: "about", label: t.nav.about, shortLabel: t.shortNav.about }
                ].map((item) => {
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id as ViewState)}
                      className={`relative px-2.5 md:px-8 py-2.5 md:py-3 rounded-full text-center transition-colors duration-500 ${
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
                      <span className="relative z-10 font-sans text-[10px] md:text-xs font-semibold tracking-[0.1em] uppercase whitespace-nowrap hidden md:inline">{item.label}</span>
                      <span className="relative z-10 font-sans text-[9px] font-bold tracking-wider uppercase whitespace-nowrap md:hidden">{item.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          );
        })()}

      </div>

    </main>
  );
}
