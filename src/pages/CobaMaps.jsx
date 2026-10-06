import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaMap,
  FaWaze,
  FaCar,
  FaWheelchair,
  FaPlane,
  FaMasksTheater,
  FaDiamond,
  FaCompass,
  FaArrowLeft,
  FaExpand,
  FaPlus,
  FaMinus,
  FaRotateRight
} from "react-icons/fa6";

export default function CobaMaps() {
  // "google" (Google Maps Tiles via Leaflet - 100% Locked Pin) | "satellite" | "embed"
  const [mapType, setMapType] = useState("google");
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);

  // Koordinat Akurat PRPP Grand Maerakaca Semarang
  const PRPP_COORDS = [-6.9588, 110.3884];

  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=PRPP+Semarang,+Jalan+Anjasmoro+Raya,+Tawangsari,+Semarang";
  const wazeUrl = "https://waze.com/ul?q=PRPP%20Semarang&navigate=yes";

  // Inisialisasi Peta Leaflet dengan Tile Google Maps Resmi
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
          scrollWheelZoom: false, // Tidak mengganggu scroll halaman
          attributionControl: false
        });

        // Tile Google Maps Asli (Jalan)
        const tileUrl = mapType === "satellite"
          ? "https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          : "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";

        const layer = L.tileLayer(tileUrl, {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"]
        }).addTo(map);

        tileLayerRef.current = layer;

        // Custom HTML Marker Persis Desain Figma
        const markerHtml = `
          <div class="flex flex-col items-center select-none" style="transform: translate(-50%, -100%);">
            <!-- Badge Kapsul Oranye-Kuning -->
            <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center gap-2 bg-[#f3a436] hover:bg-[#e09228] border-[3px] border-[#381e28] rounded-full px-4 py-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
               style="text-decoration: none;">
              <span class="w-2.5 h-2.5 rounded-full bg-[#8c161c] border border-[#4a0a0d] shrink-0" style="display:inline-block; width:10px; height:10px; border-radius:9999px; background:#8c161c;"></span>
              <span style="font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:12px; letter-spacing:0.05em; color:#24131a; text-transform:uppercase; white-space:nowrap;">
                PRPP GRAND MAERAKACA (VENUE)
              </span>
            </a>

            <!-- Lingkaran Teal Ikon Teater -->
            <div style="margin-top:4px; width:38px; height:38px; border-radius:9999px; background:#204e4c; border:2px solid #ffffff; box-shadow:0 10px 25px rgba(0,0,0,0.5); display:flex; align-items:center; justify-center:center; outline:2px solid #381e28; display:flex; justify-content:center; align-items:center;">
              <svg style="width:20px; height:20px; fill:#e5f3ee;" viewBox="0 0 512 512">
                <path d="M160 0c17.7 0 32 14.3 32 32V64H320V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h64c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h64V32c0-17.7 14.3-32 32-32zM80 192a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm256 48a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM144 328c-13.3 0-24 10.7-24 24c0 48.6 39.4 88 88 88h96c48.6 0 88-39.4 88-88c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 22.1-17.9 40-40 40H208c-22.1 0-40-17.9-40-40c0-13.3-10.7-24-24-24z"/>
              </svg>
            </div>

            <!-- Panah Ujung Pin -->
            <div style="width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent; border-top:8px solid #204e4c; margin-top:-1px;"></div>
          </div>
        `;

        const venueIcon = L.divIcon({
          html: markerHtml,
          className: "leaflet-prpp-venue-pin",
          iconSize: [0, 0],
          iconAnchor: [0, 0]
        });

        L.marker(PRPP_COORDS, { icon: venueIcon }).addTo(map);

        mapInstanceRef.current = map;
      } catch (err) {
        console.error("Gagal inisialisasi Leaflet map:", err);
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

  // Update Tipe Tile (Google Peta Jalan vs Google Satelit)
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const tileUrl = mapType === "satellite"
      ? "https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
      : "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
    tileLayerRef.current.setUrl(tileUrl);
  }, [mapType]);

  // Kontrol Zoom Peta
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetCenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(PRPP_COORDS, 15, { animate: true });
    }
  };

  return (
    <>
      <Helmet>
        <title>Lokasi & Panduan Akses Menuju PRPP Semarang | Soirée Dansante</title>
        <meta name="description" content="Denah venue dan panduan akses transportasi menuju PRPP Semarang untuk event Soirée Dansante." />
      </Helmet>

      {/* Main Section Background with exact dark cyan-teal tone */}
      <div className="min-h-screen bg-hijau-butek text-white font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#f3a436] selection:text-[#2b1720]">
        
        {/* Navigation Bar / Top Bar */}
        <header className="border-b border-white/10 bg-[#244244]/90 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-[#f3a436]" />
            <span>Kembali ke Beranda</span>
          </Link>
          
          <div className="flex items-center gap-2.5">
            <span className="text-xs bg-white/10 border border-white/15 px-3 py-1 rounded-full text-white/70 hidden sm:inline-block">
              Halaman: <strong className="text-white">/cobamaps</strong>
            </span>
            <div className="inline-flex items-center bg-[#1e3839] border border-white/15 rounded-full p-1 text-xs">
              <button
                onClick={() => setMapType("google")}
                className={`px-3 py-1 rounded-full font-bold transition ${
                  mapType === "google"
                    ? "bg-[#f3a436] text-[#241712] shadow"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Google Maps
              </button>
              <button
                onClick={() => setMapType("satellite")}
                className={`px-3 py-1 rounded-full font-bold transition ${
                  mapType === "satellite"
                    ? "bg-[#f3a436] text-[#241712] shadow"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Satelit
              </button>
            </div>
          </div>
        </header>

        {/* Section Container matching the exact screenshot */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 space-y-8">
          
          {/* Header Area */}
          <div className="space-y-4">
            
            {/* Top Pill Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border-2 border-[#381e26] bg-[#fbf5eb] text-[#381e26] shadow-sm">
                <FaDiamond className="text-[10px] text-[#381e26]" />
                <span className="text-[11px] font-extrabold tracking-wider uppercase">
                  Denah Venue & Rute Kedatangan
                </span>
              </div>
            </div>

            {/* Main Headline in Fraunces Serif */}
            <h1 className="font-['Fraunces',serif] text-3xl sm:text-5xl md:text-[52px] lg:text-[58px] font-bold text-[#faf5ee] tracking-tight leading-[1.15]">
              Lokasi & Panduan Akses
              <br className="hidden sm:inline" />
              {" "}Menuju PRPP Semarang
            </h1>

            {/* Subtitle & Buttons Flex Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1">
              <p className="text-[#bdd2d4] text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                Kawasan PRPP Grand Maerakaca terletak strategis di pesisir barat Kota Semarang, berhawa sejuk pesisir, hanya 10 menit dari Bandara Jenderal Ahmad Yani dan 15 menit dari Stasiun Poncol / Tawang.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#f3a436] hover:bg-[#e29324] text-[#241712] font-black text-xs sm:text-sm tracking-wider uppercase border-2 border-[#2b1b20] shadow-[0_2px_0_#2b1b20] active:translate-y-0.5 transition cursor-pointer"
                >
                  <FaMap className="text-sm text-[#241712]" />
                  <span>Buka di Google Maps</span>
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#fbf5eb] hover:bg-white text-[#381e26] font-black text-xs sm:text-sm tracking-wider uppercase border-2 border-[#381e26] shadow-[0_2px_0_#381e26] active:translate-y-0.5 transition cursor-pointer"
                >
                  <FaWaze className="text-base text-[#381e26]" />
                  <span>Petunjuk Arah Waze</span>
                </a>
              </div>
            </div>

          </div>

          {/* Map Frame Container with Real Google Maps & 100% Locked Accurate Pin */}
          <div className="relative w-full rounded-2xl md:rounded-[32px] overflow-hidden border-[3px] border-[#25151c] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] bg-[#1e3839]">
            
            {/* 1. Leaflet Container with Official Google Maps Tiles */}
            <div 
              ref={mapContainerRef} 
              className="relative w-full h-[520px] sm:h-[600px] lg:h-[650px] z-10"
              style={{ background: "#c5ded4" }}
            ></div>

            {/* 2. Floating UI Elements Overlay on Top of the Map */}
            <div className="absolute inset-0 pointer-events-none z-30 p-4 sm:p-6 flex flex-col justify-between">
              
              {/* Top Row: Floating Info Card (Panggung Setiap Suara) & Map Controls */}
              <div className="flex items-start justify-between gap-3">
                {/* Floating Card: Panggung Setiap Suara */}
                <div className="pointer-events-auto max-w-[270px] sm:max-w-xs bg-[#fbf5eb] border-2 border-[#381e26] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-2xl transition hover:scale-[1.02]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#966b26] text-base">
                      <FaMasksTheater />
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1f423f] text-sm sm:text-base leading-tight">
                      Panggung Setiap Suara
                    </h3>
                  </div>
                  <p className="text-[#5a4843] text-[11px] sm:text-xs leading-relaxed mt-2 font-medium">
                    Pintu gerbang penonton dibuka mulai pukul 13:00 WIB. Jalur penukaran tiket terletak di Hall Sumbing & Sindoro.
                  </p>
                </div>

                {/* Floating Map Zoom & Center Controls */}
                <div className="pointer-events-auto flex flex-col gap-1.5 bg-[#fbf5eb] border-2 border-[#381e26] rounded-xl p-1 shadow-2xl">
                  <button
                    onClick={handleZoomIn}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2b1720] hover:bg-[#f3a436] transition font-bold"
                    title="Perbesar Peta"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2b1720] hover:bg-[#f3a436] transition font-bold"
                    title="Perkecil Peta"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <button
                    onClick={handleResetCenter}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2b1720] hover:bg-[#f3a436] transition"
                    title="Pusatkan Kembali ke PRPP"
                  >
                    <FaRotateRight className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Bottom Row: 3 Floating Badges (Drop-Off Ojol, Parkir, Kursi Roda) */}
              <div className="pointer-events-auto flex flex-wrap items-center gap-2.5 pt-4">
                
                {/* Badge 1: Drop-Off Ojol */}
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border-2 border-[#381e26] bg-[#fbf5eb] text-[#381e26] text-[11px] sm:text-xs font-bold shadow-xl hover:bg-white hover:scale-105 transition cursor-default">
                  <FaCar className="text-[#381e26] text-xs" />
                  <span>Drop-Off Ojol: Jl. Anjasmoro Raya</span>
                </div>

                {/* Badge 2: Parkir Resmi */}
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border-2 border-[#381e26] bg-[#fbf5eb] text-[#381e26] text-[11px] sm:text-xs font-bold shadow-xl hover:bg-white hover:scale-105 transition cursor-default">
                  <span className="w-4 h-4 rounded bg-[#381e26] text-[#fbf5eb] font-black text-[10px] flex items-center justify-center">
                    P
                  </span>
                  <span>Parkir Resmi: Lapangan Depan PRPP</span>
                </div>

                {/* Badge 3: Jalur Kursi Roda */}
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border-2 border-[#381e26] bg-[#fbf5eb] text-[#381e26] text-[11px] sm:text-xs font-bold shadow-xl hover:bg-white hover:scale-105 transition cursor-default">
                  <FaWheelchair className="text-[#e11d48] text-xs" />
                  <span>Jalur Kursi Roda: Gerbang Selatan</span>
                </div>

                {/* Direct Google Maps Fullscreen Link */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border-2 border-[#2b1b20] bg-[#f3a436] text-[#241712] text-xs font-black shadow-xl hover:bg-[#e09228] transition ml-auto"
                  title="Buka rute navigasi di Google Maps"
                >
                  <FaExpand className="text-xs" />
                  <span>Navigasi GPS</span>
                </a>

              </div>

            </div>

          </div>

          {/* Quick Info Cards Below */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            
            <div className="bg-[#244547] border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#f3a436] font-bold text-sm">
                <FaCar className="text-base" />
                <span>Kendaraan Pribadi</span>
              </div>
              <p className="text-xs text-[#bdd2d4] leading-relaxed">
                Akses mudah via Jl. Madukoro Raya atau Jl. Arteri Yos Sudarso menuju Jl. Anjasmoro. Tersedia kantong parkir motor & mobil luas di Lapangan PRPP.
              </p>
            </div>

            <div className="bg-[#244547] border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#f3a436] font-bold text-sm">
                <FaPlane className="text-base" />
                <span>Dari Luar Kota / Bandara</span>
              </div>
              <p className="text-xs text-[#bdd2d4] leading-relaxed">
                Hanya 10 menit (4,5 km) dari Bandara Internasional Jenderal Ahmad Yani dan 15 menit dari Stasiun Semarang Poncol & Stasiun Tawang.
              </p>
            </div>

            <div className="bg-[#244547] border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#f3a436] font-bold text-sm">
                <FaCompass className="text-base" />
                <span>Titik Kumpul & Drop-Off</span>
              </div>
              <p className="text-xs text-[#bdd2d4] leading-relaxed">
                Titik penjemputan & drop-off ojek online dipusatkan di Jl. Anjasmoro Raya depan Gerbang Barat agar terhindar dari kemacetan jalur masuk utama.
              </p>
            </div>

          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-6 text-center text-xs text-white/50">
          <p>© 2026 Soirée Dansante • PRPP Grand Maerakaca Semarang</p>
        </footer>

      </div>
    </>
  );
}
