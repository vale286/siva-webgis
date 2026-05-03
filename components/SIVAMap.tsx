'use client';

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import * as turf from '@turf/turf';

import 'leaflet/dist/leaflet.css';

interface SIVAMapProps {
  mode?: 'vulnerability' | 'hotspot' | 'transit' | 'escape';
}

export default function SIVAMap({ mode = 'vulnerability' }: SIVAMapProps) {
  const [geoData, setGeoData] = useState<any>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    fetch('/data/SIVA_Sihanoukville_Data.geojson')
      .then((res) => {
        if (!res.ok) throw new Error('File tidak ditemukan');
        return res.json();
      })
      .then((data) => {
        try {
          // Append KOS Airport
          data.features.push({
            type: "Feature",
            properties: {
              name: "Sihanoukville International Airport (KOS)",
              amenity: "airport"
            },
            geometry: {
              type: "Point",
              coordinates: [103.637, 10.580]
            }
          });

          // Spatial Analysis for Vulnerability Mode
          const industrialFeatures = data.features.filter((f: any) => 
            ['industrial', 'apartments', 'commercial'].includes(f.properties?.building) ||
            ['casino'].includes(f.properties?.amenity)
          );

          data.features.forEach((feature: any) => {
            if (['residential', 'house'].includes(feature.properties?.building)) {
              let isHighRisk = false;
              const resCenter = turf.center(feature);
              for (const indFeature of industrialFeatures) {
                const indCenter = turf.center(indFeature);
                if (turf.distance(resCenter, indCenter, { units: 'kilometers' }) < 0.5) {
                  isHighRisk = true;
                  break;
                }
              }
              feature.properties.isHighVulnerability = isHighRisk;
            }
          });
        } catch (e) {
          console.error("Spatial analysis error", e);
        }
        
        setGeoData(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => mapRef.current?.invalidateSize(), 100);
    }
  }, [geoData]);

  const safeZoneIcon = L.divIcon({
    html: '<div style="font-size: 24px; text-shadow: 0 0 5px white;">🛡️</div>',
    className: 'custom-safe-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  const embassyIcon = L.divIcon({
    html: '<div style="font-size: 24px; text-shadow: 0 0 5px white;">🎌</div>',
    className: 'custom-embassy-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  const hotspotIcon = L.divIcon({
    html: '<div style="font-size: 28px; color: red; text-shadow: 0 0 5px white;">⚠️</div>',
    className: 'custom-hotspot-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  const transitAirportIcon = L.divIcon({
    html: '<div style="font-size: 24px; text-shadow: 0 0 5px white;">✈️</div>',
    className: 'custom-airport-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  const transitPortIcon = L.divIcon({
    html: '<div style="font-size: 24px; text-shadow: 0 0 5px white;">🚢</div>',
    className: 'custom-port-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  const getFeatureStyle = (feature: any) => {
    const props = feature.properties || {};
    const building = props.building;
    const amenity = props.amenity;
    const highway = props.highway;
    const office = props.office;

    if (mode === 'vulnerability') {
      if (['residential', 'house', 'apartments'].includes(building)) {
        if (props.isHighVulnerability) {
          return { color: '#ea580c', fillColor: '#c2410c', fillOpacity: 0.8, weight: 2 };
        }
        return { color: '#f59e0b', fillColor: '#fcd34d', fillOpacity: 0.6, weight: 1 };
      }
      return { color: '#cccccc', weight: 1, fillOpacity: 0.1 };
    }

    if (mode === 'hotspot') {
      if (['casino'].includes(amenity) || ['apartments', 'industrial'].includes(building)) {
        return { color: '#ef4444', fillColor: '#991b1b', fillOpacity: 0.9, weight: 2 };
      }
      return { color: '#cccccc', weight: 1, fillOpacity: 0.1 };
    }

    if (mode === 'transit') {
      if (highway && ['trunk', 'primary', 'secondary', 'trunk_link', 'primary_link'].includes(highway)) {
        // className 'ant-path' is key for CSS animation
        return { color: '#3b82f6', weight: 4, opacity: 0.8, className: 'ant-path' };
      }
      if (highway) return { color: '#9ca3af', weight: 1, opacity: 0.3 };
      return { color: '#cccccc', weight: 1, fillOpacity: 0.1 };
    }

    if (mode === 'escape') {
      if (['police', 'hospital', 'clinic', 'place_of_worship', 'embassy'].includes(amenity) || ['diplomatic'].includes(office)) {
        return { color: '#10b981', fillColor: '#34d399', fillOpacity: 0.8, weight: 2 };
      }
      if (highway && ['trunk', 'primary', 'secondary'].includes(highway)) {
        return { color: '#10b981', weight: 4, opacity: 0.9, dashArray: '5, 10' };
      }
      return { color: '#cccccc', weight: 1, fillOpacity: 0.1 };
    }

    return { color: '#3388ff', weight: 1 };
  };

  const pointToLayer = (feature: any, latlng: any) => {
    const props = feature.properties || {};
    const amenity = props.amenity;
    const building = props.building;
    const office = props.office;
    
    if (mode === 'hotspot') {
      if (['casino'].includes(amenity) || ['apartments', 'industrial'].includes(building)) {
        return L.marker(latlng, { icon: hotspotIcon });
      }
    }
    
    if (mode === 'transit') {
      if (['aerodrome', 'airport'].includes(amenity)) {
        return L.marker(latlng, { icon: transitAirportIcon });
      }
      if (['ferry_terminal'].includes(amenity)) {
        return L.marker(latlng, { icon: transitPortIcon });
      }
      if (['bus_station'].includes(amenity)) {
        return L.circleMarker(latlng, { radius: 10, fillColor: "#3b82f6", color: "#1d4ed8", weight: 2, fillOpacity: 0.9 });
      }
    }

    if (mode === 'escape') {
      if (['embassy'].includes(amenity) || ['diplomatic'].includes(office)) {
        return L.marker(latlng, { icon: embassyIcon });
      }
      if (['police', 'hospital', 'clinic', 'place_of_worship'].includes(amenity)) {
        return L.marker(latlng, { icon: safeZoneIcon });
      }
    }

    if (mode === 'escape') return null; // hide irrelevant markers in escape mode

    return L.circleMarker(latlng, { radius: 5, color: '#666', fillOpacity: 0.5, weight: 1 });
  };

  const hasKhmerChars = (text: string) => /[\u1780-\u17FF]/.test(text || '');

  const getInsightText = (props: any, mode: string) => {
    const type = props.amenity || props.building || props.office || '';
    if (['embassy', 'diplomatic'].includes(type)) return 'Fasilitas Diplomatik 🎌: Otoritas internasional untuk perlindungan warga negara.';
    if (['hospital', 'clinic', 'doctors'].includes(type)) return 'Fasilitas Medis Strategis: Memerlukan pemantauan anomali aktivitas operasional di area risiko tinggi.';
    if (['casino'].includes(type)) return 'Hotspot Risiko Tinggi ⚠️: Terindikasi kuat sebagai kompleks tertutup dengan aktivitas operasi siber/penipuan.';
    if (['apartments', 'industrial'].includes(type)) return 'Indikasi Area Tertutup ⚠️: Potensi operasi terselubung dan penyekapan.';
    if (['police'].includes(type)) return 'Titik Evakuasi Utama 🛡️: Otoritas lokal terdekat untuk prosedur penyelamatan dan pelaporan.';
    if (['ferry_terminal', 'bus_station', 'aerodrome', 'airport'].includes(type)) return 'Caution: Monitor this transit point before departure. Potential high-risk corridor.';
    if (['residential', 'house'].includes(type)) return 'Area Permukiman: Rentan eksploitasi dan perekrutan ilegal.';
    
    if (mode === 'transit' && props.highway) return 'Jalur Logistik/Transit: Rute pergerakan potensial.';
    if (mode === 'escape' && props.highway) return 'Rute Evakuasi Terdekat: Jalur darat menuju Safe Zone.';
    return 'Pemantauan area umum.';
  };

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <MapContainer 
        center={[10.627, 103.522]} 
        zoom={13} 
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={getFeatureStyle}
            pointToLayer={pointToLayer as any}
            onEachFeature={(feature, layer) => {
              if (feature.properties) {
                const props = feature.properties;
                const insight = getInsightText(props, mode);
                const name = props.name || 'SIVA Target Object';
                
                // Address construction
                let address = props.addr_street || '';
                if (props.addr_housenumber) address = props.addr_housenumber + ' ' + address;
                
                // Fallback address
                if (!address || address.trim() === '') {
                  const region = props.place || props.suburb || props.city;
                  if (region) {
                    address = region;
                  } else {
                    try {
                      const center = turf.center(feature);
                      const [lng, lat] = center.geometry.coordinates;
                      address = `Koordinat: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                    } catch (e) {
                      address = 'Sihanoukville Area';
                    }
                  }
                }

                // Khmer detection
                let khmerNote = '';
                if (hasKhmerChars(name) || hasKhmerChars(address)) {
                  khmerNote = '<span class="text-[10px] bg-amber-100 text-amber-800 px-1 py-0.5 rounded ml-2 border border-amber-300" title="Phonetic transcription unavailable without NLP API">Khmer Script Detected</span>';
                }

                layer.bindPopup(`
                  <div class="p-2 max-w-xs">
                    <h3 class="font-bold border-b pb-1 mb-2 text-gray-800 flex items-center justify-between">
                      <span>${name}</span>
                      ${khmerNote}
                    </h3>
                    <p class="text-xs mb-1 text-gray-600"><span class="font-semibold">Alamat:</span> ${address}</p>
                    <p class="text-xs mb-1 text-gray-600"><span class="font-semibold">Tipe:</span> ${props.amenity || props.building || props.highway || 'N/A'}</p>
                    <div class="mt-2 bg-gray-50 p-2 rounded border-l-4 border-indigo-600 shadow-sm">
                      <p class="text-[10px] font-bold text-indigo-700 uppercase mb-1">SIVA Intelligence Insight</p>
                      <p class="text-xs text-gray-800 leading-relaxed font-medium">${insight}</p>
                    </div>
                  </div>
                `);
              }
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}