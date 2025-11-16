'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const categoryColors: Record<string, string> = {
  legacy: "#1f77b4",
  major: "#ff7f0e",
  regional: "#2ca02c",
  cargo: "#d62728",
  fractional: "#9467bd",
  charter: "#8c564b",
  international: "#e377c2"
};

export default function DomicileMap() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/data/domiciles.json')
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <MapContainer center={[39.5, -98.35]} zoom={4} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {data.map((airport: any) => {
        const mainCat = airport.airlines[0]?.category || 'regional';
        const color = categoryColors[mainCat] || "#777";

        const icon = L.divIcon({
          html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(0,0,0,0.6);"></div>`,
          className: '',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        return (
          <Marker key={airport.iata} position={[airport.lat, airport.lon]} icon={icon}>
            <Popup>
              <strong>{airport.iata} – {airport.city}, {airport.state}</strong><br /><br />
              {airport.airlines.map((a: any) => (
                <div key={a.name}>• {a.name} <em style={{color:#666}}>({a.category})</em></div>
              ))}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
