import { FaDiamond, FaWaze } from "react-icons/fa6";
import { LuMap } from "react-icons/lu";
import VenueLeafletMap from "./components/VenueLeafletMap";
import TransportGuideCards from "./components/TransportGuideCards";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=PRPP+Semarang,+Jalan+Anjasmoro+Raya,+Tawangsari,+Semarang";

const WAZE_URL = "https://waze.com/ul?q=PRPP%20Semarang&navigate=yes";

export default function ContactMapSection() {
  return (
    <section
      id="contact-map-section"
      className="w-full bg-hijau-butek py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 text-cream-terang"
      aria-label="Lokasi dan Panduan Akses Menuju PRPP Semarang"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div>
            {/* Badge Denah Venue */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-ungu-heading bg-cream-terang text-ungu-heading select-none mb-4 sm:mb-5 shadow-2xs">
              <FaDiamond className="w-2.5 h-2.5 text-ungu-heading shrink-0" aria-hidden="true" />
              <span className="font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase">
                DENAH VENUE & RUTE KEDATANGAN
              </span>
            </div>

            {/* Judul Utama */}
            <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-cream-terang leading-[1.08] tracking-tight mb-4">
              Lokasi & Panduan Akses <br />
              Menuju PRPP Semarang
            </h2>

            {/* Deskripsi Lokasi */}
            <p className="font-dm-sans font-normal text-sm sm:text-base text-cream-terang/90 max-w-2xl leading-relaxed">
              Kawasan PRPP Grand Maerakaca terletak strategis di pesisir barat Kota Semarang,
              berhawa sejuk pesisir, hanya 10 menit dari Bandara Jenderal Ahmad Yani dan 15 menit
              dari Stasiun Poncol / Tawang.
            </p>
          </div>

          {/* Tombol Navigasi Cepat (Google Maps & Waze) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-kuning-tua hover:bg-kuning-muda active:translate-x-0.5 active:translate-y-0.5 text-ungu-heading border-2 border-ungu-heading rounded-full px-5 sm:px-6 py-3 font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase shadow-[3px_3px_0_var(--color-ungu-heading)] transition-all cursor-pointer select-none"
            >
              <LuMap className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              <span>BUKA DI GOOGLE MAPS</span>
            </a>

            <a
              href={WAZE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-cream-terang hover:bg-white active:translate-x-0.5 active:translate-y-0.5 text-ungu-heading border-2 border-ungu-heading rounded-full px-5 sm:px-6 py-3 font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase shadow-[3px_3px_0_var(--color-ungu-heading)] transition-all cursor-pointer select-none"
            >
              <FaWaze className="w-4 h-4 text-ungu-heading shrink-0" aria-hidden="true" />
              <span>PETUNJUK ARAH WAZE</span>
            </a>
          </div>
        </div>

        {/* Peta Leaflet Asli PRPP Semarang */}
        <div className="mb-8 sm:mb-10">
          <VenueLeafletMap />
        </div>

        {/* 3 Kartu Panduan Akses Transportasi */}
        <TransportGuideCards />
      </div>
    </section>
  );
}
