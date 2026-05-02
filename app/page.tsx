import Link from 'next/link';

export default function Home() {
  return (
    <main 
      className="min-h-screen flex flex-col items-center relative overflow-y-auto overflow-x-hidden scroll-smooth"
      style={{
        background: 'linear-gradient(135deg, #170C79 0%, #56B6C6 30%, #EFE3CA 70%, #8ACBD0 100%)'
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0 fixed"></div>
      
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center z-10 px-6 text-center pt-16">
        <img src="/assets/logo_siva.png" alt="SIVA Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-xl tracking-tight leading-tight">
          SIVA Intelligence
        </h1>
        <p className="text-xl md:text-3xl text-amber-100 font-light max-w-3xl mx-auto drop-shadow-md mb-8">
          Sihanoukville Geospatial Analysis & Vulnerability Mapping
        </p>
        <div className="animate-bounce mt-12">
          <span className="text-white text-3xl opacity-70">↓</span>
        </div>
      </section>

      {/* The Crisis Section */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center z-10 px-6 max-w-5xl mx-auto text-left md:text-center py-16">
        <div className="bg-slate-900/60 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-slate-700/50 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-6">The Crisis of Human Trafficking</h2>
          <p className="text-lg text-gray-200 leading-relaxed mb-6">
            According to reports from the <strong>UNODC</strong> and the <strong>Global Organized Crime Index</strong>, Southeast Asia, specifically specific hubs in Cambodia like Sihanoukville, has become a major epicenter for forced labor and cyber-scam operations. Thousands of victims are trafficked under false pretenses, trapped in closed complexes, and forced to execute global cyber-fraud campaigns.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            The sheer scale of these operations, hidden within urban environments and specialized economic zones, poses an unprecedented challenge to human rights and regional security.
          </p>
        </div>
      </section>

      {/* SIVA Purpose Section */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center z-10 px-6 max-w-5xl mx-auto text-left md:text-center py-16">
        <div className="bg-slate-900/60 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-slate-700/50 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">The Purpose of SIVA</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            <strong>SIVA (Sihanouk Intelligence and Vulnerability Analysis)</strong> is designed as a data-driven spatial intelligence tool. By visualizing high-risk hotspots, transit corridors, and safe zones, SIVA empowers NGOs, law enforcement, and policymakers to monitor organized crime infrastructure and strategize effective rescue and mitigation operations.
          </p>
        </div>
      </section>

      {/* Navigation / Modules Section */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center z-10 px-4 w-full max-w-5xl pt-32 pb-32 mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 drop-shadow-md text-center">Explore Intelligence Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Link href="/vulnerability" className="group relative p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">Vulnerability Analysis</h3>
            <p className="text-base text-gray-200">Korelasi kemiskinan dan kerentanan eksploitasi berbasis wilayah.</p>
          </Link>

          <Link href="/hotspot" className="group relative p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">Scam Hotspot</h3>
            <p className="text-base text-gray-200">Identifikasi indikasi kompleks tertutup dan operasi siber ilegal.</p>
          </Link>

          <Link href="/transit" className="group relative p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Transit to Trap</h3>
            <p className="text-base text-gray-200">Pemetaan jalur logistik dan pergerakan dari titik transit ke area padat.</p>
          </Link>

          <Link href="/escape" className="group relative p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">Escape & Rescue</h3>
            <p className="text-base text-gray-200">Perencanaan zona aman, rute evakuasi, dan fasilitas bantuan darurat.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}