"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, DollarSign, Users, Plus, CheckCircle2, X, Building, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

type Referral = {
  id: string;
  referrer_email: string;
  referrer_name: string;
  lead_name: string;
  lead_business: string;
  lead_email: string;
  lead_phone: string;
  status: string;
  commission_earned: number;
  created_at: string;
};

export default function PartnerDashboard() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newReferral, setNewReferral] = useState({
    lead_name: "",
    lead_business: "",
    lead_email: "",
    lead_phone: ""
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsAuthenticated(true);
    fetchReferrals(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setReferrals([]);
  };

  const fetchReferrals = async (userEmail: string) => {
    setLoading(true);
    try {
      if (!supabase) {
        setError("Database connection missing.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("referrals")
        .select("*")
        .eq("referrer_email", userEmail)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReferrals(data || []);
      
      if (data && data.length > 0 && !name) {
        setName(data[0].referrer_name);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch referrals.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.from("referrals").insert([
        {
          referrer_email: email,
          referrer_name: name || "Partner",
          lead_name: newReferral.lead_name,
          lead_business: newReferral.lead_business,
          lead_email: newReferral.lead_email,
          lead_phone: newReferral.lead_phone,
          status: 'pending',
          commission_earned: 0
        }
      ]);
      
      if (error) throw error;
      
      setSubmitSuccess(true);
      fetchReferrals(email);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowSubmitModal(false);
        setNewReferral({ lead_name: "", lead_business: "", lead_email: "", lead_phone: "" });
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to submit referral.");
    } finally {
      setLoading(false);
    }
  };

  const totalEarned = referrals.reduce((sum, ref) => sum + Number(ref.commission_earned || 0), 0);
  const totalPending = referrals.filter(r => r.status === 'pending' || r.status === 'contacted').length;
  const totalClosed = referrals.filter(r => r.status === 'closed_won' || r.status === 'paid').length;

  if (!isAuthenticated) {
    return (
      <main className="min-h-[100dvh] bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Clean Background */}
        <div className="absolute inset-0 z-0 bg-black pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gradient-radial from-[#00ff66]/10 to-transparent blur-[100px] pointer-events-none z-0" />

        <div className="absolute top-8 left-6 md:top-10 md:left-10 z-10">
          <Link href="/partners" className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
            <ArrowLeft size={16} /> Return
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-[#00ff66]/10 rounded-full flex items-center justify-center mb-6 border border-[#00ff66]/30 shadow-[0_0_40px_rgba(0,255,102,0.15)]">
              <DollarSign className="text-[#00ff66]" size={28} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-4">Partner Login</h1>
            <p className="text-white/50 text-sm leading-relaxed">Enter your email to view your active commissions and drop new leads into our system.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
            <div>
              <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-[#00ff66] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00ff66] text-black font-bold uppercase tracking-[0.1em] text-sm rounded-xl px-4 py-4 hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,255,102,0.2)] hover:shadow-[0_0_40px_rgba(0,255,102,0.4)] flex items-center justify-center gap-2"
            >
              Enter Portal <ArrowUpRight size={18} />
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-black text-white selection:bg-[#00ff66]/30 font-sans pb-32 relative overflow-x-hidden">
      {/* Clean Background */}
      <div className="fixed inset-0 z-0 bg-black pointer-events-none" />
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-full h-[60vh] bg-gradient-radial from-[#00ff66]/5 to-transparent blur-[120px] pointer-events-none z-0" />
      
      {/* Modals */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 max-w-xl w-full relative shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tighter">
                Drop a New Lead
              </h2>

              {submitSuccess ? (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="py-12 flex flex-col items-center text-center">
                  <CheckCircle2 className="text-[#00ff66] w-24 h-24 mb-6 drop-shadow-[0_0_40px_rgba(0,255,102,0.4)]" strokeWidth={1} />
                  <h3 className="text-3xl font-bold mb-4 tracking-tighter">Secured.</h3>
                  <p className="text-white/50 text-base">We've got the intel. Keep an eye on your dashboard for live status updates.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitReferral} className="space-y-6">
                  {!name && (
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Your Name</label>
                      <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-[#00ff66] transition-colors" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Lead Contact Name *</label>
                      <input required type="text" value={newReferral.lead_name} onChange={(e) => setNewReferral({...newReferral, lead_name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-[#00ff66] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Business Name</label>
                      <input type="text" value={newReferral.lead_business} onChange={(e) => setNewReferral({...newReferral, lead_business: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-[#00ff66] transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Lead Email *</label>
                      <input required type="email" value={newReferral.lead_email} onChange={(e) => setNewReferral({...newReferral, lead_email: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-[#00ff66] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Lead Phone</label>
                      <input type="tel" value={newReferral.lead_phone} onChange={(e) => setNewReferral({...newReferral, lead_phone: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-[#00ff66] transition-colors" />
                    </div>
                  </div>
                  
                  {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                  
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full mt-8 bg-[#00ff66] text-black font-bold uppercase tracking-widest text-sm rounded-xl px-4 py-5 hover:bg-white transition-all disabled:opacity-50"
                  >
                    {loading ? "Transmitting..." : "Submit Lead"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 md:pt-16">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] tracking-widest uppercase font-bold text-[#00ff66]">
                {email}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
              Dashboard
            </h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowSubmitModal(true)}
              className="bg-[#00ff66] text-black px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors shadow-[0_0_30px_rgba(0,255,102,0.2)] flex items-center gap-2"
            >
              <Plus size={16} /> Submit Lead
            </button>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 rounded-full border border-white/20 text-white/50 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-white/10 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {referrals.length > 0 ? (
          <>
            {/* Clean Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white/5 border border-[#00ff66]/20 rounded-3xl p-8 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#00ff66]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Total Commission Earned</h3>
                <p className="text-5xl md:text-6xl font-bold text-[#00ff66] tracking-tighter">
                  ${totalEarned.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Closed Deals</h3>
                <p className="text-5xl md:text-6xl font-bold text-white tracking-tighter">{totalClosed}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Pending Introductions</h3>
                <p className="text-5xl md:text-6xl font-bold text-white tracking-tighter">{totalPending}</p>
              </div>
            </div>

            {/* Data Table */}
            <div>
              <h2 className="text-xl font-bold tracking-tight mb-6 text-white">Your Submissions</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                {loading ? (
                  <div className="p-16 text-center text-white/50 text-sm tracking-widest uppercase">Fetching data...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="px-8 py-6 font-bold text-white/40 text-[10px] uppercase tracking-[0.2em]">Lead</th>
                          <th className="px-8 py-6 font-bold text-white/40 text-[10px] uppercase tracking-[0.2em]">Status</th>
                          <th className="px-8 py-6 font-bold text-white/40 text-[10px] uppercase tracking-[0.2em]">Value</th>
                          <th className="px-8 py-6 font-bold text-white/40 text-[10px] uppercase tracking-[0.2em]">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {referrals.map((ref) => (
                          <tr key={ref.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-8 py-6">
                              <div className="font-bold text-white text-base md:text-lg tracking-tight mb-1">{ref.lead_name}</div>
                              <div className="text-sm text-white/50 flex items-center gap-2">
                                <Building size={14} /> {ref.lead_business || 'Undisclosed'}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                                ref.status === 'closed_won' || ref.status === 'paid' 
                                  ? 'bg-[#00ff66]/10 text-[#00ff66] border-[#00ff66]/30'
                                  : ref.status === 'closed_lost'
                                    ? 'bg-red-500/10 text-red-400 border-red-500/30'
                                    : 'bg-white/5 text-white/70 border-white/20'
                              }`}>
                                {(ref.status === 'closed_won' || ref.status === 'paid') && <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />}
                                {ref.status === 'closed_lost' && <span className="w-1.5 h-1.5 rounded-full bg-red-400" />}
                                {ref.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              <div className="font-bold text-xl tracking-tighter">
                                {Number(ref.commission_earned) > 0 ? (
                                  <span className="text-white">${Number(ref.commission_earned).toLocaleString()}</span>
                                ) : ref.status === 'closed_lost' ? (
                                  <span className="text-white/30 text-sm tracking-widest uppercase">$0</span>
                                ) : (
                                  <span className="text-white/30 text-[10px] tracking-widest uppercase border border-white/10 px-3 py-1.5 rounded-full bg-white/5">Pending Scope</span>
                                )}
                              </div>
                            </td>
                            <td className="px-8 py-6 text-sm text-white/40 font-medium">
                              {new Date(ref.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-[#00ff66]/10 rounded-full flex items-center justify-center mb-8 border border-[#00ff66]/30 shadow-[0_0_40px_rgba(0,255,102,0.15)] relative">
              <div className="absolute inset-0 bg-[#00ff66]/20 rounded-full animate-ping" />
              <DollarSign className="text-[#00ff66] relative z-10" size={36} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">Start Earning 30%</h2>
            <p className="text-white/50 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              You haven't dropped any leads yet. Connect us with a business that needs a software upgrade, and we'll cut you 30% of the revenue when the deal closes.
            </p>
            <button 
              onClick={() => setShowSubmitModal(true)}
              className="bg-[#00ff66] text-black px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_40px_rgba(0,255,102,0.2)] hover:shadow-[0_0_60px_rgba(0,255,102,0.4)] flex items-center gap-3"
            >
              <Plus size={20} /> Submit Your First Lead
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
