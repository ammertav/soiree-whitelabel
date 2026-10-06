import { useEffect, useRef } from "react";
import { LuTent, LuCar, LuAccessibility } from "react-icons/lu";

// Koordinat resmi PRPP Grand Maerakaca Semarang
const PRPP_COORDS = [-6.9588, 110.3884];

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=PRPP+Semarang,+Jalan+Anjasmoro+Raya,+Tawangsari,+Semarang";

export default function VenueLeafletMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    let checkInterval = null;

    const initMap = () => {
      if (!window.L || !mapContainerRef.current || mapInstanceRef.current) return;

      try {
        const L = window.L;
        const map = L.map(mapContainerRef.current, {
          center: PRPP_COORDS,
          zoom: 15,
          zoomControl: false,
          scrollWheelZoom: false, // Mencegah scroll wheel mengganggu scroll halaman
          attributionControl: false,
        });

        // Tile Google Maps resmi
        const tileUrl = "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
        L.tileLayer(tileUrl, {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }).addTo(map);

        // Marker Venue PRPP Grand Maerakaca sesuai desain
        const markerHtml = `
          <div style="display:flex; flex-direction:column; align-items:center; user-select:none; transform: translate(-50%, -100%);">
            <a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener noreferrer" 
               style="display:inline-flex; align-items:center; gap:8px; background-color:#e6a92e; border:2.5px solid #4a2a47; border-radius:9999px; padding:6px 14px; box-shadow:0 6px 16px rgba(0,0,0,0.4); text-decoration:none; cursor:pointer;">
              <span style="display:inline-block; width:10px; height:10px; border-radius:9999px; background-color:#a82819; border:1px solid #4a2a47; flex-shrink:0;"></span>
              <span style="font-family:'DM Sans',sans-serif; font-weight:900; font-size:11px; letter-spacing:0.06em; color:#4a2a47; text-transform:uppercase; white-space:nowrap;">
                PRPP GRAND MAERAKACA (VENUE)
              </span>
            </a>
            <div style="margin-top:4px; width:36px; height:36px; border-radius:9999px; background-color:#1e6a62; border:2px solid #ffffff; box-shadow:0 8px 20px rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; outline:2px solid #4a2a47;">
              <svg style="width:18px; height:18px; fill:#faf2e1;" viewBox="0 0 512 512">
                <path d="M160 0c17.7 0 32 14.3 32 32V64H320V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h64c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h64V32c0-17.7 14.3-32 32-32zM80 192a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm256 48a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM144 328c-13.3 0-24 10.7-24 24c0 48.6 39.4 88 88 88h96c48.6 0 88-39.4 88-88c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 22.1-17.9 40-40 40H208c-22.1 0-40-17.9-40-40c0-13.3-10.7-24-24-24z"/>
              </svg>
            </div>
            <div style="width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent; border-top:8px solid #1e6a62; margin-top:-1px;"></div>
          </div>
        `;

        const venueIcon = L.divIcon({
          html: markerHtml,
          className: "leaflet-prpp-venue-pin",
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        L.marker(PRPP_COORDS, { icon: venueIcon }).addTo(map);

        mapInstanceRef.current = map;
      } catch (err) {
        console.error("Gagal inisialisasi peta Leaflet:", err);
      }
    };

    if (window.L) {
      initMap();
    } else {
      checkInterval = setInterval(() => {
        if (window.L) {
          clearInterval(checkInterval);
          initMap();
        }
      }, 100);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full rounded-3xl border-2 sm:border-[2.5px] border-ungu-heading overflow-hidden shadow-[5px_6px_0_var(--color-ungu-heading)] h-[400px] sm:h-[460px] md:h-[520px] bg-tosca-butek">
      {/* Wadah Peta Leaflet */}
      <div ref={mapContainerRef} className="w-full h-full z-0" tabIndex={0} aria-label="Peta Lokasi PRPP Semarang" />

      {/* Floating Info Box: Panggung Setiap Suara */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 max-w-[280px] sm:max-w-[320px] bg-cream-terang border-2 border-ungu-heading rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0_var(--color-ungu-heading)] select-none">
        <div className="flex items-center gap-2 text-ungu-heading">
          <LuTent className="w-5 h-5 stroke-[2.3] text-ungu-heading shrink-0" aria-hidden="true" />
          <h3 className="font-fraunces font-black text-base sm:text-lg text-ungu-heading leading-tight">
            Panggung Setiap Suara
          </h3>
        </div>
        <p className="font-dm-sans text-xs sm:text-[13px] text-gray-custom leading-relaxed mt-2">
          Pintu gerbang penonton dibuka mulai pukul 13:00 WIB. Jalur penukaran tiket terletak di Hall Sumbing & Sindoro.
        </p>
      </div>

      {/* Floating Pills Bar Bawah: Drop-Off, Parkir, Kursi Roda */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto z-10 flex flex-wrap items-center gap-2 sm:gap-2.5 select-none pointer-events-auto">
        {/* Pill 1: Drop-Off Ojol */}
        <div className="inline-flex items-center gap-2 bg-cream-terang border-2 border-ungu-heading rounded-full px-3.5 py-1.5 font-dm-sans font-bold text-xs sm:text-[12px] text-ungu-heading shadow-2xs">
          <LuCar className="w-4 h-4 stroke-[2.3] shrink-0" aria-hidden="true" />
          <span>Drop-Off Ojol: Jl. Anjasmoro Raya</span>
        </div>

        {/* Pill 2: Parkir Resmi */}
        <div className="inline-flex items-center gap-2 bg-cream-terang border-2 border-ungu-heading rounded-full px-3.5 py-1.5 font-dm-sans font-bold text-xs sm:text-[12px] text-ungu-heading shadow-2xs">
          <span className="w-4 h-4 rounded-full bg-ungu-heading text-cream-terang flex items-center justify-center font-black text-[10px] leading-none shrink-0" aria-hidden="true">
            P
          </span>
          <span>Parkir Resmi: Lapangan Depan PRPP</span>
        </div>

        {/* Pill 3: Jalur Kursi Roda */}
        <div className="inline-flex items-center gap-2 bg-cream-terang border-2 border-ungu-heading rounded-full px-3.5 py-1.5 font-dm-sans font-bold text-xs sm:text-[12px] text-ungu-heading shadow-2xs">
          <LuAccessibility className="w-4 h-4 stroke-[2.3] shrink-0" aria-hidden="true" />
          <span>Jalur Kursi Roda: Gerbang Selatan</span>
        </div>
      </div>
    </div>
  );
}
