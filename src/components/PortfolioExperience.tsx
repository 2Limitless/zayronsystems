"use client";

import { motion } from "framer-motion";
import { Database, Zap, Gift, MonitorSmartphone, TrendingUp, Bell } from "lucide-react";
import type { Language, Industry } from "../app/page";

const dict = {
  en: {
    back: "Back to Hub",
    industries: {
      general: {
        title: "Enterprise ",
        titleHighlight: "Scale.",
        desc: "Why replacing disjointed legacy systems with custom enterprise software is a competitive necessity.",
        profit: {
          market: "Off-the-shelf Software",
          marketMetric: "SAAS TRAP",
          marketDesc1: "Annual cost of patching together 5 different SaaS tools.",
          marketDesc2: "High friction, data silos, monthly fees.",
          direct: "Custom Architecture",
          directMetric: "FULL CONTROL",
          directDesc1: "A unified system built specifically for your operations.",
          directDesc2: "Total data sovereignty. No per-user licenses."
        },
        cards: [
          { title: "Data Sovereignty", desc: "Own your data architecture. Avoid vendor lock-in and power your operations with centralized intelligence." },
          { title: "Operational Automation", desc: "Reduce manual overhead by automating logistics, scheduling, and asset management in real-time." },
          { title: "AI Integration", desc: "Deploy custom machine learning models trained specifically on your enterprise data." },
          { title: "Legacy System Integration", desc: "Seamlessly connect old databases and hardware to modern cloud infrastructure." },
          { title: "Mission Critical Uptime", desc: "Heavy-duty server architectures designed for the demands of 24/7 environments." },
          { title: "Scalable Infrastructure", desc: "Built to handle massive data loads without breaking a sweat as your enterprise grows." }
        ]
      },
      industrial: {
        title: "Industrial ",
        titleHighlight: "Scale.",
        desc: "Why replacing generic management tools with custom industrial software is a competitive necessity.",
        profit: {
          market: "Generic Management Software",
          marketMetric: "DOWNTIME",
          marketDesc1: "High costs from unexpected downtime and manual tracking.",
          marketDesc2: "Delayed reporting, disjointed field ops.",
          direct: "Custom Industrial Stack",
          directMetric: "REAL-TIME",
          directDesc1: "A unified system built for heavy operations and IoT.",
          directDesc2: "Predictive insights. Zero per-user licenses."
        },
        cards: [
          { title: "Predictive Maintenance", desc: "Use IoT telemetry to predict equipment failures before they cause expensive downtime." },
          { title: "Asset Tracking", desc: "Real-time visibility into heavy machinery, fleets, and dispersed enterprise resources." },
          { title: "Field Force Sync", desc: "Keep field workers and centralized command on the exact same page in real-time." },
          { title: "Legacy Hardware Sync", desc: "Seamlessly connect old industrial hardware sensors to modern cloud infrastructure." },
          { title: "Mission Critical Uptime", desc: "Heavy-duty architectures designed for the harsh demands of industrial 24/7 environments." },
          { title: "Scalable Infrastructure", desc: "Built to handle massive telemetry data loads without breaking a sweat as operations grow." }
        ]
      },
      restaurants: {
        title: "Restaurant ",
        titleHighlight: "Scale.",
        desc: "Why ditching 3rd-party aggregators for custom ordering infrastructure is a competitive necessity.",
        profit: {
          market: "Third-party Delivery Apps",
          marketMetric: "30% FEES",
          marketDesc1: "Losing up to 30% of every order to commission fees.",
          marketDesc2: "No customer data ownership, zero brand loyalty.",
          direct: "Owned Ordering Platform",
          directMetric: "0% FEES",
          directDesc1: "Your own bespoke app and web ordering system.",
          directDesc2: "100% Commission free. Total data sovereignty."
        },
        cards: [
          { title: "Zero Commission Ordering", desc: "Keep 100% of your margins. Stop paying exorbitant fees to third-party aggregators." },
          { title: "Customer Data Sovereignty", desc: "Own your customer list. Leverage order history to run targeted marketing campaigns." },
          { title: "Custom Loyalty Programs", desc: "Incentivize repeat visits with a bespoke points system tailored entirely to your brand." },
          { title: "Kitchen Display Integration", desc: "Seamlessly route digital orders directly to your custom kitchen display systems." },
          { title: "Automated Upselling", desc: "Use strategic algorithms to prompt add-ons, increasing average ticket sizes automatically." },
          { title: "Omni-Channel Sync", desc: "Sync inventory and menus across all physical and digital locations instantly." }
        ]
      },
      auto: {
        title: "Dealership ",
        titleHighlight: "Scale.",
        desc: "Why replacing fragmented CRMs with a unified digital showroom is a competitive necessity.",
        profit: {
          market: "Fragmented Dealer Systems",
          marketMetric: "LOST LEADS",
          marketDesc1: "Lost leads due to slow response times and data silos.",
          marketDesc2: "Hours wasted on manual paperwork and disjointed CRMs.",
          direct: "Unified Digital Dealership",
          directMetric: "FASTER DEALS",
          directDesc1: "A seamless omnichannel flow from app to showroom.",
          directDesc2: "Faster closing times. Total inventory sync."
        },
        cards: [
          { title: "Digital Showrooms", desc: "Allow customers to explore inventory, customize builds, and start deals entirely online." },
          { title: "Real-time Inventory Sync", desc: "Ensure your digital app and physical lot reflect the exact same inventory instantly." },
          { title: "Automated Financing", desc: "Integrate rapid financing calculators to pre-qualify leads before they enter the door." },
          { title: "Seamless CRM Integration", desc: "Never lose a lead. Track customer interactions from the first click to the final signature." },
          { title: "Accelerated Deal Closing", desc: "Digitize the paperwork process, slashing the time it takes to finalize a vehicle sale." },
          { title: "Omnichannel Journeys", desc: "Provide a frictionless transition for buyers moving between your website and your showroom." }
        ]
      }
    }
  },
  es: {
    back: "Volver al Inicio",
    industries: {
      general: {
        title: "Escala ",
        titleHighlight: "Empresarial.",
        desc: "Por qué reemplazar los sistemas heredados con software empresarial personalizado es una necesidad competitiva.",
        profit: {
          market: "Software Comercial",
          marketMetric: "TRAMPA SAAS",
          marketDesc1: "Costo anual de usar 5 herramientas SaaS diferentes.",
          marketDesc2: "Alta fricción, silos de datos, tarifas mensuales.",
          direct: "Arquitectura Personalizada",
          directMetric: "CONTROL TOTAL",
          directDesc1: "Un sistema unificado creado específicamente para tus operaciones.",
          directDesc2: "Soberanía total de datos. Sin licencias por usuario."
        },
        cards: [
          { title: "Soberanía de Datos", desc: "Sé dueño de tu arquitectura de datos. Evita ataduras a proveedores y potencia tus operaciones." },
          { title: "Automatización Operativa", desc: "Reduce costos manuales automatizando logística, programación y gestión de activos en tiempo real." },
          { title: "Integración de IA", desc: "Implementa modelos de aprendizaje automático personalizados entrenados con tus datos empresariales." },
          { title: "Integración de Sistemas Heredados", desc: "Conecta sin problemas bases de datos y hardware antiguos a una infraestructura en la nube." },
          { title: "Confiabilidad Crítica", desc: "Arquitecturas de servidores diseñadas para las demandas de entornos 24/7." },
          { title: "Infraestructura Escalable", desc: "Creada para manejar cargas de datos masivas sin problemas a medida que tu empresa crece." }
        ]
      },
      industrial: {
        title: "Escala ",
        titleHighlight: "Industrial.",
        desc: "Por qué reemplazar herramientas genéricas con software industrial personalizado es una necesidad competitiva.",
        profit: {
          market: "Software de Gestión Genérico",
          marketMetric: "INACTIVIDAD",
          marketDesc1: "Altos costos por inactividad inesperada y seguimiento manual.",
          marketDesc2: "Informes retrasados, operaciones de campo inconexas.",
          direct: "Stack Industrial Personalizado",
          directMetric: "TIEMPO REAL",
          directDesc1: "Un sistema unificado creado para operaciones pesadas e IoT.",
          directDesc2: "Información predictiva. Cero licencias por usuario."
        },
        cards: [
          { title: "Mantenimiento Predictivo", desc: "Usa telemetría IoT para predecir fallas en equipos antes de que causen costosos tiempos de inactividad." },
          { title: "Seguimiento de Activos", desc: "Visibilidad en tiempo real de maquinaria pesada, flotas y recursos empresariales dispersos." },
          { title: "Sincronización de Campo", desc: "Mantén a los trabajadores de campo y al comando central en la misma página en tiempo real." },
          { title: "Integración de Hardware", desc: "Conecta sin problemas sensores industriales antiguos a la infraestructura en la nube moderna." },
          { title: "Confiabilidad Crítica", desc: "Arquitecturas diseñadas para las duras demandas de entornos industriales 24/7." },
          { title: "Infraestructura Escalable", desc: "Creada para manejar cargas masivas de datos de telemetría a medida que crecen las operaciones." }
        ]
      },
      restaurants: {
        title: "Escala de ",
        titleHighlight: "Restaurantes.",
        desc: "Por qué abandonar los agregadores de terceros por una infraestructura de pedidos personalizada es una necesidad.",
        profit: {
          market: "Apps de Entrega de Terceros",
          marketMetric: "30% TARIFAS",
          marketDesc1: "Perdiendo hasta el 30% de cada pedido en comisiones.",
          marketDesc2: "Sin propiedad de datos del cliente, cero lealtad de marca.",
          direct: "Plataforma de Pedidos Propia",
          directMetric: "0% TARIFAS",
          directDesc1: "Tu propia app a medida y sistema de pedidos web.",
          directDesc2: "100% Libre de comisiones. Soberanía total de datos."
        },
        cards: [
          { title: "Pedidos Sin Comisión", desc: "Mantén el 100% de tus márgenes. Deja de pagar tarifas exorbitantes a agregadores externos." },
          { title: "Soberanía de Datos del Cliente", desc: "Sé dueño de tu lista de clientes. Usa el historial para campañas de marketing dirigidas." },
          { title: "Programas de Lealtad a Medida", desc: "Incentiva las visitas repetidas con un sistema de puntos diseñado completamente para tu marca." },
          { title: "Integración de Cocina", desc: "Enruta pedidos digitales directamente a tus sistemas de visualización de cocina personalizados." },
          { title: "Venta Sugestiva Automatizada", desc: "Usa algoritmos estratégicos para sugerir adiciones, aumentando el ticket promedio automáticamente." },
          { title: "Sincronización Omnicanal", desc: "Sincroniza el inventario y los menús en todas las ubicaciones físicas y digitales al instante." }
        ]
      },
      auto: {
        title: "Escala de ",
        titleHighlight: "Concesionarios.",
        desc: "Por qué reemplazar los CRM fragmentados con una sala de exposición digital unificada es una necesidad.",
        profit: {
          market: "Sistemas de Concesionario Fragmentados",
          marketMetric: "VENTAS PERDIDAS",
          marketDesc1: "Clientes perdidos por tiempos de respuesta lentos.",
          marketDesc2: "Horas perdidas en papeleo manual y CRM inconexos.",
          direct: "Concesionario Digital Unificado",
          directMetric: "MÁS RÁPIDO",
          directDesc1: "Un flujo omnicanal perfecto de la app a la sala de exposición.",
          directDesc2: "Cierres más rápidos. Sincronización total de inventario."
        },
        cards: [
          { title: "Showrooms Digitales", desc: "Permite a los clientes explorar inventario, personalizar y comenzar tratos completamente en línea." },
          { title: "Sincronización de Inventario", desc: "Asegura que tu app digital y el lote físico reflejen exactamente el mismo inventario al instante." },
          { title: "Financiamiento Automatizado", desc: "Integra calculadoras rápidas para precalificar clientes antes de que crucen la puerta." },
          { title: "Integración de CRM Perfecta", desc: "Nunca pierdas un cliente. Rastrea interacciones desde el primer clic hasta la firma final." },
          { title: "Cierre de Tratos Acelerado", desc: "Digitaliza el proceso de papeleo, reduciendo drásticamente el tiempo para finalizar una venta." },
          { title: "Viajes Omnicanal", desc: "Proporciona una transición sin fricciones para los compradores entre tu web y tu sala de exposición." }
        ]
      }
    }
  }
};

export default function PortfolioExperience({ lang, industry, onBack }: { lang: Language, industry: Industry, onBack: () => void }) {
  const t = dict[lang];
  const content = t.industries[industry];

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
              {content.title} <span className="italic text-[var(--color-acid)]">{content.titleHighlight}</span>
            </h2>
          </div>
          <p className="hidden md:block text-[var(--color-ice)]/50 font-sans text-sm max-w-sm text-right leading-relaxed">
            {content.desc}
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 mb-8 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col gap-2 md:gap-4 p-4 md:p-8 rounded-2xl md:rounded-[1.5rem] border border-red-500/20 bg-red-950/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-red-500 font-bold">{content.profit.market}</h3>
            <div><span className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tighter whitespace-nowrap">{content.profit.marketMetric}</span></div>
            <p className="text-white/70 text-xs md:text-base font-medium leading-tight">{content.profit.marketDesc1}</p>
            <div className="w-full h-[1px] bg-red-500/20 my-2 md:my-4" />
            <p className="text-red-400 text-xs md:text-sm font-semibold leading-tight">{content.profit.marketDesc2}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-2 md:gap-4 p-4 md:p-8 rounded-2xl md:rounded-[1.5rem] border border-[#00ff66]/20 bg-[#00ff66]/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ff66]/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-[#00ff66] font-bold">{content.profit.direct}</h3>
            <div><span className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tighter whitespace-nowrap">{content.profit.directMetric}</span></div>
            <p className="text-white/70 text-xs md:text-base font-medium leading-tight">{content.profit.directDesc1}</p>
            <div className="w-full h-[1px] bg-[#00ff66]/20 my-2 md:my-4" />
            <p className="text-[#00ff66]/80 text-xs md:text-sm font-semibold leading-tight">{content.profit.directDesc2}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="col-span-2 md:col-span-2 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-5 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-row md:flex-col justify-start md:justify-between items-center md:items-start min-h-[auto] md:min-h-[240px] gap-4 md:gap-0">
            <div className="hidden md:block absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-acid)]/10 blur-[80px] rounded-full group-hover:bg-[var(--color-acid)]/20 transition-all duration-700" />
            <Database className="w-8 h-8 md:w-8 md:h-8 shrink-0 text-[var(--color-acid)] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-lg md:text-2xl mb-1 md:mb-3">{content.cards[0].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{content.cards[0].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-start md:justify-between min-h-[auto] md:min-h-[240px] gap-2 md:gap-0">
            <Zap className="w-6 h-6 md:w-8 md:h-8 shrink-0 text-[var(--color-ice)] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-base md:text-xl mb-1 md:mb-3 leading-tight">{content.cards[1].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{content.cards[1].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }} className="col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-start md:justify-between min-h-[auto] md:min-h-[240px] gap-2 md:gap-0">
            <Gift className="w-6 h-6 md:w-8 md:h-8 shrink-0 text-[#00ff66] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-base md:text-xl mb-1 md:mb-3 leading-tight">{content.cards[2].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{content.cards[2].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }} className="col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-start md:justify-between min-h-[auto] md:min-h-[240px] gap-2 md:gap-0">
            <MonitorSmartphone className="w-6 h-6 md:w-8 md:h-8 shrink-0 text-[#00ff66] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-base md:text-xl mb-1 md:mb-3 leading-tight">{content.cards[3].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{content.cards[3].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.5 }} className="col-span-1 md:col-span-2 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-start md:justify-between min-h-[auto] md:min-h-[240px] gap-2 md:gap-0">
            <div className="hidden md:block absolute -bottom-24 -left-24 w-64 h-64 bg-[#00ff66]/10 blur-[80px] rounded-full group-hover:bg-[#00ff66]/20 transition-all duration-700" />
            <Bell className="w-6 h-6 md:w-8 md:h-8 shrink-0 text-[#00ff66] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-base md:text-2xl mb-1 md:mb-3 leading-tight">{content.cards[4].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{content.cards[4].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }} className="col-span-2 md:col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-5 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-row md:flex-col justify-start md:justify-between items-center md:items-start min-h-[auto] md:min-h-[240px] gap-4 md:gap-0">
            <TrendingUp className="w-8 h-8 md:w-8 md:h-8 shrink-0 text-[var(--color-ice)] md:mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-lg md:text-xl mb-1 md:mb-3 leading-tight">{content.cards[5].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-xs md:text-sm leading-relaxed">{content.cards[5].desc}</p>
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
