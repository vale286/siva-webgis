'use client';

import { MapContainer, TileLayer, GeoJSON, Popup, CircleMarker, ZoomControl } from 'react-leaflet';
import { useEffect, useState, useRef, useMemo } from 'react';
import * as turf from '@turf/turf';

import 'leaflet/dist/leaflet.css';

interface CsvRow {
  id: string;
  name: string;
  category: string;
  lat: number;
  lon: number;
  density?: number;
}

interface SpatialSegregationMapProps {
  pointLimit: number;
  showBuffer: boolean;
}

// Lookup map: CSV row index (1-based) → actual filename in /public/image-scam-centers/
// Filenames confirmed from directory listing
const PHOTO_MAP: Record<number, string> = {
  1:  '1_7Deuce 72 Poker.jfif',
  2:  '2_Jinbei Casino.jfif',
  3:  '3_Queenco Entertainment Resort.jfif',
  4:  '4_Sunshine Casino.jfif',
  5:  '5_DV Casino.jfif',
  6:  '6_SIHA Hotel.jfif',
  7:  '7_KK Casino.jfif',
  8:  '8_Triump International.jfif',
  9:  '9_Grand La Vogue.jfif',
  10: '10_AG Casino.jfif',
  11: '11_Golden Sea Hotel.jfif',
  12: '12_Golden Casino.jfif',
  13: '13_Nanhai Casino.jfif',
  14: '14_GC Casino.jfif',
  15: '15_Gobo East.jfif',
  16: '16_Holiday Palace.jfif',
  17: '17_Wisney Casino.jfif',
  18: '18_Won Casino.jfif',
  19: '19_Victory Paradise.jfif',
  20: '20_Ya Doly Casino.jfif',
  21: '21_Sihanoukville Economic.jfif',
  22: '22_Sihanoukville Autonomous.jfif',
  23: '23_The Dirty Scammer.jfif',
  24: '24_China Town.jfif',
  25: '25_Kai Bo China Town.jfif',
  26: '26_XIHU Resort.jfif',
  27: '27_Crowner Plaza.jfif',
  28: '28_88 Residence.jfif',
  29: '29_Famous International.jfif',
  30: 'Star Bay_30.jfif',
};

export default function SpatialSegregationMap({ pointLimit, showBuffer }: SpatialSegregationMapProps) {
  const [allRows, setAllRows] = useState<CsvRow[]>([]);
  const [landuseData, setLanduseData] = useState<any>(null);
  const [gadmBoundary, setGadmBoundary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<any>(null);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchCSV = fetch('/data/scam_centers_sihanoukville.csv')
      .then(res => {
        if (!res.ok) throw new Error('CSV not found');
        return res.text();
      })
      .then(text => {
        const lines = text.split('\n').filter(l => l.trim() !== '');
        // Header: id,name,category,lat,lon
        const rows: CsvRow[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',');
          if (cols.length < 5) continue;
          // id is first, then name (may contain commas in quotes), lat is second-to-last, lon is last
          const id = cols[0].trim();
          const lon = parseFloat(cols[cols.length - 1].trim());
          const lat = parseFloat(cols[cols.length - 2].trim());
          const category = cols[cols.length - 3].trim();
          const name = cols.slice(1, cols.length - 3).join(',').trim();
          if (!isNaN(lat) && !isNaN(lon)) {
            rows.push({ id, name, category, lat, lon });
          }
        }
        setAllRows(rows);
      })
      .catch(err => console.error('CSV Error:', err));

    const fetchLanduse = fetch('/data/SIVA_Sihanoukville_Data.geojson')
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setLanduseData(data))
      .catch(err => console.error('Landuse GeoJSON Error:', err));

    const fetchGadm = fetch('/data/only_sihanoukville.geojson')
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setGadmBoundary(data))
      .catch(err => console.error('GADM GeoJSON Error:', err));

    Promise.all([fetchCSV, fetchLanduse, fetchGadm]).finally(() => setLoading(false));
  }, []);

  // Invalidate map size after load
  useEffect(() => {
    if (!loading && mapRef.current) {
      setTimeout(() => mapRef.current?.invalidateSize(), 150);
    }
  }, [loading]);

  // --- Compute Active Points with Density ---
  const activeRows = useMemo(() => {
    const sliced = allRows.slice(0, pointLimit);
    const radiusKm = 2.0;
    return sliced.map(p1 => {
      let neighbors = 0;
      sliced.forEach(p2 => {
        const dist = turf.distance(
          turf.point([p1.lon, p1.lat]),
          turf.point([p2.lon, p2.lat]),
          { units: 'kilometers' }
        );
        if (dist <= radiusKm) neighbors++;
      });
      return { ...p1, density: neighbors };
    });
  }, [allRows, pointLimit]);

  const getDensityLabel = (d: number) => d >= 6 ? 'High Density' : d >= 3 ? 'Medium Density' : 'Low Density';

  // --- GeoJSON Styles ---
  // SIVA_Sihanoukville_Data is OSM data - style by amenity/building/shop tags
  const getLanduseStyle = (feature: any) => {
    const p = feature.properties || {};
    if (p.building || p.amenity || p.shop || p.office || p.parking) {
      return { color: 'transparent', fillColor: '#1a1a2e', fillOpacity: 0.6, weight: 0 };
    }
    return { color: 'transparent', fillColor: 'transparent', fillOpacity: 0, weight: 0 };
  };

  const getGADMStyle = () => ({
    color: '#06b6d4',
    fillColor: 'transparent',
    fillOpacity: 0,
    weight: 2,
    opacity: 0.9,
  });

  // --- Loading State ---
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="animate-pulse font-semibold text-cyan-400">Loading Spatial Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer
        center={[10.627, 103.522]}
        zoom={12}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        {/* Zoom control — pushed down by CSS margin-top:80px in page.tsx */}
        <ZoomControl position="topright" />

        {/* Basemap: CartoDB Positron */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Layer 1: OSM Built-up polygons */}
        {landuseData && (
          <GeoJSON
            key={`landuse-${pointLimit}`}
            data={landuseData}
            style={getLanduseStyle}
          />
        )}

        {/* Layer 2: Study area boundary */}
        {gadmBoundary && (
          <GeoJSON data={gadmBoundary} style={getGADMStyle} />
        )}

        {/* Layer 3: TurfJS Proximity Buffers (500m) — interactive={false} agar klik tembus ke CircleMarker */}
        {showBuffer && activeRows.map(p => {
          try {
            const buf = turf.buffer(turf.point([p.lon, p.lat]), 0.5, { units: 'kilometers' });
            if (!buf) return null;
            return (
              <GeoJSON
                key={`buf-${p.id}-${pointLimit}`}
                data={buf}
                interactive={false}
                style={{ fillColor: '#ef4444', fillOpacity: 0.18, color: '#ef4444', weight: 1, opacity: 0.4 }}
              />
            );
          } catch { return null; }
        })}

        {/* Layer 4: Scam Center CircleMarkers — Popup nested correctly */}
        {activeRows.map((p, index) => {
          // Poin 1: Hardcode koordinat benar untuk 7Deuce yang CSV-nya salah
          let finalLat = p.lat;
          let finalLon = p.lon;
          if (p.name === '7Deuce 72 Poker at DV Casino') {
            finalLat = 10.610620878908703;
            finalLon = 103.516903092483;
          }

          return (
            <CircleMarker
              key={`scam-${p.id}`}
              center={[finalLat, finalLon]}
              radius={8}
              pathOptions={{ color: 'transparent', fillColor: '#ff0000', fillOpacity: 0.75 }}
            >
              <Popup minWidth={210} maxWidth={230}>
                <div style={{ fontSize: '13px', padding: '2px', maxWidth: '220px' }}>
                  {/* Poin 4: Foto via exact filename lookup — .jfif dengan nama spesifik */}
                  <img
                    src={`/image-scam-centers/${PHOTO_MAP[index + 1] || ''}`}
                    alt={p.name || 'Scam Center'}
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginBottom: '8px',
                      border: '1px solid #e5e7eb',
                      display: 'block',
                    }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <strong style={{ display: 'block', color: '#b91c1c', marginBottom: '4px', lineHeight: 1.3 }}>
                    {p.name || 'Scam Center'}
                  </strong>
                  <div style={{ color: '#6b7280', fontSize: '11px', fontFamily: 'monospace', lineHeight: 1.6 }}>
                    <span>Category: {p.category}</span><br />
                    <span>Lat: {finalLat.toFixed(6)}</span><br />
                    <span>Lng: {finalLon.toFixed(6)}</span>
                  </div>
                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: '10px', color: '#0891b2', fontWeight: 700, textTransform: 'uppercase' }}>
                      Density:
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, marginLeft: '4px' }}>
                      {getDensityLabel(p.density || 0)}
                    </span>
                    <span style={{ display: 'block', fontSize: '10px', color: '#9ca3af' }}>
                      {p.density} centers within 2km radius
                    </span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
