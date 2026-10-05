import { LuGitFork } from "react-icons/lu";
import { HiArrowDown } from "react-icons/hi2";
import SectionDivider from "../SectionDivider";

// Data terpusat hero roadmap (Single Source of Truth)
const ROADMAP_HERO_DATA = {
  badgeText: "ROADMAP 2027",
  titleLine1: "Perjalanan Menuju Soirée",
  titleLine2: "Dansante",
  subtitle: "Satu rangkaian event, satu tujuan akhir.",
};

export default function RoadmapHero() {
  const handleScrollDown = () => {
    const nextSection = document.getElementById("roadmap-timeline");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-hijau-butek pt-12 pb-0 md:pt-16 overflow-hidden">
      {/* Elemen Ambient Background (Lingkaran Halus Kiri & Kanan Sesuai Desain) */}
      <div
        className="absolute top-6 -left-16 w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#46695e]/50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-24 -right-16 w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#46695e]/45 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Pill Badge ROADMAP 2027 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-terang border border-ungu-heading shadow-[2px_3px_0_var(--color-ungu-heading)] text-ungu-heading mb-6 sm:mb-8 select-none">
          <LuGitFork className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ungu-heading stroke-[2.5]" aria-hidden="true" />
          <span className="font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase text-ungu-heading">
            {ROADMAP_HERO_DATA.badgeText}
          </span>
        </div>

        {/* Judul Utama Hero */}
        <h1 className="font-fraunces font-black text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.12] text-kuning-tua tracking-tight mb-4 max-w-3xl">
          {ROADMAP_HERO_DATA.titleLine1}
          <br />
          {ROADMAP_HERO_DATA.titleLine2}
        </h1>

        {/* Subtitle */}
        <p className="font-dm-sans text-sm sm:text-base md:text-lg text-cream-tua font-normal mb-8 sm:mb-10">
          {ROADMAP_HERO_DATA.subtitle}
        </p>

        {/* Tombol Panah Bawah */}
        <button
          type="button"
          onClick={handleScrollDown}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-kuning-tua border-2 border-ungu-heading shadow-[2.5px_3px_0_var(--color-ungu-heading)] flex items-center justify-center text-ungu-heading hover:bg-kuning-muda hover:scale-105 active:scale-95 transition-all cursor-pointer mb-12 sm:mb-16"
          aria-label="Scroll ke bagian alur timeline roadmap"
        >
          <HiArrowDown className="w-5 h-5 text-ungu-heading stroke-[2.5]" aria-hidden="true" />
        </button>
      </div>

      {/* Pembatas Pita Bawah Vintage */}
      <SectionDivider />
    </section>
  );
}
