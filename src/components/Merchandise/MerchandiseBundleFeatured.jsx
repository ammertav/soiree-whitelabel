import { useState } from "react";
import SectionDivider from "../SectionDivider";
import bundleImage from "../../assets/images-katalog/node-106.png";

const SIZE_CHART = [
  { size: "S", width: "48 cm", length: "70 cm", sleeve: "58 cm" },
  { size: "M", width: "52 cm", length: "72 cm", sleeve: "60 cm" },
  { size: "L", width: "56 cm", length: "75 cm", sleeve: "62 cm" },
  { size: "XL", width: "60 cm", length: "78 cm", sleeve: "64 cm" },
  { size: "XXL", width: "64 cm", length: "81 cm", sleeve: "66 cm" },
];

export default function MerchandiseBundleFeatured() {
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  return (
    <section className="relative w-full bg-hijau-butek py-10 sm:py-14 md:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full bg-[#244C47] border-[2.5px] border-ungu-heading rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 lg:p-12 shadow-[8px_8px_0_var(--color-ungu-heading)] overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Foto Flatlay Bundle (node-106.png) */}
            <div className="lg:col-span-6 w-full">
              <div className="relative rounded-2xl border-2 border-ungu-heading bg-[#FAF2E1] overflow-hidden group shadow-sm">
                <div className="absolute top-3 sm:top-3.5 left-3 sm:left-3.5 z-20 inline-flex items-center px-3.5 py-1.5 rounded-full bg-kuning-tua border-2 border-ungu-heading shadow-xs select-none">
                  <span className="font-dm-sans font-black text-[10px] sm:text-xs text-ungu-heading tracking-wider uppercase">
                    BUNDLE HEMAT FESTIVAL &bull; DISKON 15%
                  </span>
                </div>

                <img
                  src={bundleImage}
                  alt="Paket Komplit: Persona Karnaval Soirée Dansante 2027"
                  className="w-full h-auto object-cover block group-hover:scale-102 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Informasi Detail Paket */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 text-kuning-tua font-dm-sans font-black text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-3 sm:mb-4 select-none">
                <svg className="w-4 h-4 fill-kuning-tua shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <polygon points="12 6.5 13.5 10 17 10.5 14.5 13 15 16.5 12 15 9 16.5 9.5 13 7 10.5 10.5 10" fill="currentColor" />
                </svg>
                <span>KOLEKSI TERLENGKAP 2027</span>
              </div>

              <h2 className="font-fraunces font-black text-3xl sm:text-4xl lg:text-[42px] text-cream-terang leading-[1.12] tracking-tight mb-4 sm:mb-5">
                Paket Komplit:
                <span className="block mt-1">Persona Karnaval</span>
              </h2>

              <p className="font-dm-sans font-normal text-sm sm:text-[15px] text-cream-terang/85 leading-relaxed mb-6 sm:mb-8 max-w-lg">
                Dapatkan langsung 5 item esensial festival dalam satu kemasan kotak panggung
                eksklusif: Long Sleeve pilihanmu, Reversible Bucket Hat, Tote Bag 14oz, Sticker
                Pack Vinyl, dan Replika Woven Wristband.
              </p>

              <div className="flex items-center gap-3 sm:gap-4 mb-7 sm:mb-9 flex-wrap">
                <span className="font-fraunces font-black text-2xl sm:text-3xl lg:text-[34px] text-kuning-tua tracking-tight">
                  Rp 440.000
                </span>
                <span className="font-dm-sans line-through text-cream-terang/50 text-sm sm:text-base font-semibold">
                  Rp 515.000
                </span>
                <span className="font-dm-sans font-black text-[11px] sm:text-xs text-cream-terang bg-merah px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  Hemat 75rb
                </span>
              </div>

              <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    const catalogEl = document.getElementById("katalog-produk");
                    if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase bg-kuning-tua text-ungu-heading px-7 py-3 rounded-full border-2 border-ungu-heading shadow-[3px_3px_0_var(--color-ungu-heading)] hover:bg-kuning-muda hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-ungu-heading)] active:translate-y-0 transition-all cursor-pointer text-center leading-tight"
                >
                  <span>
                    BELI PAKET<br />BUNDLING
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSizeModalOpen(true)}
                  className="inline-flex items-center justify-center font-dm-sans font-bold text-xs sm:text-[13px] tracking-wider uppercase bg-transparent text-cream-terang border-2 border-cream-terang/85 px-6 sm:px-8 py-4 rounded-full hover:bg-cream-terang/10 hover:border-cream-terang hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  PANDUAN UKURAN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL PANDUAN UKURAN --- */}
      {isSizeModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn"
          onClick={() => setIsSizeModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-modal-title"
        >
          <div
            className="relative w-full max-w-lg bg-cream-terang border-2 border-ungu-heading rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0_var(--color-ungu-heading)] text-ungu-heading"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b-2 border-ungu-heading/20 pb-4 mb-5">
              <div>
                <span className="font-dm-sans font-black text-xs text-kuning-gelap uppercase tracking-widest">
                  SIZE CHART
                </span>
                <h3 id="size-modal-title" className="font-fraunces font-black text-2xl text-ungu-heading">
                  Panduan Ukuran T-Shirt
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSizeModalOpen(false)}
                className="w-9 h-9 rounded-full bg-cream-tua border-2 border-ungu-heading flex items-center justify-center text-ungu-heading hover:bg-pink-custom transition-colors cursor-pointer"
                aria-label="Tutup panduan ukuran"
              >
                &times;
              </button>
            </div>

            {/* Tabel Ukuran */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-dm-sans text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-ungu-heading/30 bg-cream-tua/60">
                    <th className="py-2.5 px-3 font-black text-ungu-heading">SIZE</th>
                    <th className="py-2.5 px-3 font-bold text-ungu-heading">LEBAR</th>
                    <th className="py-2.5 px-3 font-bold text-ungu-heading">PANJANG</th>
                    <th className="py-2.5 px-3 font-bold text-ungu-heading">LENGAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ungu-heading/15">
                  {SIZE_CHART.map((row) => (
                    <tr key={row.size} className="hover:bg-cream-tua/40 transition-colors">
                      <td className="py-2.5 px-3 font-black text-ungu-heading">{row.size}</td>
                      <td className="py-2.5 px-3 text-ungu-heading/85">{row.width}</td>
                      <td className="py-2.5 px-3 text-ungu-heading/85">{row.length}</td>
                      <td className="py-2.5 px-3 text-ungu-heading/85">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="font-dm-sans text-[11px] sm:text-xs text-ungu-heading/70 mt-4 leading-relaxed">
              * Toleransi ukuran &plusmn; 1-2 cm. Bahan menggunakan katun 16s &amp; 20s premium standar ekspor (Heavyweight, jatuh rapi, dan tidak panas).
            </p>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSizeModalOpen(false)}
                className="w-full font-dm-sans font-black text-xs uppercase tracking-wider bg-kuning-tua text-ungu-heading py-3 rounded-full border-2 border-ungu-heading shadow-[2.5px_2.5px_0_var(--color-ungu-heading)] hover:bg-kuning-muda transition-all cursor-pointer"
              >
                MENGERTI
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20">
        <SectionDivider bgClass="bg-cream-tua" />
      </div>
    </section>
  );
}
