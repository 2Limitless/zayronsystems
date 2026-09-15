import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export default function BarbersShowcase() {
  return (
    <main className="w-full h-[100dvh] relative bg-black overflow-hidden font-sans">
      
      {/* Floating Back Button (Bottom Left) */}
      <div className="absolute bottom-8 left-8 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white px-4 py-3 rounded-full hover:bg-black/60 transition-all shadow-lg group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-semibold tracking-widest uppercase hidden md:block">ZayronSystems</span>
        </Link>
      </div>

      {/* Floating Book Consultation Button (Bottom Right) */}
      <div className="absolute bottom-8 right-8 z-50">
        <Link 
          href="/?consultation=true"
          className="group relative flex items-center gap-3 bg-black/60 text-white px-6 py-4 rounded-full font-medium transition-all duration-300 border border-white/20 hover:border-[#00ff66]/50 hover:bg-[#00ff66]/10 backdrop-blur-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,255,102,0.2)] hover:-translate-y-1"
        >
          <Calendar size={18} className="text-white/70 group-hover:text-[#00ff66] transition-colors duration-300" />
          <span className="text-sm font-bold uppercase tracking-widest">Book Consultation</span>
        </Link>
      </div>

      {/* Full Screen Iframe */}
      <div className="absolute inset-0 w-full h-full bg-black">
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
