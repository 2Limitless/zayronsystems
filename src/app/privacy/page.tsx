import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-20 md:px-24 md:py-32 font-sans selection:bg-[#00ff66]/30">
      <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-[#00ff66] transition-colors mb-12 uppercase tracking-widest text-xs font-bold">
        <ArrowLeft size={16} />
        Back to Hub
      </Link>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">Privacy Policy</h1>
        <div className="space-y-8 text-white/70 text-sm md:text-base font-light leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">1. Information We Collect</h2>
            <p>ZayronSystems collects information to provide better services to our enterprise clients. This includes information you provide directly (such as names, emails, and corporate details during consultation applications) and automated data (such as IP addresses and interaction metrics on our sovereign digital infrastructure).</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">2. How We Use Information</h2>
            <p>We use the collected information to design, develop, and deploy bespoke enterprise software, improve our predictive algorithms, and communicate regarding project milestones. ZayronSystems never sells your operational data to third-party data brokers.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">3. Data Sovereignty</h2>
            <p>At ZayronSystems, we believe in Data Sovereignty. Any data processed through the custom software we build for you remains 100% yours. Our internal collection only pertains to our direct communication and marketing analytics on this website.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">4. Cookies & Tracking</h2>
            <p>We utilize essential cookies to manage sessions and non-essential cookies to analyze site traffic. You can choose to disable non-essential cookies via your browser settings without losing core functionality of our public site.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">5. Contact</h2>
            <p>For any inquiries regarding our privacy practices, please contact our legal team at legal@zayronsystems.com.</p>
          </section>
          <p className="pt-8 text-xs text-white/40 border-t border-white/10 uppercase tracking-widest">Last Updated: October 2026</p>
        </div>
      </div>
    </main>
  );
}
