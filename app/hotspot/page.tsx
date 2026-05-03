'use client';

import MapWrapper from '../../components/MapWrapper';
import Link from 'next/link';
import { useState } from 'react';

export default function HotspotPage() {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <main className="h-screen w-screen relative overflow-hidden flex flex-col">
      {/* Header Panel */}
      <div className={`absolute top-24 md:top-6 left-4 md:left-20 z-[9998] bg-white p-4 rounded shadow-lg border-l-4 border-red-600 w-[calc(100vw-32px)] md:w-80 transition-all duration-300 ${showInfo ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto'}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img src="/assets/logo_siva.png" alt="SIVA Logo" className="w-8 h-8 object-contain mr-2" />
            <h2 className="font-bold text-lg text-red-600">Scam Hotspot</h2>
          </div>
          <button className="md:hidden text-gray-500 font-bold" onClick={() => setShowInfo(false)}>✕</button>
        </div>
        <p className="text-xs text-gray-700 leading-relaxed mb-2">
          <strong>Purpose:</strong> Identifies closed complexes and high-risk facilities suspected of housing illegal cyber-scam operations and forced labor.
        </p>
        <p className="text-xs text-gray-700 leading-relaxed">
          <strong>Rescue Efforts:</strong> Coordinate with local authorities for targeted raids. Implement strict surveillance perimeters around flagged properties.
        </p>
      </div>

      {/* Mobile Toggle Button */}
      {!showInfo && (
        <button 
          onClick={() => setShowInfo(true)}
          className="md:hidden absolute top-24 left-4 z-[9998] bg-white px-3 py-2 rounded shadow border-l-4 border-red-600 text-sm font-bold flex items-center"
        >
          <span className="mr-2">ℹ️</span> Module Info
        </button>
      )}

      {/* Top Bar for Back Button to avoid overlap */}
      <div className="absolute top-0 left-0 w-full p-4 z-[9999] pointer-events-none flex justify-between items-start">
        <div className="flex-1"></div>
        <Link 
          href="/" 
          className="bg-white px-4 py-2 rounded shadow hover:bg-gray-100 transition-colors font-semibold text-sm pointer-events-auto"
        >
          &larr; Back to Home
        </Link>
      </div>

      <div className="flex-1 h-full w-full relative z-0">
        <MapWrapper mode="hotspot" />
      </div>
    </main>
  );
}