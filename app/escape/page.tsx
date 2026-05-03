'use client';

import MapWrapper from '../../components/MapWrapper';
import Link from 'next/link';
import { useState } from 'react';

export default function EscapePage() {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <main className="h-screen w-screen relative overflow-hidden flex flex-col">
      {/* Informational Panels (Combined for mobile toggle) */}
      <div className={`absolute top-24 md:top-6 left-4 md:left-20 z-[9998] flex flex-col gap-4 w-[calc(100vw-32px)] md:w-80 transition-all duration-300 ${showInfo ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto'}`}>
        
        {/* Header Panel */}
        <div className="bg-white p-4 rounded shadow-lg border-l-4 border-green-600">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img src="/assets/logo_siva.png" alt="SIVA Logo" className="w-8 h-8 object-contain mr-2" />
              <h2 className="font-bold text-lg text-green-600">Escape & Rescue</h2>
            </div>
            <button className="md:hidden text-gray-500 font-bold" onClick={() => setShowInfo(false)}>✕</button>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed mb-2">
            <strong>Purpose:</strong> Identifies official Safe Zones (Embassies, Police Stations, Hospitals) and maps out primary escape routes from high-risk areas.
          </p>
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong>Rescue Efforts:</strong> Deploy rapid extraction teams along green-highlighted routes. Ensure Safe Zones are prepared for victim intake.
          </p>
        </div>

        {/* Emergency Protocol */}
        <div className="bg-slate-900/90 text-gray-100 p-5 rounded-lg shadow-2xl border border-slate-700 backdrop-blur-sm hidden md:block">
          <h3 className="font-bold text-green-400 mb-2 border-b border-slate-600 pb-1 flex items-center">
            <span className="mr-2">🛡️</span> Emergency Protocol
          </h3>
          <ul className="text-xs space-y-2 mb-3">
            <li><strong>Stay Alert:</strong> Avoid isolated alleys; stick to primary green-highlighted roads.</li>
            <li><strong>Self-Defense:</strong> Do not confront syndicate guards. Blend in with local crowds if possible.</li>
            <li><strong>Reaching Safety:</strong> Head directly to 🎌 Diplomatic Facilities or 🛡️ Police Stations.</li>
          </ul>
          <p className="text-[10px] text-amber-300 italic">Memorize the nearest safe zone location before attempting any escape.</p>
        </div>
      </div>

      {/* Mobile Emergency Protocol (Bottom) */}
      {showInfo && (
        <div className="md:hidden absolute bottom-24 left-4 z-[9998] w-[calc(100vw-32px)] bg-slate-900/90 text-gray-100 p-4 rounded-lg shadow-2xl border border-slate-700 backdrop-blur-sm">
          <h3 className="font-bold text-green-400 mb-2 border-b border-slate-600 pb-1 flex items-center text-sm">
            <span className="mr-2">🛡️</span> Emergency Protocol
          </h3>
          <ul className="text-xs space-y-1">
            <li><strong>Stay Alert:</strong> Avoid isolated alleys; stick to green routes.</li>
            <li><strong>Self-Defense:</strong> Do not confront guards.</li>
            <li><strong>Reaching Safety:</strong> Head directly to 🎌 or 🛡️.</li>
          </ul>
        </div>
      )}

      {/* Mobile Toggle Button */}
      {!showInfo && (
        <button 
          onClick={() => setShowInfo(true)}
          className="md:hidden absolute top-24 left-4 z-[9998] bg-white px-3 py-2 rounded shadow border-l-4 border-green-600 text-sm font-bold flex items-center"
        >
          <span className="mr-2">🛡️</span> Escape Info
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
        <MapWrapper mode="escape" />
      </div>
    </main>
  );
}