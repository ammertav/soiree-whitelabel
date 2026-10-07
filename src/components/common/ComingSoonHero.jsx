import { Link } from "react-router-dom";
import { LuSparkles, LuArrowRight } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";
import wingedCatAsset from "../../assets/soiree-dansante-assets/objects/08-kucing-bersayap.png";
import ribbon3dAsset from "../../assets/soiree-dansante-assets/objects/09-pita-papan-catur.png";
import starEyeAsset from "../../assets/soiree-dansante-assets/objects/11-mata-bintang.png";
import SectionDivider from "../SectionDivider";

import { INSTAGRAM } from "../../data/socialLinks";

/**
 * Hero "Coming Soon" 2 kolom untuk halaman yang kontennya belum diumumkan (Rundown, Lineup).
 * Kiri: badge, judul, deskripsi, pill info, CTA. Kanan: kartu artwork + badge coming soon.
 */
export default function ComingSoonHero({
  id,
  ariaLabel,
  badgeIcon: BadgeIcon,
  badgeText,
  titleMain,
  titleAccent,
  description,
  pills = [],
  ctas = [],
  artwork,
  cardNote,
}) {
  return (
    <section
      id={id}
      className="relative w-full bg-putih-butek pt-10 sm:pt-14 lg:pt-16 pb-0 overflow-hidden"
      aria-label={ariaLabel}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-18 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Kolom Kiri: Informasi & Tombol Aksi */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-ungu-heading bg-cream-terang text-ungu-heading mb-4 sm:mb-5 select-none shadow-[2px_3px_0_var(--color-ungu-heading)]">
              {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" aria-hidden="true" />}
              <span className="font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase">
                {badgeText}
              </span>
            </div>

            <h1 className="font-fraunces text-3xl sm:text-4xl md:text-[44px] lg:text-[52px] leading-[1.08] tracking-tight mb-4 sm:mb-5">
              <span className="block font-black text-ungu-heading">{titleMain}</span>
              <span className="block italic font-black text-hijau mt-1 sm:mt-1.5">{titleAccent}</span>
            </h1>

            <p className="font-dm-sans font-normal text-sm sm:text-base text-gray-custom max-w-xl leading-relaxed mb-6 sm:mb-7">
              {description}
            </p>

            {pills.length > 0 && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6 sm:mb-8 select-none">
                {pills.map(({ icon: PillIcon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-terang border border-ungu-heading text-xs font-dm-sans font-bold text-ungu-heading shadow-2xs"
                  >
                    <PillIcon className="w-3.5 h-3.5 text-hijau stroke-[2.3]" aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            )}

            {ctas.length > 0 && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 select-none mb-6">
                {ctas.map(({ to, label, icon: CtaIcon, primary }) => (
                  <Link
                    key={label}
                    to={to}
                    className={`inline-flex items-center gap-2 ${
                      primary ? "bg-kuning-tua hover:bg-kuning-muda" : "bg-cream-terang hover:bg-white"
                    } active:translate-x-0.5 active:translate-y-0.5 text-ungu-heading border-2 border-ungu-heading rounded-full px-5 sm:px-6 py-2.5 sm:py-3 font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase shadow-[3px_3px_0_var(--color-ungu-heading)] active:shadow-[1px_1px_0_var(--color-ungu-heading)] transition-all`}
                  >
                    {CtaIcon && <CtaIcon className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />}
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 text-xs font-dm-sans text-gray-custom select-none">
              <span>Ikuti pembaruan terbaru di:</span>
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-ungu-heading hover:text-hijau transition-colors"
              >
                <FaInstagram className="w-3.5 h-3.5 text-pink-custom" aria-hidden="true" />
                <span>{INSTAGRAM.handle}</span>
                <LuArrowRight className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Kartu Artwork & Badge Coming Soon */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full max-w-md mx-auto bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-5 sm:p-7 shadow-[6px_8px_0_var(--color-ungu-heading)] overflow-hidden">
              <div className="absolute -top-3 -left-3 sm:top-0 sm:left-0 w-16 sm:w-20 pointer-events-none select-none opacity-85">
                <img src={wingedCatAsset} alt="" aria-hidden="true" className="w-full h-auto object-contain" />
              </div>
              <div className="absolute -bottom-4 -right-4 sm:bottom-0 sm:right-0 w-16 sm:w-20 pointer-events-none select-none opacity-85">
                <img src={ribbon3dAsset} alt="" aria-hidden="true" className="w-full h-auto object-contain" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center py-4">
                <div className="relative mb-3 sm:mb-4">
                  <img
                    src={artwork.src}
                    alt={artwork.alt}
                    className="w-28 sm:w-36 h-auto object-contain select-none pointer-events-none drop-shadow-md"
                  />
                  <img
                    src={starEyeAsset}
                    alt=""
                    aria-hidden="true"
                    className="w-7 sm:w-8 h-auto object-contain absolute -bottom-1 -left-2 pointer-events-none select-none drop-shadow-sm"
                  />
                </div>

                <div className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full bg-kuning-tua text-ungu-heading border-2 border-ungu-heading shadow-[2.5px_2.5px_0_var(--color-ungu-heading)] mb-2.5 select-none">
                  <LuSparkles className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                  <span className="font-dm-sans font-black text-xs sm:text-[13px] tracking-[0.16em] uppercase">
                    COMING SOON • EDISI 2027
                  </span>
                </div>

                <p className="font-dm-sans text-[11px] sm:text-xs text-gray-custom max-w-xs mx-auto">
                  {cardNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
