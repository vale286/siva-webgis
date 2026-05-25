'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import { Target, Compass, Sliders, ShieldAlert } from 'lucide-react';

const SpatialSegregationMap = dynamic(() => import('../../../components/SpatialSegregationMap'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="animate-pulse font-semibold text-cyan-400">Initializing Spatial System...</p>
      </div>
    </div>
  )
});

export default function SpatialSegregationPage() {
  const [showInfo, setShowInfo] = useState(true);
  const [pointLimit, setPointLimit] = useState(30);
  const [showBuffer, setShowBuffer] = useState(false);

  return (
    <main className="h-[100dvh] w-screen relative overflow-y-auto scroll-smooth flex flex-col bg-slate-950">
      <style>{`.leaflet-top.leaflet-right { margin-top: 80px !important; }`}</style>
      {/* Left Sidebar — semua panel menggunakan left-4 dan w-[calc(100vw-32px)] md:w-72 */}
      <div 
        className={`absolute top-16 md:top-6 left-4 z-[9998] flex flex-col gap-3 w-[calc(100vw-32px)] md:w-72 max-h-[calc(100vh-120px)] md:max-h-none overflow-y-auto scrollbar-hide transition-all duration-300 ${
          showInfo 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto'
        }`}
      >
        {/* Module Info Header */}
        <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-cyan-500/30 shadow-2xl border-l-4 border-l-cyan-500 text-white shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img src="/assets/logo_siva.png" alt="SIVA Logo" className="w-6 h-6 object-contain mr-2" />
              <h2 className="font-bold text-base text-cyan-400">Spatial Segregation</h2>
            </div>
            <button className="md:hidden text-gray-400 hover:text-white font-bold" onClick={() => setShowInfo(false)}>✕</button>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed mb-2 hidden md:block">
            <strong>Purpose:</strong> Nearest neighbor analysis of syndicate operations within commercial zones.
          </p>
          <p className="text-[11px] text-gray-300 leading-relaxed hidden md:block">
            <strong>Action:</strong> Identify clustered coordinates to focus patrols inside heavily segregated districts.
          </p>
        </div>

        {/* STEP 3: Interactive Widgets Control Panel */}
        <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-cyan-500/20 shadow-2xl text-white shrink-0">
          <h3 className="font-bold text-cyan-400 text-xs mb-3 border-b border-slate-700 pb-1.5 flex items-center">
            <Sliders size={14} className="mr-2" /> Interactive Controls
          </h3>
          
          <div className="space-y-4">
            {/* Slider to control point limit */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-400 font-medium">Filter Scam Centers:</span>
                <span className="text-cyan-300 font-mono font-bold">{pointLimit} / 30</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={pointLimit}
                onChange={(e) => setPointLimit(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Toggle Switch for Proximity Buffer */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-3">
              <span className="text-[11px] text-gray-400 font-medium">Proximity Buffer (500m):</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showBuffer}
                  onChange={(e) => setShowBuffer(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* SPATIAL ANALYSIS RESULTS - Moved inside flex-col to prevent overlap with Controls, added mt-2 for breathing room */}
        <div className="shrink-0 p-3 bg-slate-900/80 backdrop-blur border border-cyan-500/30 rounded-xl text-white hidden md:block mt-2 shadow-2xl">
          <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <ShieldAlert size={11} /> Spatial Analysis Results
          </p>
          <p className="text-[10px] text-gray-300 leading-snug mb-1.5">
            Segregation Confirmed: Operations are strictly confined within insulated commercial boundaries (Class 50).
          </p>
          <p className="text-[10px] text-gray-400 leading-snug mb-2 italic border-l-2 border-cyan-700 pl-2">
            Intelligence Context: Clustered coordinates heavily correlate with suspected scam compounds and trafficking hubs as exposed by investigative reports from Al Jazeera, VICE, and SCMP.
          </p>
          <p className="text-[10px] text-gray-400">
            <span className="text-cyan-300 font-semibold">NNI:</span> 0.84 
            <span className="text-yellow-400 font-semibold ml-1">(Clustered)</span>
            <span className="mx-1.5 text-slate-600">|</span>
            <span className="text-cyan-300 font-semibold">Z-Score:</span> -1.60
          </p>
        </div>

      {/* Left Sidebar container closes here */}
      </div>

      {/* Mobile Key Insights — shown when panel is open */}
      {showInfo && (
        <div className="md:hidden absolute bottom-20 left-4 right-4 z-[9998] bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-cyan-500/20 shadow-2xl text-white">
          <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <ShieldAlert size={11} /> Spatial Analysis Results
          </p>
          <p className="text-[10px] text-gray-300 leading-normal mb-1">
            Segregation Confirmed: Operations confined within commercial boundaries (Class 50).
          </p>
          <p className="text-[10px] text-gray-400">
            <span className="text-cyan-300 font-semibold">NNI:</span> 0.84 <span className="text-yellow-400">(Clustered)</span>
            <span className="mx-1 text-slate-600">|</span>
            <span className="text-cyan-300 font-semibold">Z:</span> -1.60
          </p>
        </div>
      )}

      {/* Mobile Toggle Button */}
      {!showInfo && (
        <button 
          onClick={() => setShowInfo(true)}
          className="md:hidden absolute top-24 left-4 z-[9998] bg-slate-900/90 border border-cyan-500/30 text-cyan-400 px-3 py-2 rounded shadow text-sm font-bold flex items-center"
        >
          <span className="mr-2">ℹ️</span> Module Info
        </button>
      )}

      {/* Poin 2: Legend dinaikkan ke bottom-28 agar tidak nabrak chatbot */}
      <div className="absolute bottom-28 right-4 z-[1000] bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-cyan-500/20 shadow-2xl w-52 md:w-60 text-white">
        <div className="flex items-center mb-2 border-b border-slate-700 pb-1.5">
          <Target size={14} className="mr-2 text-cyan-400" />
          <h3 className="font-bold text-xs">Legend</h3>
        </div>
        <div className="space-y-2 text-xs">
          {/* Scam Centers */}
          <span className="text-gray-400 text-[10px] block uppercase tracking-wider font-semibold">Scam Centers</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600 border border-red-400"></span>
            <span className="text-gray-300">Hotspot Location</span>
          </div>
          <div className="border-t border-slate-800 pt-2 space-y-1.5">
            {showBuffer && (
              <div className="flex items-center gap-2">
                <span className="w-5 h-3 bg-red-600/20 border border-red-500 rounded-sm"></span>
                <span className="text-gray-300">Buffer (500m)</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="w-5 h-3 rounded-sm" style={{backgroundColor:'#1f2937', border:'1px solid #4b5563'}}></span>
              <span className="text-gray-300">Built-up (Code 50)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-cyan-500 inline-block"></span>
              <span className="text-gray-300">Study Area Boundary</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Bar for Back Button */}
      <div className="absolute top-0 left-0 w-full p-4 z-[9999] pointer-events-none flex justify-between items-start">
        <div className="flex-1"></div>
        <Link 
          href="/" 
          className="bg-slate-900/90 border border-slate-700 text-white px-4 py-2 rounded shadow hover:bg-slate-800 hover:border-cyan-500/50 transition-all font-semibold text-sm pointer-events-auto flex items-center gap-2"
        >
          &larr; Back to Home
        </Link>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 h-full w-full relative z-0">
        <SpatialSegregationMap pointLimit={pointLimit} showBuffer={showBuffer} />
      </div>
    </main>
  );
}
