'use client';

import { Shield, Plane, Ship, AlertTriangle, Home, Activity } from 'lucide-react';
import { useState } from 'react';

interface MapLegendProps {
  mode?: 'vulnerability' | 'hotspot' | 'transit' | 'escape';
}

export default function MapLegend({ mode = 'vulnerability' }: MapLegendProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="absolute bottom-6 right-6 z-[9999] bg-slate-900/90 text-white p-3 rounded-full shadow-xl border border-slate-700 hover:bg-slate-800 transition-colors"
        title="Show Legend"
      >
        <Activity size={24} />
      </button>
    );
  }

  return (
    <div className="absolute bottom-6 right-6 z-[9999] bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-2xl border border-gray-200 w-64">
      <div className="flex justify-between items-center mb-3 border-b pb-2">
        <h3 className="font-bold text-gray-800 flex items-center">
          <Activity size={18} className="mr-2 text-indigo-600" /> Legend
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">✕</button>
      </div>

      <div className="space-y-3 text-sm">
        {mode === 'escape' && (
          <>
            <div className="flex items-center">
              <div className="w-6 h-1 bg-green-500 border-t-2 border-b-2 border-dashed border-white mr-3"></div>
              <span className="text-gray-700">Safe Escape Route</span>
            </div>
            <div className="flex items-center">
              <Shield size={20} className="text-green-600 mr-3" />
              <span className="text-gray-700">Diplomatic/Police</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl mr-3 leading-none">🎌</span>
              <span className="text-gray-700">Embassy</span>
            </div>
          </>
        )}

        {mode === 'transit' && (
          <>
            <div className="flex items-center">
              <div className="w-6 h-1 bg-blue-500 mr-3"></div>
              <span className="text-gray-700">Trafficking Corridor</span>
            </div>
            <div className="flex items-center">
              <Plane size={20} className="text-blue-600 mr-3" />
              <span className="text-gray-700">Intl. Airport (KOS)</span>
            </div>
            <div className="flex items-center">
              <Ship size={20} className="text-blue-600 mr-3" />
              <span className="text-gray-700">Seaport</span>
            </div>
          </>
        )}

        {mode === 'hotspot' && (
          <>
            <div className="flex items-center">
              <div className="w-6 h-4 bg-red-600 opacity-80 mr-3 rounded-sm border border-red-800"></div>
              <span className="text-gray-700">Suspected Scam Complex</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle size={20} className="text-red-600 mr-3" />
              <span className="text-gray-700">High-Risk Marker</span>
            </div>
          </>
        )}

        {mode === 'vulnerability' && (
          <>
            <div className="flex items-center">
              <div className="w-6 h-4 bg-amber-400 opacity-60 mr-3 rounded-sm border border-amber-600"></div>
              <span className="text-gray-700">High-Density Residential</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-4 bg-orange-600 opacity-80 mr-3 rounded-sm border border-orange-800"></div>
              <span className="text-gray-700 text-xs">High Vulnerability (Near Industry)</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
