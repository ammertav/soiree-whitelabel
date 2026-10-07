import { useState, useMemo } from "react";
import { FaBagShopping, FaArrowUpRightFromSquare } from "react-icons/fa6";
import MerchandiseFilterBar from "./MerchandiseFilterBar";
import placeholderOrnament from "../../assets/soiree-dansante-assets/objects/11-mata-bintang.png";
import {
  PRODUCTS_DATA,
  SIZE_GUIDE_ROWS,
  MERCHANDISE_STORE_URL,
  formatRupiah,
  getProductStoreUrl,
} from "../../services/merchandiseService";

// Panduan ukuran disembunyikan: ukuran resmi produk belum diumumkan
const SHOW_SIZE_GUIDE = false;

// Katalog merchandise: pembelian diarahkan ke e-commerce resmi (tanpa keranjang/checkout di sini)
export default function MerchandiseCatalogSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Kategori List dengan Counter Dinamis
  const categories = useMemo(() => {
    return [
      { id: "all", label: "SEMUA PRODUK", count: PRODUCTS_DATA.length },
      {
        id: "pakaian",
        label: "PAKAIAN & KAOS",
        count: PRODUCTS_DATA.filter((p) => p.category === "pakaian").length,
      },
      {
        id: "aksesoris",
        label: "AKSESORIS & TOPI",
        count: PRODUCTS_DATA.filter((p) => p.category === "aksesoris").length,
      },
      {
        id: "tas",
        label: "TAS & CANVAS",
        count: PRODUCTS_DATA.filter((p) => p.category === "tas").length,
      },
      {
        id: "kolektibel",
        label: "KOLEKTIBEL",
        count: PRODUCTS_DATA.filter((p) => p.category === "kolektibel").length,
      },
    ];
  }, []);

  // Filter & Urutkan Produk
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((item) => {
      // Filter Kategori
      if (selectedCategory !== "all") {
        if (item.category !== selectedCategory) {
          return false;
        }
      }

      // Filter Pencarian
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.desc.toLowerCase().includes(query);
        const matchCategory = item.categoryLabel.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCategory) return false;
      }

      return true;
    }).sort((a, b) => (sortBy === "name-az" ? a.name.localeCompare(b.name) : 0));
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="katalog-produk" className="w-full bg-cream-tua pb-16 sm:pb-24">
      {/* 1. HORIZONTAL FILTER & SEARCH BAR */}
      <MerchandiseFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">

          {/* Kolom Produk */}
          <div className="lg:col-span-8 w-full">
            {filteredProducts.length === 0 ? (
              <div className="w-full bg-cream-terang border-2 border-dashed border-ungu-heading/40 rounded-3xl p-12 text-center">
                <span className="font-fraunces font-black text-2xl text-ungu-heading block mb-2">
                  Cenderamata Tidak Ditemukan
                </span>
                <p className="font-dm-sans text-sm text-ungu-heading/75">
                  Coba kata kunci lain atau pilih kategori &quot;Semua Produk&quot;.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {filteredProducts.map((product) => {
                  const storeUrl = getProductStoreUrl(product);

                  return (
                    <article
                      key={product.id}
                      className="bg-cream-terang border-2 border-ungu-heading rounded-2xl p-3.5 sm:p-4 shadow-[3.5px_3.5px_0_var(--color-ungu-heading)] flex flex-col justify-between hover:-translate-y-1 hover:shadow-[5px_5px_0_var(--color-ungu-heading)] transition-all group"
                    >
                      <div>
                        <div className="relative aspect-square w-full rounded-xl border-2 border-ungu-heading overflow-hidden bg-white mb-3 sm:mb-3.5 shadow-xs">
                          {product.badge && (
                            <div className="absolute top-2.5 left-2.5 z-10">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full font-dm-sans font-black text-[9px] sm:text-[10px] uppercase tracking-wider border border-ungu-heading shadow-xs ${product.badgeColor}`}
                              >
                                {product.badge}
                              </span>
                            </div>
                          )}

                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-cream-tua flex flex-col items-center justify-center gap-2 text-center p-4">
                              <img
                                src={placeholderOrnament}
                                alt=""
                                aria-hidden="true"
                                className="w-16 sm:w-20 h-auto object-contain opacity-40 select-none pointer-events-none"
                              />
                              <span className="font-dm-sans font-black text-[10px] sm:text-[11px] text-ungu-heading/50 uppercase tracking-wider">
                                Foto segera hadir
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Kategori Eyebrow */}
                        <span className="block font-dm-sans font-extrabold text-[10px] sm:text-[11px] text-hijau uppercase tracking-wider mb-1">
                          {product.categoryLabel}
                        </span>

                        {/* Nama Produk */}
                        <h3 className="font-dm-sans font-bold text-sm sm:text-[15px] text-ungu-heading leading-snug line-clamp-2 min-h-[2.5rem]">
                          {product.name}
                        </h3>

                        {/* Deskripsi Singkat */}
                        <p className="font-dm-sans text-xs text-ungu-heading/75 line-clamp-2 mt-1 leading-relaxed min-h-[2rem]">
                          {product.desc}
                        </p>
                      </div>

                      {/* Bagian Bawah: Ukuran, Harga & Tombol Beli (redirect ke e-commerce) */}
                      <div className="mt-3.5 pt-3 border-t border-ungu-heading/15">
                        {product.sizes && (
                          <p className="font-dm-sans text-[10px] text-ungu-heading/75 mb-3">
                            <span className="font-bold uppercase">Ukuran:</span> {product.sizes.join(", ")}
                          </p>
                        )}

                        <div className="flex items-center justify-between gap-2">
                          {product.price ? (
                            <span className="font-fraunces font-black text-base sm:text-lg text-ungu-heading tracking-tight">
                              {formatRupiah(product.price)}
                            </span>
                          ) : (
                            <span className="font-dm-sans font-bold text-[11px] text-ungu-heading/60 leading-tight">
                              Harga segera diumumkan
                            </span>
                          )}

                          {storeUrl ? (
                            <a
                              href={storeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-kuning-tua hover:bg-kuning-muda border-2 border-ungu-heading text-ungu-heading font-dm-sans font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-[2px_2px_0_var(--color-ungu-heading)] active:translate-y-0.5 transition-all"
                              aria-label={`Beli ${product.name} di toko resmi`}
                            >
                              <FaBagShopping className="w-3 h-3" aria-hidden="true" />
                              Beli
                            </a>
                          ) : (
                            <span className="px-3 py-1.5 rounded-full bg-cream-tua/60 border border-ungu-heading/30 font-dm-sans font-black text-[10px] text-ungu-heading/50 uppercase tracking-wider">
                              Segera
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* --- KOLOM KANAN (4 COLS): TOKO RESMI & PANDUAN UKURAN --- */}
          <aside className="lg:col-span-4 w-full space-y-6 lg:sticky lg:top-24">

            {/* Belanja di Toko Resmi (pengganti keranjang) */}
            <div className="bg-cream-terang border-2 border-ungu-heading rounded-2xl p-4 sm:p-5 shadow-[4px_4.5px_0_var(--color-ungu-heading)] text-left">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b-2 border-ungu-heading/20">
                <FaBagShopping className="w-4 h-4 text-hijau" aria-hidden="true" />
                <h3 className="font-dm-sans font-black text-sm sm:text-base text-ungu-heading">
                  Belanja di Toko Resmi
                </h3>
              </div>
              <p className="font-dm-sans text-xs text-ungu-heading/80 leading-relaxed">
                Pemesanan, pembayaran, dan pengiriman merchandise dilayani melalui toko online resmi Soir&eacute;e Dansante.
              </p>
              {MERCHANDISE_STORE_URL ? (
                <a
                  href={MERCHANDISE_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-3 rounded-full bg-kuning-tua hover:bg-kuning-muda border-2 border-ungu-heading shadow-[3px_3px_0_var(--color-ungu-heading)] active:translate-y-0.5 text-ungu-heading font-dm-sans font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>Kunjungi Toko</span>
                  <FaArrowUpRightFromSquare className="w-3 h-3" aria-hidden="true" />
                </a>
              ) : (
                <p className="mt-4 font-dm-sans font-black text-[11px] text-ungu-heading/60 uppercase tracking-wider text-center">
                  Toko online segera dibuka
                </p>
              )}
            </div>

            {/* Panduan Ukuran Baju (disembunyikan, lihat SHOW_SIZE_GUIDE) */}
            {SHOW_SIZE_GUIDE && (
            <div className="bg-cream-terang border-2 border-ungu-heading rounded-2xl p-4 sm:p-5 shadow-[4px_4.5px_0_var(--color-ungu-heading)] text-left">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b-2 border-ungu-heading/20">
                <span className="text-sm">&#128207;</span>
                <h3 className="font-dm-sans font-black text-sm sm:text-base text-ungu-heading">
                  Panduan Ukuran Baju (cm)
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-dm-sans text-[11px] sm:text-xs">
                  <thead>
                    <tr className="border-b border-ungu-heading/30 font-black text-ungu-heading">
                      <th className="py-1.5 px-2">Size</th>
                      <th className="py-1.5 px-2">Lebar Dada</th>
                      <th className="py-1.5 px-2">Panjang Baju</th>
                      <th className="py-1.5 px-2">Lengan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ungu-heading/15">
                    {SIZE_GUIDE_ROWS.map((row) => (
                      <tr key={row.size}>
                        <td className="py-1.5 px-2 font-black text-ungu-heading">{row.size}</td>
                        <td className="py-1.5 px-2 text-ungu-heading/85">{row.chest}</td>
                        <td className="py-1.5 px-2 text-ungu-heading/85">{row.length}</td>
                        <td className="py-1.5 px-2 text-ungu-heading/85">{row.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="font-dm-sans text-[10px] text-ungu-heading/65 mt-3 leading-snug italic">
                *Toleransi jahitan konveksi +/- 1.5 cm. Model boxy-fit santai.
              </p>
            </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
