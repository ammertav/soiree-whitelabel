import { Link } from "react-router-dom";
import { HiSparkles, HiOutlineCalendarDays, HiOutlineMapPin } from "react-icons/hi2";
import SectionDivider from "../SectionDivider";
import logoSoiree from "../../assets/images/hero/logo-web.png";
import stageImage from "../../assets/images/hero/node-45.png";
import ornamenEye from "../../assets/images/hero/ornamen-mata-bintang-51.png";
import catProscenium from "../../assets/soiree-dansante-assets/objects/01-panggung-kepala-kucing.png";
import checkboardDivider from "../../assets/soiree-dansante-assets/divider/checkboard-divider.png";

// Konfigurasi data terpusat (Single Source of Truth)
const HERO_DATA = {
  badgeCategoryLines: ["PANGGUNG SETIAP", "SUARA"],
  badgeTaglineLines: ["setiap suara punya", "tempat"],
  titleLine1: "SOIRÉE",
  titleLine2: "DANSANTE",
  tagline: "“Setiap suara punya tempat.”",
  dates: "16–17 April 2027",
  dateLines: ["16–17 April", "2027"],
  venue: "PRPP Semarang",
  venueLines: ["PRPP", "Semarang"],
  artworkLabel: "Proscenium Teater Kucing Ajaib",
  ticketStatus: "Presale 1 kuota terbatas • Tiket resmi bergaransi",
  ctaText: "AMANKAN TIKETMU SEKARANG",
  ctaDesktopText: "AMANKAN TIKETMU",
  ctaLink: "/pemesanan",
  lineupText: "JELAJAHI LINEUP",
  lineupLink: "/lineup",
  festivalFact: "Festival Musik Outdoor 2 Hari • 4 Panggung • 60 Band",
};

export default function Hero() {
  return (
    <section className="relative w-full bg-hijau-butek overflow-hidden">
      {/* ========================================================
          1. TAMPILAN MOBILE (Persis Desain Screenshot Mobile)
          ======================================================== */}
      <div className="relative flex flex-col items-center text-center px-4 pt-6 pb-6 md:hidden overflow-hidden">
        {/* Soft Ambient Radial Lights (Sesuai Screenshot) */}
        <div className="absolute top-10 -left-16 w-52 h-52 bg-tosca-muda/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute top-32 -right-16 w-56 h-56 bg-kuning-tua/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute top-[320px] left-1/2 -translate-x-1/2 w-64 h-64 bg-[#4a635b]/30 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Pill Tagline Teratas */}
        <div className="font-dm-sans relative z-10 inline-flex items-center gap-3 px-5 sm:px-6 py-2.5 rounded-full bg-dark-teal shadow-[2.5px_3px_0_var(--color-ungu-heading)] mb-5">
          <HiSparkles className="w-4 h-4 text-kuning-muda shrink-0" aria-hidden="true" />
          <div className="flex flex-col text-center font-black text-kuning-muda tracking-wider uppercase text-[11px] leading-tight">
            <span>{HERO_DATA.badgeCategoryLines[0]}</span>
            <span>{HERO_DATA.badgeCategoryLines[1]}</span>
          </div>
          <span className="text-cream-tengah font-bold select-none">•</span>
          <div className="flex flex-col text-center italic text-cream-tengah text-xs sm:text-[13px] leading-tight">
            <span>{HERO_DATA.badgeTaglineLines[0]}</span>
            <span>{HERO_DATA.badgeTaglineLines[1]}</span>
          </div>
        </div>

        {/* Judul Hero Mobile: SOIRÉE (Kuning Emas) & DANSANTE (Krem Terang) */}
        <h1 className="relative z-10 font-fraunces font-black text-[42px] sm:text-5xl uppercase tracking-tight leading-[1.04] mb-6 text-center">
          <span className="block text-kuning-tua [text-shadow:3px_3px_0_var(--color-ungu-heading)]">
            {HERO_DATA.titleLine1}
          </span>
          <span className="block text-cream-terang [text-shadow:3px_3px_0_var(--color-ungu-heading)]">
            {HERO_DATA.titleLine2}
          </span>
        </h1>

        {/* Pill Info Waktu & Tempat (Background Ungu Heading + Shadow Kuning Muda di Bawah & Kanan) */}
        <div className="relative z-10 flex items-center justify-between px-6 py-2.5 rounded-full bg-ungu-heading shadow-[2.5px_3px_0_var(--color-kuning-muda)] text-cream-terang mb-6 w-full max-w-[340px]">
          {/* Kolom Kiri: Tanggal */}
          <div className="flex items-center gap-2.5 font-dm-sans">
            <HiOutlineCalendarDays className="w-5 h-5 text-kuning-muda shrink-0 stroke-[1.8]" aria-hidden="true" />
            <div className="text-center leading-tight">
              <span className="block text-xs sm:text-[13px] text-cream-terang font-extrabold tracking-wide">{HERO_DATA.dateLines[0]}</span>
              <span className="block text-xs sm:text-[13px] text-cream-terang font-extrabold tracking-wide">{HERO_DATA.dateLines[1]}</span>
            </div>
          </div>

          {/* Separator Tengah: Dot Pink & Pin Map Pink */}
          <div className="flex items-center gap-1.5 text-pink-custom">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-custom shrink-0 select-none" />
            <HiOutlineMapPin className="w-4 h-4 text-pink-custom shrink-0 stroke-[2]" aria-hidden="true" />
          </div>

          {/* Kolom Kanan: Tempat */}
          <div className="text-center leading-tight font-dm-sans">
            <span className="block text-xs sm:text-[13px] text-cream-terang font-extrabold tracking-wide">{HERO_DATA.venueLines[0]}</span>
            <span className="block text-xs sm:text-[13px] text-cream-terang font-extrabold tracking-wide">{HERO_DATA.venueLines[1]}</span>
          </div>
        </div>

        {/* Artwork Lingkaran Kucing & Badge Proscenium */}
        <div className="relative z-10 flex flex-col items-center mb-6">
          <div className="w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] rounded-full bg-[#46665c] border-[3px] border-ungu-heading p-3 flex items-center justify-center shadow-inner overflow-hidden">
            <img
              src={catProscenium}
              alt={HERO_DATA.artworkLabel}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Badge Proscenium Teater Kucing Ajaib */}
          <div className="-mt-3.5 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cream-terang border-2 border-ungu-heading text-ungu-heading text-xs font-dm-sans font-bold shadow-xs">
            <span>🎭</span>
            <span>{HERO_DATA.artworkLabel}</span>
          </div>
        </div>

        {/* Tombol CTA AMANKAN TIKETMU SEKARANG */}
        <Link
          to={HERO_DATA.ctaLink}
          className="relative z-10 w-full max-w-[340px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-kuning-tua border-2 border-ungu-heading text-ungu-heading font-dm-sans font-black text-sm uppercase tracking-wider shadow-[0_5px_0_var(--color-ungu-heading)] active:translate-y-1 active:shadow-[0_1px_0_var(--color-ungu-heading)] transition-all mb-3"
        >
          <svg className="w-5 h-4.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4h16a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V6a2 2 0 0 1 2-2zm8 3a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zm0 4a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zm0 4a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1z" />
          </svg>
          <span>{HERO_DATA.ctaText}</span>
        </Link>

        {/* Keterangan Status Presale */}
        <p className="relative z-10 font-dm-sans text-xs text-cream-tua/90 text-center tracking-wide mb-6">
          {HERO_DATA.ticketStatus}
        </p>
      </div>

      {/* ========================================================
          2. TAMPILAN DESKTOP (Layout 2 Kolom Yang Sudah Ada)
          ======================================================== */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-14 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Kolom Kiri: Branding, Headline, dan Tombol */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            <div className="mb-4 sm:mb-6">
              <img
                src={logoSoiree}
                alt="Soirée Dansante"
                className="w-72 sm:w-80 md:w-[380px] lg:w-[420px] max-w-full h-auto object-contain select-none transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            <h1 className="font-fraunces font-black text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight text-kuning-tua [text-shadow:3px_3px_0_var(--color-ungu-heading)]">
              Panggung Setiap<br />Suara
            </h1>

            <p className="font-fraunces italic font-medium text-lg sm:text-xl md:text-2xl text-cream-tua mt-3 sm:mt-4 mb-6 tracking-wide">
              {HERO_DATA.tagline}
            </p>

            <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-cream-tua border-2 border-ungu-heading shadow-sm mb-6 sm:mb-8">
              <span className="font-dm-sans font-black text-xs sm:text-sm text-ungu-heading tracking-wider uppercase">
                {HERO_DATA.dates} • {HERO_DATA.venue}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <Link
                to={HERO_DATA.ctaLink}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-kuning-tua border-2 border-ungu-heading text-ungu-heading font-dm-sans font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-kuning-muda hover:scale-[1.02] active:scale-95 transition-all shadow-[0_2px_0_var(--color-ungu-heading)]"
              >
                <span>{HERO_DATA.ctaDesktopText}</span>
              </Link>

              <Link
                to={HERO_DATA.lineupLink}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-transparent border-2 border-cream-tua text-cream-tua font-dm-sans font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-cream-tua/15 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>{HERO_DATA.lineupText}</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-cream-tua/90 tracking-wide font-medium">
              <svg className="w-3.5 h-3.5 text-kuning-muda shrink-0" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                <path d="M4 10.6667L6.66667 8.63333L9.33333 10.6667L8.33333 7.36667L11 5.46667H7.73333L6.66667 2L5.6 5.46667H2.33333L5 7.36667L4 10.6667Z" />
              </svg>
              <span>{HERO_DATA.festivalFact}</span>
            </div>
          </div>

          {/* Kolom Kanan: Card Showcase Stage & Ornamen */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden border-[3px] border-ungu-heading bg-ungu-heading shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
              <div className="relative w-full overflow-hidden block">
                <img
                  src={stageImage}
                  alt="Panggung Utama Soirée Dansante Semarang"
                  className="w-full h-auto object-cover block"
                />
                <div className="absolute bottom-0 inset-x-0 px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between bg-ungu-heading/80 backdrop-blur-[1.5px]">
                  <span className="font-dm-sans font-extrabold text-[11px] sm:text-xs tracking-wider text-cream-tua uppercase">
                    PANGGUNG UTAMA • CAT PROSCENIUM
                  </span>
                  <span className="font-dm-sans font-medium text-[11px] sm:text-xs text-cream-tua/90">
                    {HERO_DATA.venue}
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 z-20 pointer-events-none drop-shadow-xl select-none">
              <img src={ornamenEye} alt="Sacred Eye Ornament" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. PEMISAH SECTION BAWAH
          - Mobile : Checkboard Strip Divider (checkboard-divider.png)
          - Desktop: Section Divider SVG (SectionDivider)
          ======================================================== */}
      {/* Mobile Checkerboard Strip */}
      <div className="w-full block md:hidden leading-none select-none">
        <img
          src={checkboardDivider}
          alt="Checkerboard Divider"
          className="w-full h-auto block object-cover"
        />
      </div>

      {/* Desktop Divider */}
      <div className="hidden md:block">
        <SectionDivider />
      </div>
    </section>
  );
}
