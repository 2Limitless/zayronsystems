"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Zap, DollarSign, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PartnersPage() {
  return (
    <main className="min-h-[100dvh] bg-black text-white selection:bg-[#00ff66]/30 overflow-x-hidden relative font-sans flex flex-col">
      
      {/* Clean, Futuristic Background */}
      <div className="fixed inset-0 z-0 bg-black pointer-events-none" />
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[100%] h-[80vh] bg-gradient-radial from-[#00ff66]/10 to-transparent blur-[120px] pointer-events-none z-0" />
      
      {/* Dynamic Grid Lines for Futuristic Feel */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Navigation */}
      <header className="relative z-10 flex flex-none items-center justify-between px-6 py-8 md:px-12 md:py-10">
        <Link href="/">
          <img src="/logo.png" alt="ZayronSystems Logo" className="h-8 md:h-10 w-auto object-contain hover:opacity-70 transition-opacity" />
        </Link>
        <Link href="/" className="group flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ff66]/30 bg-[#00ff66]/10 text-[#00ff66] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-10"
          >
            <Zap size={14} className="animate-pulse" />
            ZayronSystems Partner Protocol
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[12vw] md:text-[80px] lg:text-[100px] leading-[0.9] font-bold tracking-tighter mb-8"
          >
            It's Free Money.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00ff66]">
              Literally.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg md:text-2xl font-light max-w-2xl leading-relaxed mb-16"
          >
            Know a business that needs a software upgrade? Introduce us. <strong className="text-white font-medium">When they close, you get 30% of the revenue.</strong> Average payouts range from $3,000 to $15,000+, scaling directly with the size of the contract.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center w-full max-w-md gap-4"
          >
            <div className="text-[#00ff66] text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <ShieldCheck size={16} /> No Scams. No Games.
            </div>
            <Link 
              href="/partners/dashboard" 
              className="w-full bg-[#00ff66] text-black py-5 rounded-full font-bold text-sm md:text-base tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_40px_rgba(0,255,102,0.2)] hover:shadow-[0_0_60px_rgba(0,255,102,0.4)] flex items-center justify-center gap-3 group"
            >
              Access Portal
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest mt-2">
              <Clock size={14} /> Takes less than 19 seconds
            </div>
          </motion.div>
        </div>

        {/* Clean, high-converting feature row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-32"
        >
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm text-left">
            <DollarSign className="text-[#00ff66] w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">30% Revenue Share</h3>
            <p className="text-white/50 text-sm leading-relaxed">No confusing tiers or caps. We give you a straight 30% of the total deal value just for making the connection.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm text-left">
            <Zap className="text-[#00ff66] w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Zero Selling</h3>
            <p className="text-white/50 text-sm leading-relaxed">You don't need to know technical specs. Drop their contact info in your portal, and our engineers close the deal.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm text-left">
            <svg className="text-[#00ff66] w-8 h-8 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <h3 className="text-xl font-bold mb-2">Full Transparency</h3>
            <p className="text-white/50 text-sm leading-relaxed">Log into your portal to see live status updates. From the initial pitch to the moment your commission is paid out.</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
