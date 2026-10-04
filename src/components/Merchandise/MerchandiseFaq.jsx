import { useState } from "react";
import { FaChevronDown, FaRegCommentDots } from "react-icons/fa6";
import SectionDivider from "../SectionDivider";

const FAQ_DATA = [
  {
    id: "faq-1",
    question: "Apakah merchandise dijual langsung saat festival di PRPP Semarang?",
    answer:
      "Ya, official merchandise booth akan buka selama dua hari acara berlangsung (16–17 April 2027) di area PRPP Semarang. Namun kuota stok harian dan variasi ukuran sangat terbatas di lokasi. Kami sangat menyarankan untuk memesan secara pre-order online agar item dan ukuran impianmu aman terjamin.",
  },
  {
    id: "faq-2",
    question: "Kapan batas waktu pre-order online merchandise resmi?",
    answer:
      "Pre-order online dibuka hingga 10 April 2027 pukul 23:59 WIB atau selama persediaan kuota produksi masih tersedia. Semua pesanan dengan metode ekspedisi rumah akan mulai dikirimkan serentak secara bertahap mulai 1 April 2027.",
  },
  {
    id: "faq-3",
    question: "Bisakah menukar ukuran baju saat pengambilan di venue festival?",
    answer:
      "Penukaran ukuran di lokasi hanya dapat dilayani apabila stok ukuran pengganti di booth express PRPP Semarang masih mencukupi. Untuk menghindari ketidaksesuaian, silakan gunakan tabel 'Panduan Ukuran Baju (cm)' kami yang lengkap sebelum memproses pesanan.",
  },
  {
    id: "faq-4",
    question: "Apakah penonton tanpa tiket festival bisa membeli merchandise?",
    answer:
      "Bisa! Opsi pengiriman ekspedisi ke seluruh Indonesia terbuka bagi siapa saja tanpa syarat tiket konser. Khusus untuk opsi 'Ambil di Venue PRPP Semarang (Gratis)', pembeli wajib menunjukkan QR kode merchandise beserta tiket masuk festival resmi di gerbang.",
  },
];

export default function MerchandiseFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative w-full bg-cream-tua py-16 sm:py-20 md:py-24 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="block font-dm-sans font-black text-xs sm:text-[13px] tracking-[0.2em] uppercase text-hijau mb-3 select-none">
            PERTANYAAN UMUM
          </span>

          <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-[44px] text-ungu-heading leading-[1.18] tracking-tight mb-3 sm:mb-4">
            Seputar Cenderamata Festival
          </h2>

          <p className="font-dm-sans text-sm sm:text-base text-ungu-heading/75 leading-relaxed max-w-xl mx-auto">
            Semua hal yang perlu kamu ketahui tentang pre-order, ukuran, dan penukaran di
            lokasi festival.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 sm:space-y-4 max-w-3xl mx-auto">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                className="bg-cream-terang border-2 border-ungu-heading rounded-2xl shadow-[4px_4.5px_0_var(--color-ungu-heading)] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer select-none hover:bg-cream-muda/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  {/* Accordion Heading (18px) */}
                  <span className="font-dm-sans font-bold text-base sm:text-[18px] text-ungu-heading leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-ungu-heading transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <FaChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Konten Jawaban Terbuka (Current + 2px: 14px -> 16px) */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-left border-t border-ungu-heading/15 animate-fadeIn">
                    <p className="font-dm-sans text-sm sm:text-base text-ungu-heading/85 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Subtext & Help Desk CTA */}
        <div className="mt-12 sm:mt-14 text-center">
          <p className="font-dm-sans text-sm sm:text-[15px] text-ungu-heading/70 mb-3.5">
            Punya pertanyaan kustom atau pesanan korporasi komunitas?
          </p>

          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20Soir%C3%A9e%20Dansante,%20saya%20ingin%20bertanya%20seputar%20merchandise%20festival."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream-terang hover:bg-cream-muda text-ungu-heading border-2 border-ungu-heading shadow-[3px_3px_0_var(--color-ungu-heading)] hover:-translate-y-0.5 active:translate-y-0 font-dm-sans font-bold text-xs sm:text-sm transition-all cursor-pointer select-none"
          >
            <FaRegCommentDots className="w-4 h-4 text-hijau shrink-0" />
            <span>Hubungi Bantuan Merchandise</span>
          </a>
        </div>

      </div>

      {/* Bottom Vintage Double-Ribbon Section Divider */}
      <div className="w-full mt-16 sm:mt-20">
        <SectionDivider bgClass="bg-cream-tua" />
      </div>
    </section>
  );
}
