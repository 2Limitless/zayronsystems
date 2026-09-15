import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export default function BarbersShowcase() {
  return (
    <main className="w-full h-[100dvh] flex flex-col bg-black overflow-hidden font-sans">
      {/* Sticky Header */}
      <header className="h-20 w-full bg-black/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 md:px-12 flex-none z-50">
        <Link 
          href="/" 
          className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-medium tracking-widest uppercase hidden md:inline">ZayronSystems</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <p className="text-white/50 text-xs hidden lg:block tracking-widest uppercase mr-4">
            Barbershop Technology Showcase
          </p>
          <Link 
            href="/"
            className="group relative flex items-center gap-2 bg-white/5 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 border border-white/10 hover:border-[#00ff66]/50 hover:bg-[#00ff66]/10 backdrop-blur-md overflow-hidden hover:shadow-[0_0_20px_rgba(0,255,102,0.15)]"
          >
            <Calendar size={16} className="text-white/70 group-hover:text-[#00ff66] transition-colors duration-300" />
            <span className="text-xs font-semibold uppercase tracking-widest">Book Consultation</span>
          </Link>
        </div>
      </header>

      {/* Iframe Container */}
      <div className="flex-1 w-full bg-black relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <iframe 
          src="https://ldw.vercel.app" 
          className="w-full h-full border-none relative z-10"
          title="ZayronSystems Barber Showcase"
          allowFullScreen
        />
      </div>
    </main>
  );
}
