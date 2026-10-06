import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-20 md:px-24 md:py-32 font-sans selection:bg-[#00ff66]/30">
      <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-[#00ff66] transition-colors mb-12 uppercase tracking-widest text-xs font-bold">
        <ArrowLeft size={16} />
        Back to Hub
      </Link>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">Terms & Conditions</h1>
        <div className="space-y-8 text-white/70 text-sm md:text-base font-light leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">1. Acceptance of Terms</h2>
            <p>By accessing or using the ZayronSystems website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">2. Enterprise Software Services</h2>
            <p>ZayronSystems provides custom software architecture, digital infrastructure, and predictive maintenance solutions. Scope of work, deliverables, and specific liabilities are governed by individual Master Service Agreements (MSAs) signed prior to engagement.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">3. Intellectual Property</h2>
            <p>Unless explicitly stated in the MSA, ZayronSystems retains the intellectual property rights to the core underlying architecture and boilerplate systems. However, clients receive absolute licenses and sovereign ownership of their operational data and bespoke implementations.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">4. Limitation of Liability</h2>
            <p>ZayronSystems shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our public website.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">5. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which ZayronSystems is registered, without regard to its conflict of law provisions.</p>
          </section>
          <p className="pt-8 text-xs text-white/40 border-t border-white/10 uppercase tracking-widest">Last Updated: October 2026</p>
        </div>
      </div>
    </main>
  );
}
