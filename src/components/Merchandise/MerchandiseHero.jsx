import SectionDivider from "../SectionDivider";

const HIGHLIGHT_CARDS = [
  {
    id: "fast-track",
    title: "Fast-Track Booth",
    description: "Ambil tanpa antre dengan QR Code",
    badgeBg: "bg-kuning-tua",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "heavyweight-cotton",
    title: "Heavyweight Katun",
    description: "Kain 16s & 20s premium standar ekspor",
    badgeBg: "bg-pink-custom",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
        <line x1="6" y1="18" x2="18" y2="6" />
        <line x1="3" y1="12" x2="12" y2="3" />
        <line x1="12" y1="21" x2="21" y2="12" />
      </svg>
    ),
  },
  {
    id: "free-sticker",
    title: "Free Sticker Pack",
    description: "Setiap pesanan di atas Rp 200.000",
    badgeBg: "bg-hijau-butek text-cream-tua",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="9" r="6" />
        <path d="M15.477 15.89 17 22l-5-3-5 3 1.523-6.11" />
      </svg>
    ),
  },
];

export default function MerchandiseHero() {
  return (
    <section className="relative w-full bg-cream-tua pt-10 sm:pt-14 md:pt-16 pb-0 overflow-hidden">
      {/* Watermark dekoratif */}
      <div className="absolute top-8 sm:top-12 left-4 sm:left-10 md:left-14 pointer-events-none text-ungu-heading/20" aria-hidden="true">
        <svg className="w-10 h-10 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="currentColor">
          <path d="M32 0C32 17.6731 46.3269 32 64 32C46.3269 32 32 46.3269 32 64C32 46.3269 17.6731 32 0 32C17.6731 32 32 17.6731 32 0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full bg-kuning-tua border-2 border-ungu-heading shadow-[2.5px_2.5px_0_var(--color-ungu-heading)] mb-5 sm:mb-6 select-none">
          <svg className="w-4 h-4 text-ungu-heading shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
            <circle cx="7" cy="15" r="1" fill="currentColor" />
            <circle cx="17" cy="15" r="1" fill="currentColor" />
          </svg>
          <span className="font-dm-sans font-black text-[10px] sm:text-xs text-ungu-heading tracking-wider uppercase">
            EDISI TERBATAS 2027 &bull; PRE-ORDER &amp; AMBIL DI VENUE
          </span>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="font-fraunces font-black text-3xl sm:text-5xl md:text-6xl lg:text-[62px] text-ungu-heading leading-[1.08] tracking-tight max-w-4xl">
          Cenderamata Resmi Soir&eacute;e
          <span className="block mt-1 sm:mt-1.5">Dansante</span>
        </h1>

        <p className="font-dm-sans font-medium text-sm sm:text-base text-ungu-heading/85 max-w-2xl text-center leading-relaxed mt-4 sm:mt-5">
          Bawa pulang kenangan teatrikal dari PRPP Semarang. Koleksi merchandise resmi
          dengan ilustrasi panggung kepala kucing dan karakter magis, dirancang khusus dalam
          jumlah terbatas.
        </p>

        {/* Info Banner */}
        <div className="mt-6 sm:mt-7 max-w-3xl w-full px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-cream-terang border-2 border-ungu-heading shadow-[3px_3px_0_var(--color-ungu-heading)] flex items-center justify-center gap-2.5 sm:gap-3 text-center sm:text-left transition-transform hover:-translate-y-0.5">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-hijau shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
            <path d="M19 16L19.9 19.1L23 20L19.9 20.9L19 24L18.1 20.9L15 20L18.1 19.1L19 16Z" opacity="0.7" />
          </svg>
          <span className="font-dm-sans font-medium text-xs sm:text-[13px] text-ungu-heading leading-snug">
            Tersedia pemesanan online untuk pengambilan langsung di Booth Fast-Track PRPP Semarang (bebas antre) atau opsi ekspedisi ke seluruh Indonesia.
          </span>
        </div>

        {/* 3 Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 max-w-5xl w-full mt-7 sm:mt-9 mb-12 sm:mb-16">
          {HIGHLIGHT_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-cream-terang border-2 border-ungu-heading shadow-[3.5px_3.5px_0_var(--color-ungu-heading)] rounded-2xl p-4 sm:p-4.5 flex items-center gap-3.5 text-left hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0_var(--color-ungu-heading)] transition-all"
            >
              <div className={`w-11 h-11 rounded-full border-2 border-ungu-heading flex items-center justify-center shrink-0 ${card.badgeBg} shadow-xs`}>
                {card.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-dm-sans font-bold text-sm sm:text-base text-ungu-heading leading-tight">
                  {card.title}
                </span>
                <span className="font-dm-sans text-[11px] sm:text-xs text-ungu-heading/75 mt-0.5 leading-snug">
                  {card.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider bgClass="bg-cream-tua" />
    </section>
  );
}
