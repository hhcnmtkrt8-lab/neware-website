"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon (Leaflet + Vite/Webpack asset issue)
import L from "leaflet";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ZHUOYUE_HUI_POSITION: LatLngExpression = [22.5698, 114.0601];

const ZHUOYUE_HUI_GOOGLE_MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=22.5698,114.0601";

interface Props {
  address?: string;
  addressEn?: string;
  isZh?: boolean;
}

function OfficeMapInner() {
  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -40],
    className: "neware-marker-icon",
  });

  return (
    <MapContainer
      center={ZHUOYUE_HUI_POSITION}
      zoom={15}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={ZHUOYUE_HUI_POSITION} icon={markerIcon}>
        <Popup className="neware-popup">
          <div className="p-1">
            <p className="font-bold text-sm text-slate-800">NEWARE</p>
            <p className="text-xs text-slate-500">Shenzhen Operation Hub</p>
            <p className="text-xs text-slate-400 mt-0.5">Zhuoyue Hui, Futian District</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export function OfficeMap({ address, addressEn, isZh }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !isLoaded) setIsLoaded(true);
  }, [isVisible, isLoaded]);

  return (
    <div className="space-y-3">
      {/* Lazy map container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl ring-1 ring-slate-900/10 neware-map-container"
        style={{ height: "220px", background: "#f1f5f9" }}
      >
        {/* Skeleton placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-100 animate-pulse z-10">
            <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="text-xs text-slate-400 font-medium">Loading map…</span>
          </div>
        )}

        {/* Map — only rendered when visible */}
        {isLoaded && (
          <div className="h-full w-full">
            <OfficeMapInner />
          </div>
        )}
      </div>

      {/* Address + Directions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-500 mb-0.5">
            {isZh ? "地址" : "Address"}
          </p>
          <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
            {isZh ? address : addressEn}
          </p>
        </div>
        <a
          href={ZHUOYUE_HUI_GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:scale-[1.02] whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
            boxShadow: "0 2px 8px rgba(37,99,235,0.28)",
          }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {isZh ? "导航" : "Directions"}
        </a>
      </div>
    </div>
  );
}
