export default function LineupRosterBanner() {
  // Komponen tag pemisah vertikal kuning khas festival
  const GlyphTag = () => (
    <span
      className="inline-flex items-center justify-center mx-2 sm:mx-3.5 md:mx-4.5 align-middle select-none shrink-0"
      aria-hidden="true"
    >
      <span className="bg-kuning-tua text-ungu-heading border border-ungu-heading px-0.5 py-1 sm:py-1.5 rounded-[2px] text-[7px] sm:text-[8px] font-black uppercase tracking-tighter [writing-mode:vertical-lr] rotate-180 leading-none shadow-xs">
        NO GLYPH
      </span>
    </span>
  );

  return (
    <section className="w-full bg-hijau-butek border-t-2 border-b-2 border-ungu-heading py-12 sm:py-16 md:py-20 text-center transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Tagline Atas */}
        <div className="flex items-center justify-center gap-2 mb-8 sm:mb-10 md:mb-12">
          <span className="font-dm-sans font-black text-xs sm:text-[13px] md:text-sm text-kuning-tua tracking-[0.2em] sm:tracking-[0.25em] uppercase">
            &#9614;&#9614; SUARA SEMARANG, JAWA TENGAH &amp; NUSANTARA BERSATU &#9614;&#9614;
          </span>
        </div>

        {/* Typographic Poster Lineup - 4 Baris */}
        <div className="flex flex-col items-center justify-center gap-y-4 sm:gap-y-6 md:gap-y-8 max-w-6xl mx-auto">
          {/* Baris 1: SOEGI BORNEAN | THE JANSEN | PYONG PYONG */}
          <div className="flex flex-wrap items-center justify-center leading-none">
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              SOEGI BORNEAN
            </span>
            <GlyphTag />
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              THE JANSEN
            </span>
            <GlyphTag />
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              PYONG PYONG
            </span>
          </div>

          {/* Baris 2: [TAG] NADIN AMIZAH | PERUNGGU | LOMBA SIHIR */}
          <div className="flex flex-wrap items-center justify-center leading-none">
            <GlyphTag />
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              NADIN AMIZAH
            </span>
            <GlyphTag />
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              PERUNGGU
            </span>
            <GlyphTag />
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              LOMBA SIHIR
            </span>
          </div>

          {/* Baris 3: [TAG] OCTOPUZ | SAL PRIADI | GRRRL GANG [TAG] */}
          <div className="flex flex-wrap items-center justify-center leading-none">
            <GlyphTag />
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              OCTOPUZ
            </span>
            <GlyphTag />
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              SAL PRIADI
            </span>
            <GlyphTag />
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              GRRRL GANG
            </span>
            <GlyphTag />
          </div>

          {/* Baris 4: DONGKER | KUNTO AJI | FIGURA RENATA */}
          <div className="flex flex-wrap items-center justify-center leading-none">
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              DONGKER
            </span>
            <GlyphTag />
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              KUNTO AJI
            </span>
            <GlyphTag />
            <span className="font-fraunces font-black uppercase text-cream-tua text-2xl sm:text-3xl md:text-4xl lg:text-[44px] tracking-tight hover:text-kuning-tua transition-colors cursor-default">
              FIGURA RENATA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
