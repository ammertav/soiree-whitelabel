import SectionDivider from "../SectionDivider";

const FULFILLMENT_STEPS = [
  {
    number: "1",
    badgeBg: "bg-kuning-tua text-ungu-heading",
    title: "Pilih Metode Layanan",
    description: (
      <>
        Tentukan saat checkout: ambil gratis di booth express PRPP Semarang tanggal{" "}
        <strong className="font-bold text-cream-terang">16–17 April 2027</strong>, atau
        dikirim langsung ke rumahmu mulai 1 April 2027.
      </>
    ),
  },
  {
    number: "2",
    badgeBg: "bg-pink-custom text-ungu-heading",
    title: "Simpan QR Pemesanan",
    description: (
      <>
        Barcode/QR unik merchandise akan dikirimkan otomatis ke WhatsApp &amp; Email
        terdaftar. Cukup pindai di loket fast-track tanpa perlu cetak kertas.
      </>
    ),
  },
  {
    number: "3",
    badgeBg: "bg-hijau text-cream-terang",
    title: "Jaminan Produk Asli",
    description: (
      <>
        Setiap cenderamata dilengkapi hangtag bernomor seri hologram dan sertifikat
        kurasi seni panggung Soirée Dansante 2027.
      </>
    ),
  },
];

export default function MerchandiseFulfillmentGuide() {
  return (
    <section className="relative w-full bg-hijau-butek transition-colors">
      <div className="w-full">
        <SectionDivider bgClass="bg-cream-tua" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="block font-dm-sans font-black text-xs sm:text-[13px] tracking-[0.22em] uppercase text-kuning-tua mb-3 sm:mb-4 select-none">
            ALUR MUDAH
          </span>

          <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-[44px] text-cream-terang leading-[1.15] tracking-tight mb-4 sm:mb-5">
            Panduan Pengambilan &amp;
            <span className="block mt-1 sm:mt-1.5">Pengiriman</span>
          </h2>

          <p className="font-dm-sans text-sm sm:text-base text-cream-terang/80 leading-relaxed max-w-3xl mx-auto">
            Tiga langkah mudah memastikan atribut konser resmimu siap menyemarakkan malam
            festival di Semarang.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {FULFILLMENT_STEPS.map((step) => (
            <article
              key={step.number}
              className="bg-dark-teal border-2 border-ungu-heading rounded-2xl sm:rounded-[22px] p-6 sm:p-7 md:p-8 shadow-[6px_6px_0_var(--color-ungu-heading)] flex flex-col justify-start text-left hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-ungu-heading)] transition-all duration-200"
            >
              {/* Number Badge */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-ungu-heading ${step.badgeBg} flex items-center justify-center font-fraunces font-black text-lg sm:text-xl mb-6 shadow-xs select-none`}
              >
                {step.number}
              </div>

              {/* Step Title */}
              <h3 className="font-dm-sans font-bold text-base sm:text-lg md:text-[19px] text-kuning-tua mb-3 leading-snug">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="font-dm-sans text-xs sm:text-sm text-cream-terang/85 leading-relaxed">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom Vintage Ribbon Divider */}
      <div className="w-full">
        <SectionDivider bgClass="bg-cream-tua" />
      </div>
    </section>
  );
}
