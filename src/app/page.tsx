"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUp, Globe, Sparkles, Bot, Zap, ShieldCheck, Search } from "lucide-react";
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
    nav: { portfolio: "Case Studies", services: "Capabilities", whyus: "Why Us", about: "Get In Touch", partners: "Partner Portal" },
    hub: {
      general: {
        pills: ["Digital Behavior Engineers", "Built-In AI SEO & GEO", "High-Converting Webapps"],
        headline: "Most websites look good. Ours actually make customers buy.",
        subhead: "You don't have a traffic problem—you have a hesitation problem. When someone visits your site, their brain decides in 3 seconds whether to trust you or close the tab. We build custom software and web applications engineered to eliminate hesitation and make choosing you the easiest decision.",
        stats: [
          { num: "3", title: "Seconds to Trust", desc: "A customer decides in 3 seconds whether your site feels legitimate or amateur. We eliminate the red flags that cause immediate bounce." },
          { num: "3x", title: "Decision Speed", desc: "Clear, frictionless pathways remove hesitation—guiding interested visitors toward checkout and inquiries up to 3x faster." },
          { num: "100", title: "Total Ownership", desc: "No monthly template fees or platform locks. You own 100% of your code, your customer list, and your digital assets." }
        ],
        cta1: "Request Behavioral Audit",
        cta2: "View Case Studies"
      },
      industrial: {
        pills: ["Error Prevention", "Simple Workflows", "Operational Speed"],
        headline: "Eliminate operational mistakes before they happen.",
        subhead: "When internal software is clunky and confusing, your team makes expensive errors. We build custom operational dashboards and tracking tools so simple and fast that your workforce gets it right the first time, every time.",
        stats: [
          { num: "50", title: "Uptime Protected", desc: "Predictive alerts and real-time tracking catch equipment and workflow issues before they cause costly downtime." },
          { num: "0", title: "Workflow Friction", desc: "Tools designed around real human habits on the floor prevent confusion, double-entry, and communication breakdowns." },
          { num: "25", title: "Budget Recaptured", desc: "Eliminate wasted labor hours and redundant tools with a single unified operational command center." }
        ],
        cta1: "Optimize Operations",
        cta2: "View Industrial Platform"
      },
      restaurants: {
        pills: ["Direct Ordering Apps", "Customer Habit Loops", "0% Commissions"],
        headline: "Reprogram ordering habits away from third-party apps.",
        subhead: "DoorDash takes 30% of your revenue because their app makes ordering effortless. We build your own custom ordering webapp engineered with the exact same habit loops, so customers order direct from you every single time.",
        stats: [
          { num: "30", title: "Margins Kept", desc: "Stop giving 30% away on every ticket. Your own custom ordering platform puts that entire cut directly back in your register." },
          { num: "100", title: "Customer Ownership", desc: "Own your customer contacts and order history. Send direct incentives whenever you want without paying a middleman." },
          { num: "0", title: "Commission Cuts", desc: "Bespoke ordering and kitchen-display integration that you own outright—with zero per-order fees." }
        ],
        cta1: "Reclaim Your Margins",
        cta2: "View Restaurant Platform"
      },
      realestate: {
        pills: ["Subconscious Authority", "High-Net-Worth Portals", "Direct Lead Capture"],
        headline: "Command instant authority with high-net-worth clients.",
        subhead: "High-value buyers and sellers won't trust an agent using a generic website from 2018. We build bespoke client webapps engineered with luxury status cues, instant booking, and private client portals that make you the only clear choice.",
        stats: [
          { num: "100", title: "Direct Commission", desc: "Capture and manage high-value clients directly on your own portal instead of splitting leads through third-party platforms." },
          { num: "3", title: "Seconds to Impress", desc: "Establish undeniable market authority the second a client opens your link. Luxury presentation commands luxury trust." },
          { num: "0", title: "Lost Inquiries", desc: "Frictionless booking and automated instant-response tools ensure warm buyers never slip away to another broker." }
        ],
        cta1: "Upgrade Your Presence",
        cta2: "View Agent Stack"
      },
      seoShowcase: {
        badge: "INCLUDED WITH OUR SITES • BUILT-IN ARCHITECTURE",
        title: "The Best Technical SEO & Modern AI SEO.",
        titleHighlight: "Built In Standard.",
        desc: "We engineer every website and web application with elite Technical SEO and Generative Engine Optimization (GEO) built directly into the foundation. When potential clients search on Google or ask questions on ChatGPT, Perplexity, and Gemini, your platform is structured to rank at the top and be cited as the definitive authority.",
        cards: [
          {
            tag: "AI SEARCH READY",
            title: "Generative Engine Optimization (GEO)",
            desc: "Structured semantic JSON-LD knowledge graphs engineered specifically so ChatGPT, Perplexity, and Google AI Overviews cite and recommend your brand when customers query AI.",
            metric: "ChatGPT • Perplexity • Gemini"
          },
          {
            tag: "GOOGLE DOMINANCE",
            title: "100/100 Core Web Vitals",
            desc: "Sub-second server rendering, zero layout shifts, and clean semantic architecture that search algorithms reward with top organic domain authority.",
            metric: "< 0.4s Instant Index"
          },
          {
            tag: "CORE ARCHITECTURE",
            title: "Native Codebase Integration",
            desc: "No fragile plugins or third-party wrappers. Elite search optimization is hardcoded directly into your software architecture and schema from day one.",
            metric: "Direct Code Ownership"
          }
        ]
      },
      subtleSocial: "Join forward-thinking business owners upgrading their digital presence."
    },
    dock: { hub: "Hub" }
  },
  es: {
    nav: { portfolio: "Casos de Estudio", services: "Capacidades", whyus: "Por Qué Nosotros", about: "Contacto", partners: "Portal de Socios" },
    hub: {
      general: {
        pills: ["Ingenieros de Comportamiento Digital", "SEO & AI SEO Incluido", "Webapps de Alta Conversión"],
        headline: "La mayoría de sitios se ven bien. Los nuestros hacen que los clientes compren.",
        subhead: "No tienes un problema de tráfico: tienes un problema de vacilación. Cuando alguien entra a tu web, su cerebro decide en 3 segundos si confiar o cerrar la pestaña. Diseñamos software y aplicaciones web para eliminar la duda y hacer que elegirte sea la decisión más fácil.",
        stats: [
          { num: "3", title: "Segundos para Confiar", desc: "Un cliente decide en 3 segundos si tu web inspira autoridad. Eliminamos las señales de alerta que provocan abandonos inmediatos." },
          { num: "3x", title: "Velocidad de Decisión", desc: "Rutas limpias y sin fricción eliminan la indecisión, guiando a los visitantes hacia la compra hasta 3 veces más rápido." },
          { num: "100", title: "Propiedad Total", desc: "Sin cuotas de plantillas ni bloqueos de plataformas. Eres dueño del 100% de tu código, datos y clientes." }
        ],
        cta1: "Solicitar Auditoría",
        cta2: "Ver Casos de Estudio"
      },
      industrial: {
        pills: ["Prevención de Errores", "Flujos Simples", "Velocidad Operativa"],
        headline: "Elimina los errores operativos antes de que ocurran.",
        subhead: "Cuando el software interno es confuso, tu equipo comete errores costosos. Construimos paneles y herramientas operativas tan simples y rápidas que tu personal acierta a la primera, siempre.",
        stats: [
          { num: "50", title: "Tiempo Protegido", desc: "Alertas predictivas y seguimiento en tiempo real detienen fallos en equipos antes de que paralicen la producción." },
          { num: "0", title: "Fricción de Flujo", desc: "Herramientas diseñadas en base a hábitos reales en planta evitan confusiones y pérdidas de tiempo." },
          { num: "25", title: "Presupuesto Recuperado", desc: "Recupera horas perdidas y elimina herramientas innecesarias con un único centro de mando operativo." }
        ],
        cta1: "Optimizar Operaciones",
        cta2: "Ver Plataforma Industrial"
      },
      restaurants: {
        pills: ["Apps de Pedido Directo", "Hábitos de Clientes", "0% Comisiones"],
        headline: "Reprograma los hábitos de pedido lejos de apps de terceros.",
        subhead: "DoorDash se queda con el 30% porque su app hace que pedir sea facilísimo. Construimos tu propia webapp de pedidos con esos mismos bucles de hábito para que te pidan directamente a ti, siempre.",
        stats: [
          { num: "30", title: "Márgenes Conservados", desc: "Deja de regalar el 30% en cada orden. Tu propia plataforma pone ese margen directamente en tu caja registradora." },
          { num: "100", title: "Control de Clientes", desc: "Sé dueño de tus contactos e historial de pedidos. Lanza promociones directas sin pagar peajes a intermediarios." },
          { num: "0", title: "Comisiones por Orden", desc: "Pedidos e integración con cocina a medida que te pertenecen por completo, sin recargos por venta." }
        ],
        cta1: "Recupera tus Márgenes",
        cta2: "Ver Plataforma de Restaurantes"
      },
      realestate: {
        pills: ["Autoridad Inmediata", "Portales VIP", "Captación Directa"],
        headline: "Impón autoridad instantánea ante clientes de alto poder adquisitivo.",
        subhead: "Los compradores y vendedores exigentes no confían en agentes con webs genéricas de 2018. Diseñamos webapps exclusivas con señales de estatus, reservas privadas y portales VIP que te convierten en la opción evidente.",
        stats: [
          { num: "100", title: "Comisión Directa", desc: "Capta y gestiona clientes de alto valor directamente en tu propio portal sin repartir leads con plataformas externas." },
          { num: "3", title: "Segundos para Impresionar", desc: "Establece autoridad indiscutible en cuanto abran tu enlace. La presentación de lujo genera confianza de lujo." },
          { num: "0", title: "Leads Perdidos", desc: "Reservas sin fricción y respuestas inmediatas garantizan que los compradores serios nunca se vayan con la competencia." }
        ],
        cta1: "Eleva tu Presencia",
        cta2: "Ver Stack Inmobiliario"
      },
      seoShowcase: {
        badge: "INTEGRADO EN NUESTROS SITIOS • ARQUITECTURA NATIVA",
        title: "El Mejor SEO Técnico y SEO para IA.",
        titleHighlight: "Integrado de Serie.",
        desc: "Diseñamos cada sitio web y aplicación con el mejor SEO técnico y optimización para motores generativos (GEO) integrados en su base. Cuando tus clientes buscan en Google o consultan en ChatGPT, Perplexity y Gemini, tu plataforma está estructurada para liderar y ser recomendada como la máxima autoridad.",
        cards: [
          {
            tag: "LISTO PARA IA",
            title: "Optimización para Motores de IA (GEO)",
            desc: "Grafos de conocimiento semánticos JSON-LD diseñados para que ChatGPT, Perplexity y las respuestas de Google recomienden tu negocio al responder.",
            metric: "ChatGPT • Perplexity • Gemini"
          },
          {
            tag: "DOMINIO EN GOOGLE",
            title: "100/100 Core Web Vitals",
            desc: "Carga en submilisegundos, cero saltos visuales y arquitectura semántica limpia que los algoritmos premian con máxima autoridad orgánica.",
            metric: "< 0.4s Carga Instantánea"
          },
          {
            tag: "ARQUITECTURA CENTRAL",
            title: "Integración Nativa en el Código",
            desc: "Sin plugins frágiles ni herramientas externas. La optimización técnica de búsqueda se programa directamente en la estructura de tu software desde el primer día.",
            metric: "Propiedad Total del Código"
          }
        ]
      },
      subtleSocial: "Únete a los empresarios que están modernizando su presencia digital."
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
            className="fixed inset-0 z-[1000] bg-[#051f0e] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
          >
            <button 
              onClick={() => {
                sessionStorage.setItem("zayron_access", "granted");
                setHasInitiated(true);
              }}
              className="absolute top-8 right-8 md:top-12 md:right-12 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
            {/* Ambient green glow to match the background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00ff66]/[0.15] via-transparent to-transparent pointer-events-none" />
            
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
                <div className="text-center space-y-4 mb-4">
                  <h1 className="text-white text-3xl md:text-4xl font-light tracking-[0.1em] leading-tight">
                    Welcome to<br/><span className="text-[#00ff66] font-bold">ZayronSystems.</span>
                  </h1>
                  <p className="text-white/60 text-sm md:text-base font-light leading-relaxed px-2">
                    {lang === 'en' 
                      ? "Custom websites and software engineered around buyer psychology, with best-in-class SEO and AI search dominance built in standard." 
                      : "Sitios web y software a medida basados en psicología de compra, con el mejor SEO y posicionamiento en IA incluido de serie."}
                  </p>
                </div>

                <input 
                  type="text" 
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && visitorName.trim()) handleInitiate();
                  }}
                  maxLength={20}
                  placeholder="ENTER YOUR NAME"
                  className="w-full bg-transparent border-b border-white/40 text-center text-white text-xl md:text-2xl tracking-[0.3em] uppercase pb-4 outline-none focus:border-[#00ff66] transition-colors placeholder:text-white/40 font-light"
                  autoFocus
                />
                
                <button 
                  onClick={handleInitiate}
                  disabled={!visitorName.trim()}
                  className="group relative w-full py-5 bg-transparent border border-[#00ff66]/30 hover:border-[#00ff66] hover:bg-[#00ff66]/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-[#00ff66]/30 transition-all duration-700 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,102,0)] hover:shadow-[0_0_60px_rgba(0,255,102,0.15)]"
                >
                  <span className="relative z-10 text-white/80 group-hover:text-white disabled:group-hover:text-white/80 text-xs md:text-sm font-bold tracking-[0.5em] uppercase transition-colors duration-700">
                    Enter Hub
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
                We engineer custom software and web applications tailored to how customers make buying decisions in your market. Select your sector:
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

                      <p className="text-white/40 text-[11px] md:text-xs font-light tracking-wide text-center mt-4 pointer-events-none">
                        {t.hub.subtleSocial}
                      </p>

                      {/* Built-In SEO & AI SEO Dominance Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-16 md:mt-20 w-full max-w-5xl mx-auto rounded-[2rem] md:rounded-[2.5rem] border border-[#00ff66]/30 bg-gradient-to-b from-[#00ff66]/[0.08] via-white/[0.02] to-transparent p-6 md:p-12 backdrop-blur-xl relative overflow-hidden shadow-[0_0_80px_rgba(0,255,102,0.08)] pointer-events-auto"
                      >
                        {/* Ambient top right glow */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ff66]/10 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center text-center mb-10 md:mb-12">
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ff66]/30 bg-[#00ff66]/10 text-[#00ff66] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-[0_0_20px_rgba(0,255,102,0.15)]">
                            <Sparkles className="w-3.5 h-3.5" />
                            {t.hub.seoShowcase.badge}
                          </div>

                          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mb-4 max-w-3xl leading-tight">
                            {t.hub.seoShowcase.title} <br className="hidden md:block" />
                            <span className="text-[#00ff66] font-light italic">{t.hub.seoShowcase.titleHighlight}</span>
                          </h2>

                          <p className="text-white/60 text-xs md:text-base font-light max-w-2xl leading-relaxed">
                            {t.hub.seoShowcase.desc}
                          </p>
                        </div>

                        {/* 3 Pillar Cards */}
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                          {t.hub.seoShowcase.cards.map((card, idx) => {
                            const icons = [Bot, Zap, ShieldCheck];
                            const IconComponent = icons[idx];
                            return (
                              <div
                                key={idx}
                                className="bg-black/60 border border-white/10 hover:border-[#00ff66]/40 rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,255,102,0.1)] group"
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-mono tracking-widest text-[#00ff66] uppercase">
                                      {card.tag}
                                    </span>
                                    <div className="w-8 h-8 rounded-lg bg-[#00ff66]/10 flex items-center justify-center text-[#00ff66] group-hover:bg-[#00ff66] group-hover:text-black transition-colors duration-300">
                                      <IconComponent className="w-4 h-4" />
                                    </div>
                                  </div>
                                  <h4 className="text-white font-bold text-base md:text-lg mb-2 tracking-tight group-hover:text-[#00ff66] transition-colors">
                                    {card.title}
                                  </h4>
                                  <p className="text-white/50 text-xs leading-relaxed font-light">
                                    {card.desc}
                                  </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                                  <span>Metric</span>
                                  <span className="text-white font-semibold">{card.metric}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>

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

                <footer className="w-full mt-24 mb-32 md:mb-12 flex flex-col items-center justify-center z-20 pointer-events-auto border-t border-white/10 pt-8 gap-4 px-8">
                  <div className="flex items-center gap-6">
                    <a href="/privacy" className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Privacy Policy</a>
                    <a href="/terms" className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Terms & Conditions</a>
                  </div>
                  <p className="text-white/20 text-[10px] tracking-widest uppercase text-center">&copy; {new Date().getFullYear()} ZayronSystems. All rights reserved.</p>
                </footer>
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
