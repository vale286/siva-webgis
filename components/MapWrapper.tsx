'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import MapLegend from './MapLegend';

const SIVAMap = dynamic(() => import('./SIVAMap'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <p className="animate-pulse font-semibold">Menginisialisasi Sistem SIVA...</p>
    </div>
  )
});

interface MapWrapperProps {
  mode?: 'vulnerability' | 'hotspot' | 'transit' | 'escape';
}

export default function MapWrapper({ mode = 'vulnerability' }: MapWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative h-full w-full">
      <SIVAMap mode={mode} />
      <MapLegend mode={mode} />
    </div>
  );
}