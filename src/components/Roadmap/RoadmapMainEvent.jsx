import { Link } from "react-router-dom";
import { LuLandmark, LuTicket } from "react-icons/lu";
import { BsMusicNoteList } from "react-icons/bs";
import SectionDivider from "../SectionDivider";

// Asset ilustrasi resmi Soirée Dansante
import catStageArtwork from "../../assets/soiree-dansante-assets/objects/01-panggung-kepala-kucing.png";
import wingedCatIllustration from "../../assets/soiree-dansante-assets/objects/08-kucing-bersayap.png";
import eyeStarOrnament from "../../assets/soiree-dansante-assets/objects/11-mata-bintang.png";

// Data terpusat Section 3 Event Utama (Single Source of Truth sesuai ARSITEKTUR.md)
const MAIN_EVENT_DATA = {
  badgeText: "EVENT UTAMA",
  title: "Soirée Dansante",
  dateVenue: "16–17 April 2027 · PRPP Grand Maerakaca, Semarang",
  featurePills: ["60 BAND", "2 HARI", "4 PANGGUNG", "SEMARANG"],
  quote: "“Setiap suara punya tempat.”",
  primaryCta: {
    labelLine1: "AMANKAN",
    labelLine2: "TIKETMU",
    to: "/pemesanan",
  },
  secondaryCta: {
    labelLine1: "LIHAT LINEUP",
    labelLine2: "LENGKAP",
    to: "/lineup",
  },
};

export default function RoadmapMainEvent() {
  return (
    <section
      id="roadmap-main-event"
      className="relative w-full bg-hijau-butek pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-0 overflow-hidden"
      aria-label="Informasi Puncak Event Utama Soirée Dansante"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Container Ilustrasi Atas: Kucing Bersayap di Tengah & Ornamen Mata Bintang Simetris di Kiri-Kanan */}
        <div className="relative w-full max-w-5xl flex flex-col items-center">
          {/* Ornamen Mata Bintang Sisi Kiri (Ukuran Diperbesar & Proporsional) */}
          <img
            src={eyeStarOrnament}
            alt=""
            aria-hidden="true"
            className="hidden sm:block absolute left-2 sm:left-6 md:left-12 lg:left-20 top-4 sm:top-6 w-16 sm:w-20 md:w-24 lg:w-28 object-contain select-none pointer-events-none"
          />

          {/* Ornamen Mata Bintang Sisi Kanan (Ukuran Diperbesar & Proporsional) */}
          <img
            src={eyeStarOrnament}
            alt=""
            aria-hidden="true"
            className="hidden sm:block absolute right-2 sm:right-6 md:right-12 lg:right-20 top-4 sm:top-6 w-16 sm:w-20 md:w-24 lg:w-28 object-contain select-none pointer-events-none"
          />

          {/* Kucing Bersayap Tengah (Diperbesar Melayang Tepat di Atas Card Panggung) */}
          <div className="relative z-20 mb-[-18px] sm:mb-[-24px] md:mb-[-30px]">
            <img
              src={wingedCatIllustration}
              alt="Ilustrasi Kucing Bersayap Soirée Dansante"
              className="w-56 sm:w-72 md:w-84 lg:w-96 max-w-[420px] object-contain mx-auto select-none pointer-events-none drop-shadow-md"
            />
          </div>

          {/* Card Utama Proscenium Panggung Kepala Kucing (Diperbesar Megah) */}
          <div className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-[28px] sm:rounded-[36px] shadow-[6px_6px_0_var(--color-ungu-heading)] sm:shadow-[8px_8px_0_var(--color-ungu-heading)] p-4 sm:p-6 md:p-7 flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
            <img
              src={catStageArtwork}
              alt="Panggung Kepala Kucing Soirée Dansante"
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Pill Badge EVENT UTAMA (Diperbesar) */}
        <div className="mt-8 sm:mt-10 inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-kuning-muda border border-ungu-heading shadow-[2.5px_2.5px_0_var(--color-ungu-heading)] text-ungu-heading select-none">
          <LuLandmark className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2] text-ungu-heading" aria-hidden="true" />
          <span className="font-dm-sans font-black text-xs sm:text-sm tracking-wider uppercase text-ungu-heading">
            {MAIN_EVENT_DATA.badgeText}
          </span>
        </div>

        {/* Judul Puncak Festival (Diperbesar Megah) */}
        <h2 className="mt-4 sm:mt-5 font-fraunces font-black text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-kuning-muda tracking-tight leading-none">
          {MAIN_EVENT_DATA.title}
        </h2>

        {/* Tanggal & Lokasi Venue (Diperbesar) */}
        <p className="mt-3 sm:mt-4 font-dm-sans font-bold text-sm sm:text-base md:text-lg text-cream-terang tracking-normal">
          {MAIN_EVENT_DATA.dateVenue}
        </p>

        {/* Barisan 4 Pills Fitur Festival (Diperbesar) */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {MAIN_EVENT_DATA.featurePills.map((pill) => (
            <span
              key={pill}
              className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-cream-terang border border-ungu-heading shadow-[2.5px_2.5px_0_var(--color-ungu-heading)] text-ungu-heading font-dm-sans font-black text-xs sm:text-sm tracking-wider uppercase select-none"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Kutipan Filosofi (Diperbesar) */}
        <blockquote className="mt-7 sm:mt-9 font-fraunces italic font-normal text-cream-terang text-lg sm:text-xl md:text-2xl lg:text-[26px] text-center tracking-wide max-w-2xl">
          {MAIN_EVENT_DATA.quote}
        </blockquote>

        {/* Tombol Aksi Ganda CTA (Diperbesar Mantap & Proporsional) */}
        <div className="mt-8 sm:mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full max-w-lg">
          {/* CTA Primer: Amankan Tiketmu */}
          <Link
            to={MAIN_EVENT_DATA.primaryCta.to}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 min-h-[52px] sm:min-h-[58px] rounded-full bg-kuning-muda hover:bg-kuning-tua text-ungu-heading border-2 border-ungu-heading shadow-[3.5px_3.5px_0_var(--color-ungu-heading)] sm:shadow-[4px_4px_0_var(--color-ungu-heading)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer select-none"
          >
            <LuTicket className="w-5 h-5 stroke-[2.2] text-ungu-heading shrink-0" aria-hidden="true" />
            <span className="font-dm-sans font-black text-xs sm:text-[13px] uppercase tracking-wider leading-[1.18] text-left">
              {MAIN_EVENT_DATA.primaryCta.labelLine1}
              <br />
              {MAIN_EVENT_DATA.primaryCta.labelLine2}
            </span>
          </Link>

          {/* CTA Sekunder: Lihat Lineup Lengkap */}
          <Link
            to={MAIN_EVENT_DATA.secondaryCta.to}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 min-h-[52px] sm:min-h-[58px] rounded-full bg-transparent hover:bg-dark-teal text-cream-terang border-2 border-cream-terang/80 hover:border-cream-terang transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer select-none"
          >
            <BsMusicNoteList className="w-5 h-5 text-cream-terang shrink-0" aria-hidden="true" />
            <span className="font-dm-sans font-bold text-xs sm:text-[13px] uppercase tracking-wider leading-[1.18] text-left">
              {MAIN_EVENT_DATA.secondaryCta.labelLine1}
              <br />
              {MAIN_EVENT_DATA.secondaryCta.labelLine2}
            </span>
          </Link>
        </div>
      </div>

      {/* Pembatas Pita Bawah Vintage Menuju Footer */}
      <SectionDivider className="mt-16 sm:mt-22 md:mt-28" />
    </section>
  );
}
