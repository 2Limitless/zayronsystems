"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Search, Users, Phone, Mail, Building, Clock, LogOut, DollarSign, CheckCircle, Edit2, X } from "lucide-react";

// Initialize Supabase client safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  created_at: string;
};

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

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"leads" | "referrals">("leads");

  // Edit State
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editCommission, setEditCommission] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Hulk0110") {
      setIsAuthenticated(true);
      setError("");
      fetchData();
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLeads([]);
    setReferrals([]);
    setPassword("");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!supabase) {
        setError("Database connection is not configured.");
        setLoading(false);
        return;
      }

      const [leadsRes, refRes] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }),
        supabase.from("referrals").select("*").order("created_at", { ascending: false })
      ]);

      if (leadsRes.error) console.error("Error fetching leads:", leadsRes.error);
      else setLeads(leadsRes.data || []);

      if (refRes.error) console.error("Error fetching referrals:", refRes.error);
      else setReferrals(refRes.data || []);
      
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReferral || !supabase) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("referrals")
        .update({ status: editStatus, commission_earned: editCommission })
        .eq("id", editingReferral.id);
        
      if (error) throw error;
      
      setEditingReferral(null);
      fetchData();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update referral");
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.business?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReferrals = referrals.filter(
    (ref) =>
      ref.referrer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.referrer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.lead_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.lead_business?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ff66] to-emerald-500" />
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
              <Lock className="text-[#00ff66]" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Hub</h1>
            <p className="text-white/50 text-sm mt-2 text-center">Enter your password to view leads and referrals</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00ff66]/50 transition-colors"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3 hover:bg-gray-200 transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-[#00ff66]/30">
      
      {/* Edit Modal */}
      <AnimatePresence>
        {editingReferral && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-md w-full relative"
            >
              <button 
                onClick={() => setEditingReferral(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-6">Update Referral</h2>
              <form onSubmit={handleUpdateReferral} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Status</label>
                  <select 
                    value={editStatus} 
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff66]/50 appearance-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed_won">Closed Won</option>
                    <option value="closed_lost">Closed Lost</option>
                    <option value="paid">Commission Paid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Commission Earned ($)</label>
                  <input 
                    type="number" 
                    value={editCommission} 
                    onChange={(e) => setEditCommission(Number(e.target.value))}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff66]/50"
                  />
                  <p className="text-white/30 text-xs mt-2">Enter the exact 30% payout amount once the deal is closed.</p>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[#00ff66] text-black font-bold uppercase tracking-widest text-sm rounded-xl px-4 py-4 hover:bg-white transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">Admin Hub</h1>
            <p className="text-white/50">Manage incoming leads and partner referrals.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#00ff66]/50 w-full md:w-64 transition-all"
              />
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm text-white/70 hover:text-white"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab("leads")}
            className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
              activeTab === "leads" 
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            Direct Leads
          </button>
          <button 
            onClick={() => setActiveTab("referrals")}
            className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeTab === "referrals" 
                ? "bg-[#00ff66] text-black shadow-[0_0_20px_rgba(0,255,102,0.3)]" 
                : "text-white/50 hover:text-[#00ff66] hover:bg-white/5"
            }`}
          >
            Partner Referrals
            {referrals.filter(r => r.status === 'pending').length > 0 && (
              <span className={`w-2 h-2 rounded-full ${activeTab === 'referrals' ? 'bg-black' : 'bg-[#00ff66]'}`} />
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff66]/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-[#00ff66]/10" />
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Users className="text-[#00ff66]" size={20} />
              </div>
              <h3 className="font-medium text-white/70">
                {activeTab === 'leads' ? 'Total Leads' : 'Total Referrals'}
              </h3>
            </div>
            <p className="text-4xl font-bold">
              {activeTab === 'leads' ? leads.length : referrals.length}
            </p>
          </div>
          
          {activeTab === 'referrals' && (
            <>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <DollarSign className="text-[#00ff66]" size={20} />
                  </div>
                  <h3 className="font-medium text-white/70">Owed Commissions</h3>
                </div>
                <p className="text-4xl font-bold">
                  ${referrals.filter(r => r.status === 'closed_won').reduce((sum, r) => sum + Number(r.commission_earned), 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <CheckCircle className="text-[#00ff66]" size={20} />
                  </div>
                  <h3 className="font-medium text-white/70">Paid Out</h3>
                </div>
                <p className="text-4xl font-bold">
                  ${referrals.filter(r => r.status === 'paid').reduce((sum, r) => sum + Number(r.commission_earned), 0).toLocaleString()}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Data Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  {activeTab === 'leads' ? (
                    <>
                      <th className="px-6 py-4 font-medium text-white/50 text-sm">Contact</th>
                      <th className="px-6 py-4 font-medium text-white/50 text-sm">Business</th>
                      <th className="px-6 py-4 font-medium text-white/50 text-sm">Date</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-4 font-medium text-white/50 text-sm">Partner</th>
                      <th className="px-6 py-4 font-medium text-white/50 text-sm">Referred Lead</th>
                      <th className="px-6 py-4 font-medium text-white/50 text-sm">Status / Commission</th>
                      <th className="px-6 py-4 font-medium text-white/50 text-sm">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-white/50">
                      Loading data...
                    </td>
                  </tr>
                ) : activeTab === 'leads' && filteredLeads.length === 0 ? (
                  <tr><td colSpan={3} className="px-6 py-12 text-center text-white/50">No leads found.</td></tr>
                ) : activeTab === 'referrals' && filteredReferrals.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-white/50">No referrals found.</td></tr>
                ) : activeTab === 'leads' ? (
                  filteredLeads.map((lead) => (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white mb-1 group-hover:text-[#00ff66] transition-colors">{lead.name}</div>
                        <div className="flex items-center gap-3 text-sm text-white/50">
                          <span className="flex items-center gap-1"><Mail size={12}/> {lead.email}</span>
                          <span className="flex items-center gap-1"><Phone size={12}/> {lead.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building size={16} className="text-white/30" />
                          <span className="text-white/80">{lead.business || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/50">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-white/30" />
                          {new Date(lead.created_at).toLocaleDateString()}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  filteredReferrals.map((ref) => (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={ref.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white mb-1 group-hover:text-[#00ff66] transition-colors">{ref.referrer_name}</div>
                        <div className="text-sm text-white/50">{ref.referrer_email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-white mb-1">{ref.lead_name}</div>
                        <div className="flex items-center gap-3 text-sm text-white/50 mb-1">
                          <span className="flex items-center gap-1"><Building size={12}/> {ref.lead_business || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-white/40">
                          <span>{ref.lead_email}</span> | <span>{ref.lead_phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2 items-start">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${
                            ref.status === 'closed_won' || ref.status === 'paid' ? 'bg-[#00ff66]/10 text-[#00ff66] border-[#00ff66]/20'
                            : ref.status === 'closed_lost' ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : 'bg-white/5 text-white/70 border-white/10'
                          }`}>
                            {ref.status.replace('_', ' ')}
                          </span>
                          {(ref.status === 'closed_won' || ref.status === 'paid') && (
                            <span className="text-sm font-bold text-white">${Number(ref.commission_earned || 0).toLocaleString()}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => {
                            setEditingReferral(ref);
                            setEditStatus(ref.status);
                            setEditCommission(Number(ref.commission_earned || 0));
                          }}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                          title="Edit Referral"
                        >
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
