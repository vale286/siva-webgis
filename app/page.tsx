import Link from 'next/link';
import { Activity, AlertTriangle, Route, Shield } from 'lucide-react';

export default function Home() {
  return (
    <main 
      className="relative w-full overflow-x-hidden scroll-smooth bg-slate-900"
      style={{
        background: 'linear-gradient(135deg, #170C79 0%, #56B6C6 30%, #EFE3CA 70%, #8ACBD0 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0 fixed"></div>
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center z-10 px-4 sm:px-6 text-center pt-20 pb-12 overflow-hidden">
        {/* Cover Photo Background */}
        <div className="absolute inset-0 z-0">
          <img src="/assets/cambodia_picture.jpg" alt="Cambodia Cover" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <img src="/assets/logo_siva.png" alt="SIVA Logo" className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 object-contain mb-6 md:mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 md:mb-6 text-white drop-shadow-xl tracking-tight leading-tight">
          SIVA Intelligence
        </h1>
        <p className="text-lg sm:text-xl md:text-3xl text-amber-100 font-light max-w-3xl mx-auto drop-shadow-md mb-8">
          Sihanoukville Geospatial Analysis & Vulnerability Mapping
        </p>
        <div className="animate-bounce mt-12">
          <span className="text-white text-3xl opacity-70">↓</span>
        </div>
        </div>
      </section>

      {/* The Crisis Section */}
      <section className="relative w-full flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-5xl mx-auto text-left md:text-center py-12 md:py-20">
        <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-2xl border border-slate-700/50 shadow-2xl flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-2 md:mb-6">The Crisis of Human Trafficking</h2>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
            According to reports from the <strong>UNODC</strong> and the <strong>Global Organized Crime Index</strong>, Southeast Asia, specifically specific hubs in Cambodia like Sihanoukville, has become a major epicenter for forced labor and cyber-scam operations. Thousands of victims are trafficked under false pretenses, trapped in closed complexes, and forced to execute global cyber-fraud campaigns.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            The sheer scale of these operations, hidden within urban environments and specialized economic zones, poses an unprecedented challenge to human rights and regional security.
          </p>
        </div>
      </section>

      {/* SIVA Purpose Section */}
      <section className="relative w-full flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-5xl mx-auto text-left md:text-center py-12 md:py-20">
        <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-2xl border border-slate-700/50 shadow-2xl flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-2 md:mb-6">The Purpose of SIVA</h2>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
            <strong>SIVA (Sihanouk Intelligence and Vulnerability Analysis)</strong> is designed as a data-driven spatial intelligence tool. By visualizing high-risk hotspots, transit corridors, and safe zones, SIVA empowers NGOs, law enforcement, and policymakers to monitor organized crime infrastructure and strategize effective rescue and mitigation operations.
          </p>
        </div>
      </section>

      {/* Navigation / Modules Section */}
      <section className="relative w-full flex flex-col items-center justify-center z-10 px-4 sm:px-6 max-w-5xl mx-auto pt-16 pb-32 gap-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-md text-center">Explore Intelligence Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Link href="/vulnerability" className="group relative p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <div className="bg-amber-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500/40 transition-colors">
              <Activity size={28} className="text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">Vulnerability Analysis</h3>
            <p className="text-base text-gray-200">Correlation between poverty and exploitation risks.</p>
          </Link>

          <Link href="/hotspot" className="group relative p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <div className="bg-red-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-500/40 transition-colors">
              <AlertTriangle size={28} className="text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">Scam Hotspot</h3>
            <p className="text-base text-gray-200">Identification of closed complexes and illegal cyber operations.</p>
          </Link>

          <Link href="/transit" className="group relative p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <div className="bg-blue-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/40 transition-colors">
              <Route size={28} className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Transit to Trap</h3>
            <p className="text-base text-gray-200">Mapping of logistical corridors and transit movement.</p>
          </Link>

          <Link href="/escape" className="group relative p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <div className="bg-green-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/40 transition-colors">
              <Shield size={28} className="text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">Escape & Rescue</h3>
            <p className="text-base text-gray-200">Planning of safe zones, evacuation routes, and emergency facilities.</p>
          </Link>
        </div>
      </section>
      {/* Footer Credit */}
      <footer className="w-full text-center py-6 text-white text-sm border-t border-slate-700/50 mt-8">
        @ made by Baptista Yohana Vallen | 2026
      </footer>
    </main>
  );
}