import SectionDivider from "../SectionDivider";
import gateImage from "../../assets/images/instalasi-gerbang/node-492.png";
import ornamenRibbon from "../../assets/images/instalasi-gerbang/ornamen-pita-catur-494.png";
import ornamenBouquet from "../../assets/images/instalasi-gerbang/ornamen-buket-bunga-496.png";

export default function InstalasiGerbang() {
  return (
    <section
      id="instalasi"
      className="relative w-full bg-hijau-butek pt-14 md:pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          {/* Top Pill Badge */}
          <span className="inline-block px-5 py-1.5 rounded-full bg-kuning-tua text-ungu-heading font-dm-sans font-black text-[10px] sm:text-xs uppercase tracking-[0.18em] border-2 border-ungu-heading shadow-sm mb-4">
            TITIK PENGALAMAN FESTIVAL
          </span>

          {/* Title */}
          <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-kuning-tua tracking-tight leading-[1.14] text-center mb-3 sm:mb-4">
            Instalasi Gerbang Pintu Masuk
            <br />
            Teatrikal
          </h2>

          {/* Description */}
          <p className="font-dm-sans text-xs sm:text-sm md:text-base text-cream-tua/90 text-center max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12">
            Gerbang kepala kucing raksasa yang menjadi ikon panggung sekaligus
            pintu masuk interaktif bagi seluruh pengunjung festival untuk
            mengabadikan momen bersama kawan dansa.
          </p>
        </div>

        {/* Gate Installation Visual Card with Floating Ornaments */}
        <div className="relative max-w-4xl lg:max-w-5xl mx-auto">
          {/* Top-Left Ribbon Ornament */}
          <img
            src={ornamenRibbon}
            alt="Ornamen Pita Catur"
            className="absolute -top-6 -left-4 sm:-top-8 sm:-left-6 md:-top-10 md:-left-8 w-14 sm:w-20 md:w-24 h-auto object-contain z-20 pointer-events-none drop-shadow-md select-none"
          />

          {/* Main Image Frame */}
          <div className="rounded-[22px] sm:rounded-[28px] overflow-hidden border-[2.5px] sm:border-[3px] border-ungu-heading bg-cream-tua shadow-[5px_6px_0_var(--color-ungu-heading)] transition-transform duration-300 hover:scale-[1.008]">
            <img
              src={gateImage}
              alt="Instalasi Gerbang Pintu Masuk Teatrikal Soirée Dansante"
              className="w-full h-auto object-cover block select-none"
            />
          </div>

          {/* Bottom-Right Bouquet Ornament */}
          <img
            src={ornamenBouquet}
            alt="Ornamen Buket Bunga"
            className="absolute -bottom-5 -right-4 sm:-bottom-7 sm:-right-6 md:-bottom-8 md:-right-7 w-14 sm:w-20 md:w-24 h-auto object-contain z-20 pointer-events-none drop-shadow-md select-none"
          />
        </div>
      </div>

      {/* Bottom Vintage Divider */}
      <SectionDivider className="mt-14 md:mt-20" />
    </section>
  );
}
