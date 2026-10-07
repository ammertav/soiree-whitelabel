import SectionDivider from "../SectionDivider";

// Info banner disembunyikan sementara (isi tentang pengambilan di booth belum final)
const SHOW_INFO_BANNER = false;

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
        {/* Heading & Subtitle */}
        <h1 className="font-fraunces font-black text-3xl sm:text-5xl md:text-6xl lg:text-[62px] text-ungu-heading leading-[1.08] tracking-tight max-w-4xl">
          Cenderamata Resmi Soir&eacute;e
          <span className="block mt-1 sm:mt-1.5">Dansante</span>
        </h1>

        <p className="font-dm-sans font-medium text-sm sm:text-base text-ungu-heading/85 max-w-2xl text-center leading-relaxed mt-4 sm:mt-5 mb-12 sm:mb-16">
          Bawa pulang kenangan teatrikal dari PRPP Semarang. Koleksi merchandise resmi
          dengan ilustrasi panggung kepala kucing dan karakter magis, dirancang khusus dalam
          jumlah terbatas.
        </p>

        {/* Info Banner (disembunyikan, lihat SHOW_INFO_BANNER) */}
        {SHOW_INFO_BANNER && (
        <div className="mt-6 sm:mt-7 max-w-3xl w-full px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-cream-terang border-2 border-ungu-heading shadow-[3px_3px_0_var(--color-ungu-heading)] flex items-center justify-center gap-2.5 sm:gap-3 text-center sm:text-left transition-transform hover:-translate-y-0.5">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-hijau shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
            <path d="M19 16L19.9 19.1L23 20L19.9 20.9L19 24L18.1 20.9L15 20L18.1 19.1L19 16Z" opacity="0.7" />
          </svg>
          <span className="font-dm-sans font-medium text-xs sm:text-[13px] text-ungu-heading leading-snug">
            Tersedia pemesanan online untuk pengambilan langsung di Booth Fast-Track PRPP Semarang (bebas antre) atau opsi ekspedisi ke seluruh Indonesia.
          </span>
        </div>
        )}
      </div>

      <SectionDivider />
    </section>
  );
}
