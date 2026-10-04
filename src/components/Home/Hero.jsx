import { Link } from "react-router-dom";
import SectionDivider from "../SectionDivider";
import logoSoiree from "../../assets/images/hero/logo-web.png";
import stageImage from "../../assets/images/hero/node-45.png";
import ornamenEye from "../../assets/images/hero/ornamen-mata-bintang-51.png";

export default function Hero() {
  return (
    <section className="relative w-full bg-hijau-butek overflow-hidden">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-14 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Branding, Title, and CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            {/* Retro Illustrated Soirée Dansante Logo */}
            <div className="mb-4 sm:mb-6">
              <img
                src={logoSoiree}
                alt="Soirée Dansante"
                className="w-72 sm:w-80 md:w-[380px] lg:w-[420px] max-w-full h-auto object-contain select-none transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            {/* Main Headline */}
            <h1 className="font-fraunces font-black text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight text-kuning-tua [text-shadow:3px_3px_0_var(--color-ungu-heading)]">
              Panggung Setiap
              <br />
              Suara
            </h1>

            {/* Tagline / Subtitle */}
            <p className="font-fraunces italic font-medium text-lg sm:text-xl md:text-2xl text-cream-tua mt-3 sm:mt-4 mb-6 tracking-wide">
              “Setiap suara punya tempat.”
            </p>

            {/* Date & Venue Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-cream-tua border-2 border-ungu-heading shadow-sm mb-6 sm:mb-8">
              {/* Location Pin Icon */}
              <svg
                className="w-3.5 h-4.5 text-merah shrink-0"
                viewBox="0 0 12 15"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.9 7.4C6.32222 7.4 6.67778 7.25556 6.96667 6.96667C7.25556 6.67778 7.4 6.32222 7.4 5.9C7.4 5.47778 7.25556 5.12222 6.96667 4.83333C6.67778 4.54444 6.32222 4.4 5.9 4.4C5.47778 4.4 5.12222 4.54444 4.83333 4.83333C4.54444 5.12222 4.4 5.47778 4.4 5.9C4.4 6.32222 4.54444 6.67778 4.83333 6.96667C5.12222 7.25556 5.47778 7.4 5.9 7.4ZM5.9 11.6833C7.17778 10.5278 8.13056 9.51111 8.75833 8.63333C9.38611 7.75556 9.7 6.86667 9.7 5.96667C9.7 4.83333 9.33333 3.90556 8.6 3.18333C7.86667 2.46111 6.96667 2.1 5.9 2.1C4.83333 2.1 3.93333 2.46111 3.2 3.18333C2.46667 3.90556 2.1 4.83333 2.1 5.96667C2.1 6.86667 2.41389 7.75278 3.04167 8.625C3.66944 9.49722 4.62222 10.5167 5.9 11.6833ZM5.9 14.4667C3.93333 12.8333 2.45833 11.35 1.475 10.0167C0.491667 8.68333 0 7.33333 0 5.96667C0 4.14444 0.594444 2.69444 1.78333 1.61667C2.97222 0.538889 4.34444 0 5.9 0C7.45556 0 8.82778 0.538889 10.0167 1.61667C11.2056 2.69444 11.8 4.14444 11.8 5.96667C11.8 7.33333 11.3083 8.68333 10.325 10.0167C9.34167 11.35 7.86667 12.8333 5.9 14.4667Z" />
              </svg>
              <span className="font-dm-sans font-black text-xs sm:text-sm text-ungu-heading tracking-wider uppercase">
                16–17 APRIL 2027 • PRPP SEMARANG
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              {/* Button 1: AMANKAN TIKETMU */}
              <Link
                to="/pemesanan"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-kuning-tua border-2 border-ungu-heading text-ungu-heading font-dm-sans font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-kuning-muda hover:scale-[1.02] active:scale-95 transition-all shadow-[0_2px_0_var(--color-ungu-heading)]"
              >
                {/* Ticket Icon */}
                <svg
                  className="w-4 h-3.5 text-ungu-heading shrink-0"
                  viewBox="0 0 15 12"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.5 9.75C7.7125 9.75 7.89062 9.67813 8.03438 9.53438C8.17813 9.39062 8.25 9.2125 8.25 9C8.25 8.7875 8.17813 8.60938 8.03438 8.46562C7.89062 8.32187 7.7125 8.25 7.5 8.25C7.2875 8.25 7.10938 8.32187 6.96562 8.46562C6.82187 8.60938 6.75 8.7875 6.75 9C6.75 9.2125 6.82187 9.39062 6.96562 9.53438C7.10938 9.67813 7.2875 9.75 7.5 9.75ZM7.5 6.75C7.7125 6.75 7.89062 6.67813 8.03438 6.53438C8.17813 6.39062 8.25 6.2125 8.25 6C8.25 5.7875 8.17813 5.60938 8.03438 5.46562C7.89062 5.32187 7.7125 5.25 7.5 5.25C7.2875 5.25 7.10938 5.32187 6.96562 5.46562C6.82187 5.60938 6.75 5.7875 6.75 6C6.75 6.2125 6.82187 6.39062 6.96562 6.53438C7.10938 6.67813 7.2875 6.75 7.5 6.75ZM7.5 3.75C7.7125 3.75 7.89062 3.67812 8.03438 3.53437C8.17813 3.39062 8.25 3.2125 8.25 3C8.25 2.7875 8.17813 2.60938 8.03438 2.46563C7.89062 2.32188 7.7125 2.25 7.5 2.25C7.2875 2.25 7.10938 2.32188 6.96562 2.46563C6.82187 2.60938 6.75 2.7875 6.75 3C6.75 3.2125 6.82187 3.39062 6.96562 3.53437C7.10938 3.67812 7.2875 3.75 7.5 3.75ZM13.5 12H1.5C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V7.5C0.4125 7.5 0.765625 7.35312 1.05938 7.05937C1.35313 6.76562 1.5 6.4125 1.5 6C1.5 5.5875 1.35313 5.23438 1.05938 4.94063C0.765625 4.64688 0.4125 4.5 0 4.5V1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0H13.5C13.9125 0 14.2656 0.146875 14.5594 0.440625C14.8531 0.734375 15 1.0875 15 1.5V4.5C14.5875 4.5 14.2344 4.64688 13.9406 4.94063C13.6469 5.23438 13.5 5.5875 13.5 6C13.5 6.4125 13.6469 6.76562 13.9406 7.05937C14.2344 7.35312 14.5875 7.5 15 7.5V10.5C15 10.9125 14.8531 11.2656 14.5594 11.5594C14.2656 11.8531 13.9125 12 13.5 12ZM13.5 10.5V8.5875C13.0375 8.3125 12.6719 7.94688 12.4031 7.49062C12.1344 7.03437 12 6.5375 12 6C12 5.4625 12.1344 4.96563 12.4031 4.50938C12.6719 4.05312 13.0375 3.6875 13.5 3.4125V1.5H1.5V3.4125C1.9625 3.6875 2.32812 4.05312 2.59687 4.50938C2.86562 4.96563 3 5.4625 3 6C3 6.5375 2.86562 7.03437 2.59687 7.49062C2.32812 7.94688 1.9625 8.3125 1.5 8.5875V10.5H13.5Z" />
                </svg>
                <span>AMANKAN TIKETMU</span>
              </Link>

              {/* Button 2: JELAJAHI LINEUP */}
              <Link
                to="/lineup"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-transparent border-2 border-cream-tua text-cream-tua font-dm-sans font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-cream-tua/15 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {/* Lineup / Equalizer Icon */}
                <svg
                  className="w-4 h-3.5 text-cream-tua shrink-0"
                  viewBox="0 0 16 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <path d="M1 2.5h14M1 7h9M1 11.5h6" />
                </svg>
                <span>JELAJAHI LINEUP</span>
              </Link>
            </div>

            {/* Feature Note */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-cream-tua/90 tracking-wide font-medium">
              {/* Star in Circle Icon */}
              <svg
                className="w-3.5 h-3.5 text-kuning-muda shrink-0"
                viewBox="0 0 14 14"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 10.6667L6.66667 8.63333L9.33333 10.6667L8.33333 7.36667L11 5.46667H7.73333L6.66667 2L5.6 5.46667H2.33333L5 7.36667L4 10.6667ZM6.66667 13.3333C5.74444 13.3333 4.87778 13.1583 4.06667 12.8083C3.25556 12.4583 2.55 11.9833 1.95 11.3833C1.35 10.7833 0.875 10.0778 0.525 9.26667C0.175 8.45555 0 7.58889 0 6.66667C0 5.74444 0.175 4.87778 0.525 4.06667C0.875 3.25556 1.35 2.55 1.95 1.95C2.55 1.35 3.25556 0.875 4.06667 0.525C4.87778 0.175 5.74444 0 6.66667 0C7.58889 0 8.45555 0.175 9.26667 0.525C10.0778 0.875 10.7833 1.35 11.3833 1.95C11.9833 2.55 12.4583 3.25556 12.8083 4.06667C13.1583 4.87778 13.3333 5.74444 13.3333 6.66667C13.3333 7.58889 13.1583 8.45555 12.8083 9.26667C12.4583 10.0778 11.9833 10.7833 11.3833 11.3833C10.7833 11.9833 10.0778 12.4583 9.26667 12.8083C8.45555 13.1583 7.58889 13.3333 6.66667 13.3333ZM6.66667 12C8.15556 12 9.41667 11.4833 10.45 10.45C11.4833 9.41667 12 8.15556 12 6.66667C12 5.17778 11.4833 3.91667 10.45 2.88333C9.41667 1.85 8.15556 1.33333 6.66667 1.33333C5.17778 1.33333 3.91667 1.85 2.88333 2.88333C1.85 3.91667 1.33333 5.17778 1.33333 6.66667C1.33333 8.15556 1.85 9.41667 2.88333 10.45C3.91667 11.4833 5.17778 12 6.66667 12Z" />
              </svg>
              <span>Festival Musik Outdoor 2 Hari • 4 Panggung • 60 Band</span>
            </div>
          </div>

          {/* Right Column: Stage Showcase Card with Floating Ornament */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            {/* Stage Showcase Card */}
            <div className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden border-[3px] border-ungu-heading bg-ungu-heading shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
              {/* Stage Photo Container */}
              <div className="relative w-full overflow-hidden block">
                <img
                  src={stageImage}
                  alt="Panggung Utama Soirée Dansante Semarang"
                  className="w-full h-auto object-cover block"
                />

                {/* Translucent Bottom Card Info Bar Overlay */}
                <div className="absolute bottom-0 inset-x-0 px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between bg-ungu-heading/80 backdrop-blur-[1.5px]">
                  <span className="font-dm-sans font-extrabold text-[11px] sm:text-xs tracking-wider text-cream-tua uppercase">
                    PANGGUNG UTAMA • CAT PROSCENIUM
                  </span>
                  <span className="font-dm-sans font-medium text-[11px] sm:text-xs text-cream-tua/90">
                    PRPP Semarang
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping Mystic Eye Ornament on Top-Right Corner */}
            <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 z-20 pointer-events-none drop-shadow-xl select-none">
              <img
                src={ornamenEye}
                alt="Sacred Eye Ornament"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Vintage Edge Divider */}
      <SectionDivider />
    </section>
  );
}
