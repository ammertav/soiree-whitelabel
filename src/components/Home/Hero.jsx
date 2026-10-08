import { Link } from "react-router-dom";
import {
  LuCalendar,
  LuMapPin,
  LuZap,
  LuTicket,
  LuCompass,
  LuMusic,
  LuUsers,
  LuVolume2,
} from "react-icons/lu";
import SectionDivider from "../SectionDivider";

// Aset resmi Soirée Dansante sesuai panduan arsitektur
import mainStageMockup from "../../assets/soiree-dansante-assets/mockup/main-stage-mockup.png";
import wordmarkLogo from "../../assets/soiree-dansante-assets/logo/wordmark-stacked-887x444.png";
import wingedCat from "../../assets/soiree-dansante-assets/objects/08-kucing-bersayap.png";
import toastingCats from "../../assets/soiree-dansante-assets/objects/04-bersulang.png";

// Single Source of Truth data Hero
const HERO_DATA = {
  presaleBadge: "PRESALE TIKET SEDANG DIBUKA • Menuju April 2027",
  manifestoLabel: "MANIFESTO FESTIVAL RESMI",
  title: "Panggung Setiap Suara",
  tagline: "“Setiap suara punya tempat.”",
  description:
    "Dua hari perayaan teatrikal akbar di PRPP Semarang menyatukan denyut musik alternatif, tari topeng pesisir, serta 60 kurasi musisi independen Jawa Tengah dan panggung nasional.",
  pills: [
    {
      id: "date",
      icon: LuCalendar,
      text: "16–17 APRIL 2027",
      variant: "cream",
    },
    {
      id: "venue",
      icon: LuMapPin,
      text: "PRPP SEMARANG",
      variant: "cream",
    },
    {
      id: "stages",
      icon: LuZap,
      text: "4 PANGGUNG SPEKTAKULER",
      variant: "purple",
    },
  ],
  ctaTicket: {
    text: "AMANKAN TIKETMU",
    to: "/roadmap",
  },
  ctaLineup: {
    text: "JELAJAHI LINEUP & ROADMAP",
    to: "/lineup",
  },
  stats: [
    { id: "musicians", icon: LuMusic, text: "60 Musisi Terpilih" },
    { id: "audience", icon: LuUsers, text: "15.000 Kawan Dansa" },
    { id: "sound", icon: LuVolume2, text: "Tata Suara 100k Watt" },
  ],
};

export default function Hero() {
  return (
    <section className="relative w-full bg-hijau-butek overflow-hidden" aria-label="Hero Soirée Dansante">
      {/* Background Gambar Panggung Festival (main-stage-mockup.png) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={mainStageMockup}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center select-none"
        />
        {/* Lapisan Warna Hijau Butek agar Selaras Palet Tema */}
        <div className="absolute inset-0 bg-hijau-butek/75 mix-blend-multiply" />
        {/* Lapisan Gradient Gelap untuk Mempertahankan Kontras Teks */}
        <div className="absolute inset-0 bg-gradient-to-b from-hijau-butek/85 via-hijau-butek/75 to-hijau-butek/95" />
      </div>

      {/* Ornamen Sparkle Kiri Atas */}
      <span
        className="absolute top-8 left-4 sm:left-8 md:left-14 text-kuning-tua text-xl sm:text-2xl select-none pointer-events-none z-20"
        aria-hidden="true"
      >
        ✦
      </span>

      {/* Ornamen Kucing Bersayap Kanan Atas */}
      <div className="absolute top-4 sm:top-6 right-3 sm:right-6 md:right-12 z-20 pointer-events-none select-none">
        <img
          src={wingedCat}
          alt=""
          aria-hidden="true"
          className="w-14 sm:w-20 md:w-24 lg:w-28 object-contain drop-shadow-md"
        />
      </div>

      {/* Ornamen Pasangan Kucing Bersulang Kiri Bawah */}
      <div className="hidden sm:block absolute bottom-12 sm:bottom-16 left-3 sm:left-6 md:left-10 lg:left-14 z-20 pointer-events-none select-none">
        <img
          src={toastingCats}
          alt=""
          aria-hidden="true"
          className="w-16 sm:w-20 md:w-24 lg:w-28 object-contain drop-shadow-lg"
        />
      </div>

      {/* Ornamen Bintang Pink Kanan Bawah */}
      <span
        className="absolute bottom-12 sm:bottom-16 right-4 sm:right-8 md:right-14 text-pink-custom text-xl sm:text-2xl select-none pointer-events-none z-20"
        aria-hidden="true"
      >
        ★
      </span>

      {/* Container Konten Utama Terpusat */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-14 pb-8 sm:pb-12 flex flex-col items-center text-center">
        {/* Pill Presale Teratas */}
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full bg-ungu-heading/90 border border-kuning-tua/60 shadow-[2px_2px_0_var(--color-ungu-heading)] text-kuning-muda font-dm-sans font-bold text-xs sm:text-[13px] tracking-wide mb-5 select-none">
          <span>{HERO_DATA.presaleBadge}</span>
        </div>

        {/* Logo Wordmark Utama */}
        <div className="mb-3 sm:mb-4">
          <img
            src={wordmarkLogo}
            alt="Soirée Dansante"
            className="w-64 sm:w-80 md:w-[400px] lg:w-[450px] max-w-full h-auto object-contain select-none transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Manifesto Divider Bar */}
        <div className="flex items-center justify-center gap-3 mb-3 select-none" aria-hidden="true">
          <span className="h-px w-6 sm:w-10 bg-kuning-tua/60" />
          <span className="font-dm-sans font-black text-[11px] sm:text-xs text-cream-tengah tracking-[0.22em] uppercase">
            {HERO_DATA.manifestoLabel}
          </span>
          <span className="h-px w-6 sm:w-10 bg-kuning-tua/60" />
        </div>

        {/* Headline Utama */}
        <h1 className="font-fraunces font-black text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-kuning-tua tracking-tight leading-[1.1] mb-2 [text-shadow:3px_3px_0_var(--color-ungu-heading)]">
          {HERO_DATA.title}
        </h1>

        {/* Tagline Filosofi */}
        <p className="font-fraunces italic font-medium text-lg sm:text-xl md:text-2xl text-cream-terang mb-3 sm:mb-4">
          {HERO_DATA.tagline}
        </p>

        {/* Paragraf Deskripsi */}
        <p className="max-w-2xl font-dm-sans text-xs sm:text-sm md:text-base text-cream-tua/90 font-normal leading-relaxed mb-6 sm:mb-7">
          {HERO_DATA.description}
        </p>

        {/* 3 Pills Info Festival */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-3.5 mb-6 sm:mb-8">
          {HERO_DATA.pills.map((pill) => {
            const Icon = pill.icon;
            const isPurple = pill.variant === "purple";
            return (
              <div
                key={pill.id}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 text-xs sm:text-[13px] font-dm-sans font-black tracking-wider uppercase shadow-[2px_2px_0_var(--color-ungu-heading)] select-none ${
                  isPurple
                    ? "bg-ungu-heading border-kuning-tua text-kuning-muda"
                    : "bg-cream-terang border-ungu-heading text-ungu-heading"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0 stroke-[2.2]" aria-hidden="true" />
                <span>{pill.text}</span>
              </div>
            );
          })}
        </div>

        {/* Barisan Tombol CTA Aksi */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mb-7 sm:mb-8">
          <Link
            to={HERO_DATA.ctaTicket.to}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-kuning-tua border-2 border-ungu-heading text-ungu-heading font-dm-sans font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_3px_0_var(--color-ungu-heading)] hover:bg-kuning-muda hover:scale-[1.02] active:scale-95 transition-all select-none"
          >
            <LuTicket className="w-4.5 h-4.5 shrink-0 stroke-[2.5]" aria-hidden="true" />
            <span>{HERO_DATA.ctaTicket.text}</span>
          </Link>

          <Link
            to={HERO_DATA.ctaLineup.to}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-ungu-heading/90 border-2 border-kuning-tua text-kuning-muda font-dm-sans font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_3px_0_var(--color-ungu-heading)] hover:bg-ungu-heading hover:scale-[1.02] active:scale-95 transition-all select-none"
          >
            <LuCompass className="w-4.5 h-4.5 shrink-0 stroke-[2.5]" aria-hidden="true" />
            <span>{HERO_DATA.ctaLineup.text}</span>
          </Link>
        </div>

        {/* Strip Highlight Statistik Festival */}
        <div className="w-full max-w-2xl bg-ungu-heading/85 border border-kuning-tua/50 rounded-2xl sm:rounded-full px-5 sm:px-7 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.25)] flex flex-col sm:flex-row items-center justify-around sm:justify-between text-xs sm:text-[13px] font-dm-sans font-bold text-cream-tua gap-2.5 sm:gap-4 select-none">
          {HERO_DATA.stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-kuning-muda shrink-0 stroke-[2.2]" aria-hidden="true" />
                <span>{stat.text}</span>
                {idx < HERO_DATA.stats.length - 1 && (
                  <span className="hidden sm:inline-block ml-4 text-kuning-tua/50 select-none" aria-hidden="true">
                    •
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Titik Lampu Dekoratif Bawah */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-16 mt-6 sm:mt-8 select-none pointer-events-none" aria-hidden="true">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-kuning-tua/70 shadow-[0_0_8px_var(--color-kuning-tua)]" />
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-custom/70 shadow-[0_0_8px_var(--color-pink-custom)]" />
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-kuning-tua/70 shadow-[0_0_8px_var(--color-kuning-tua)]" />
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-custom/70 shadow-[0_0_8px_var(--color-pink-custom)]" />
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-kuning-tua/70 shadow-[0_0_8px_var(--color-kuning-tua)]" />
        </div>
      </div>

      {/* Pembatas Bawah Section Pita Catur */}
      <SectionDivider />
    </section>
  );
}
