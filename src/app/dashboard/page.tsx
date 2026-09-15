"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Lock, Search, Users, Phone, Mail, Building, Clock, LogOut } from "lucide-react";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  created_at: string;
};

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      setError("");
      fetchLeads();
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLeads([]);
    setPassword("");
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
        // Fallback fake data for UI demonstration if table is empty/errors
        setLeads([]);
      } else {
        setLeads(data || []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
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
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-white/50 text-sm mt-2 text-center">Enter your password to view leads</p>
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
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">Leads Hub</h1>
            <p className="text-white/50">Manage and track your incoming enterprise inquiries.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Search leads..."
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff66]/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-[#00ff66]/10" />
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Users className="text-[#00ff66]" size={20} />
              </div>
              <h3 className="font-medium text-white/70">Total Leads</h3>
            </div>
            <p className="text-4xl font-bold">{leads.length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-6 py-4 font-medium text-white/50 text-sm">Contact</th>
                  <th className="px-6 py-4 font-medium text-white/50 text-sm">Business</th>
                  <th className="px-6 py-4 font-medium text-white/50 text-sm">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-white/50">
                      Loading leads...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-white/50">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={lead.id} 
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-white mb-1 group-hover:text-[#00ff66] transition-colors">
                          {lead.name}
                        </div>
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
                          {new Date(lead.created_at).toLocaleDateString(undefined, { 
                            year: 'numeric', month: 'short', day: 'numeric' 
                          })}
                        </div>
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
