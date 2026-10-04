import { useState, useMemo, useEffect } from "react";
import {
  FaBagShopping,
  FaXmark,
  FaPlus,
  FaMinus,
  FaCheck,
  FaTriangleExclamation,
  FaCircleCheck,
} from "react-icons/fa6";
import MerchandiseFilterBar from "./MerchandiseFilterBar";
import {
  PRODUCTS_DATA,
  SIZE_GUIDE_ROWS,
  formatRupiah,
  getProductById,
  validateCartStock,
  calculateCartTotals,
  submitMerchandiseOrder,
} from "../../services/merchandiseService";

export default function MerchandiseCatalogSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // State ukuran terpilih per produk t-shirt
  const [selectedSizes, setSelectedSizes] = useState({
    "long-sleeve-krem": "L",
    "long-sleeve-teal": "L",
  });

  // State Keranjang Belanja (default 2 item persis seperti di gambar desain)
  const [cartItems, setCartItems] = useState([
    {
      id: "cart-1",
      productId: "long-sleeve-krem",
      title: "Long Sleeve Teatrikal (Krem)",
      variant: "Ukuran: L",
      price: 225000,
      qty: 1,
    },
    {
      id: "cart-2",
      productId: "bucket-hat-reversible",
      title: "Bucket Hat Reversible",
      variant: "All Size",
      price: 135000,
      qty: 1,
    },
  ]);

  // Metode pengambilan: 'venue' (Gratis) atau 'delivery' (+Rp 25.000)
  const [shippingMethod, setShippingMethod] = useState("venue");

  // State notifikasi stok, modal checkout, dan loading API
  const [stockNotice, setStockNotice] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Auto-dismiss notifikasi stok setelah 4 detik
  useEffect(() => {
    if (!stockNotice) return;
    const timer = setTimeout(() => {
      setStockNotice(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [stockNotice]);

  // Handler Pilih Ukuran Kaos
  const handleSelectSize = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  // Helper: hitung total unit produk tertentu yang sudah ada di keranjang
  const getProductQtyInCart = (productId) => {
    return cartItems
      .filter((item) => item.productId === productId)
      .reduce((sum, item) => sum + item.qty, 0);
  };

  // Handler Tambah ke Keranjang dengan Validasi Stok Layanan
  const handleAddToCart = (product) => {
    const totalInCart = getProductQtyInCart(product.id);
    const availableStock = product.stock ?? 10;

    // Jika stok habis
    if (availableStock <= 0) {
      setStockNotice({
        type: "error",
        message: `Mohon maaf, "${product.name}" saat ini sudah habis terjual (Sold Out).`,
      });
      return;
    }

    // Jika user sudah mengambil seluruh kuota stok yang tersedia
    if (totalInCart >= availableStock) {
      setStockNotice({
        type: "warning",
        message: `Stok "${product.name}" terbatas (${availableStock} pcs) dan semuanya sudah ada di keranjang belanja Anda.`,
      });
      return;
    }

    const size = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : null);
    const variantLabel = size ? `Ukuran: ${size}` : "All Size";

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.productId === product.id && item.variant === variantLabel
      );

      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          qty: next[existingIdx].qty + 1,
        };
        return next;
      }

      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          productId: product.id,
          title: product.name.split("–")[0].trim(),
          variant: variantLabel,
          price: product.price,
          qty: 1,
        },
      ];
    });

    setStockNotice({
      type: "success",
      message: `"${product.name}" (${variantLabel}) berhasil ditambahkan ke keranjang.`,
    });
  };

  // Handler Ubah Kuantitas di Keranjang (+ / -) dengan Cek Batas Stok
  const handleUpdateCartQty = (cartId, delta) => {
    setCartItems((prev) => {
      const targetItem = prev.find((item) => item.id === cartId);
      if (!targetItem) return prev;

      const product = getProductById(targetItem.productId);
      const availableStock = product?.stock ?? 10;
      const totalInCartForProduct = prev
        .filter((item) => item.productId === targetItem.productId)
        .reduce((sum, item) => sum + item.qty, 0);

      // Tambah kuantitas: cek apakah melebihi stok yang ada
      if (delta > 0) {
        if (totalInCartForProduct >= availableStock) {
          setStockNotice({
            type: "warning",
            message: `Batas stok tercapai. Maksimal pembelian "${targetItem.title}" adalah ${availableStock} pcs.`,
          });
          return prev;
        }
      }

      // Kurangi kuantitas: jika sudah 1, kurangi lagi berarti hapus item
      if (delta < 0 && targetItem.qty <= 1) {
        return prev.filter((item) => item.id !== cartId);
      }

      return prev.map((item) => {
        if (item.id === cartId) {
          return { ...item, qty: item.qty + delta };
        }
        return item;
      });
    });
  };

  // Handler Hapus Item dari Keranjang
  const handleRemoveFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartId));
  };

  // Handler Lanjut ke Pembayaran dengan Validasi Layanan
  const handleCheckout = () => {
    const stockValidation = validateCartStock(cartItems);
    if (!stockValidation.valid) {
      setStockNotice({
        type: "error",
        message: stockValidation.errors[0]?.message || "Stok tidak mencukupi untuk beberapa barang.",
      });
      return;
    }
    setCheckoutModalOpen(true);
  };

  // Perhitungan Subtotal & Biaya via merchandiseService
  const { subtotal, shippingCost, totalAmount: totalEstimasi, totalItemCount } = useMemo(() => {
    return calculateCartTotals(cartItems, shippingMethod);
  }, [cartItems, shippingMethod]);

  // Handler Konfirmasi Pesanan & Integrasi API
  const handleConfirmOrder = async () => {
    setIsSubmittingOrder(true);
    const orderPayload = {
      items: cartItems.map((item) => ({
        productId: item.productId,
        title: item.title,
        variant: item.variant,
        quantity: item.qty,
        price: item.price,
      })),
      fulfillmentMethod: shippingMethod,
      shippingCost,
      subtotal,
      totalAmount: totalEstimasi,
    };

    const result = await submitMerchandiseOrder(orderPayload);
    setIsSubmittingOrder(false);
    setCheckoutModalOpen(false);

    if (result.success) {
      setStockNotice({
        type: "success",
        message: "Pesanan merchandise berhasil diverifikasi dan siap diproses ke pembayaran!",
      });
    }
  };

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
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name-az") return a.name.localeCompare(b.name);
      return b.popularity - a.popularity;
    });
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
                  const currentSize = selectedSizes[product.id] || product.defaultSize;
                  const availableStock = product.stock ?? 10;
                  const inCartQty = getProductQtyInCart(product.id);
                  const isOutOfStock = availableStock <= 0;
                  const isMaxInCart = inCartQty >= availableStock;
                  const isLowStock = !isOutOfStock && availableStock <= 3;

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

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>

                        {/* Kategori Eyebrow */}
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="block font-dm-sans font-extrabold text-[10px] sm:text-[11px] text-hijau uppercase tracking-wider">
                            {product.categoryLabel}
                          </span>
                          {isLowStock && (
                            <span className="font-dm-sans font-black text-[9px] text-merah bg-merah/10 px-1.5 py-0.5 rounded-full border border-merah/30 shrink-0">
                              Sisa {availableStock} pcs
                            </span>
                          )}
                        </div>

                        {/* Nama Produk */}
                        <h3 className="font-dm-sans font-bold text-sm sm:text-[15px] text-ungu-heading leading-snug line-clamp-2 min-h-[2.5rem]">
                          {product.name}
                        </h3>

                        {/* Deskripsi Singkat */}
                        <p className="font-dm-sans text-xs text-ungu-heading/75 line-clamp-2 mt-1 leading-relaxed min-h-[2rem]">
                          {product.desc}
                        </p>
                      </div>

                      {/* Bagian Bawah: Pilihan Ukuran & Harga + Tombol Tambah */}
                      <div className="mt-3.5 pt-3 border-t border-ungu-heading/15">
                        {/* Selector Ukuran (Jika Produk Berupa Baju) */}
                        {product.sizes && (
                          <div className="flex items-center gap-1.5 mb-3">
                            <span className="font-dm-sans font-bold text-[10px] text-ungu-heading/75 uppercase">
                              Size:
                            </span>
                            <div className="flex items-center gap-1">
                              {product.sizes.map((s) => {
                                const isSizeActive = currentSize === s;
                                return (
                                  <button
                                    key={s}
                                    type="button"
                                    onClick={() => handleSelectSize(product.id, s)}
                                    className={`px-1.5 py-0.5 min-w-[22px] text-[10px] font-dm-sans font-bold rounded-sm border cursor-pointer transition-all ${
                                      isSizeActive
                                        ? "bg-kuning-tua text-ungu-heading border-ungu-heading font-black"
                                        : "bg-cream-terang text-ungu-heading/70 border-ungu-heading/40 hover:border-ungu-heading"
                                    }`}
                                  >
                                    {s}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Baris Harga & Tombol Tambah / Status Stok */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-fraunces font-black text-base sm:text-lg text-ungu-heading tracking-tight block">
                              {formatRupiah(product.price)}
                            </span>
                          </div>

                          {isOutOfStock ? (
                            <span className="px-2.5 py-1 rounded-full bg-gray-200 border border-gray-400 font-dm-sans font-black text-[10px] text-gray-500 uppercase tracking-wider">
                              Habis
                            </span>
                          ) : isMaxInCart ? (
                            <button
                              type="button"
                              onClick={() => handleAddToCart(product)}
                              className="w-8 h-8 rounded-full bg-hijau hover:bg-hijau-tua border-2 border-ungu-heading flex items-center justify-center text-cream-tua shadow-[2px_2px_0_var(--color-ungu-heading)] active:translate-y-0.5 transition-all cursor-pointer"
                              title={`Semua stok produk ini (${availableStock} pcs) sudah ada di keranjang`}
                              aria-label={`${product.name} sudah maksimal di keranjang`}
                            >
                              <FaCheck className="w-3.5 h-3.5 stroke-[2]" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleAddToCart(product)}
                              className="w-8 h-8 rounded-full bg-kuning-tua hover:bg-kuning-muda border-2 border-ungu-heading flex items-center justify-center text-ungu-heading shadow-[2px_2px_0_var(--color-ungu-heading)] active:translate-y-0.5 transition-all cursor-pointer"
                              aria-label={`Tambah ${product.name} ke keranjang`}
                            >
                              <FaPlus className="w-3.5 h-3.5 stroke-[1.5]" />
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* --- KOLOM KANAN (4 COLS): SIDEBAR KERANJANG & PANDUAN UKURAN --- */}
          <aside className="lg:col-span-4 w-full space-y-6 lg:sticky lg:top-24">
            
            {/* BOX 1: KERANJANG BELANJA */}
            <div className="bg-cream-terang border-2 border-ungu-heading rounded-2xl p-4 sm:p-5 shadow-[4px_4.5px_0_var(--color-ungu-heading)]">
              {/* Header Keranjang */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b-2 border-ungu-heading/20">
                <div className="flex items-center gap-2">
                  <FaBagShopping className="w-4 h-4 text-ungu-heading" />
                  <h3 className="font-dm-sans font-black text-base sm:text-lg text-ungu-heading">
                    Keranjang Belanja
                  </h3>
                </div>
                <span className="font-dm-sans font-black text-[11px] text-ungu-heading bg-kuning-tua px-2.5 py-0.5 rounded-full border border-ungu-heading">
                  {totalItemCount} Item
                </span>
              </div>

              {/* Alert Notifikasi Stok */}
              {stockNotice && (
                <div
                  className={`mb-3.5 p-3 rounded-xl border text-xs font-dm-sans flex items-start gap-2 transition-all ${
                    stockNotice.type === "error"
                      ? "bg-merah/10 border-merah text-merah"
                      : stockNotice.type === "warning"
                      ? "bg-kuning-tua/25 border-kuning-tua text-ungu-heading"
                      : "bg-hijau/10 border-hijau text-hijau"
                  }`}
                >
                  {stockNotice.type === "error" || stockNotice.type === "warning" ? (
                    <FaTriangleExclamation className="w-4 h-4 shrink-0 mt-0.5 text-merah" />
                  ) : (
                    <FaCircleCheck className="w-4 h-4 shrink-0 mt-0.5 text-hijau" />
                  )}
                  <div className="flex-1 font-semibold leading-snug">{stockNotice.message}</div>
                  <button
                    type="button"
                    onClick={() => setStockNotice(null)}
                    className="text-current hover:opacity-70 p-0.5 cursor-pointer"
                  >
                    <FaXmark className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* List Item dalam Keranjang */}
              {cartItems.length === 0 ? (
                <div className="py-6 text-center text-ungu-heading/60 font-dm-sans text-xs">
                  Keranjang masih kosong. Pilih merchandise di samping untuk mulai berbelanja!
                </div>
              ) : (
                <div className="space-y-2.5 mb-4">
                  {cartItems.map((item) => {
                    const product = getProductById(item.productId);
                    const availableStock = product?.stock ?? 10;
                    const totalInCartForProduct = getProductQtyInCart(item.productId);
                    const canIncrement = totalInCartForProduct < availableStock;

                    return (
                      <div
                        key={item.id}
                        className="bg-cream-tua/50 border border-ungu-heading/30 rounded-xl p-3 flex items-center justify-between gap-2 text-left"
                      >
                        <div className="flex-1 min-w-0 pr-1">
                          <h4 className="font-dm-sans font-bold text-xs sm:text-sm text-ungu-heading leading-tight truncate">
                            {item.title}
                          </h4>
                          <span className="block font-dm-sans text-[11px] text-ungu-heading/70 mt-0.5">
                            {item.variant}
                          </span>
                        </div>

                        {/* Stepper Jumlah (- 1 +) */}
                        <div className="flex items-center gap-1.5 shrink-0 bg-cream-terang border border-ungu-heading/40 rounded-lg px-1.5 py-1 shadow-xs">
                          <button
                            type="button"
                            onClick={() => handleUpdateCartQty(item.id, -1)}
                            className="w-5 h-5 flex items-center justify-center rounded bg-cream-tua hover:bg-kuning-tua text-ungu-heading text-[10px] transition-colors cursor-pointer"
                            aria-label="Kurangi kuantitas"
                          >
                            <FaMinus className="w-2.5 h-2.5" />
                          </button>
                          <span className="font-dm-sans font-black text-xs text-ungu-heading px-1 min-w-[16px] text-center">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateCartQty(item.id, 1)}
                            disabled={!canIncrement}
                            className={`w-5 h-5 flex items-center justify-center rounded text-[10px] transition-colors cursor-pointer ${
                              canIncrement
                                ? "bg-cream-tua hover:bg-kuning-tua text-ungu-heading"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                            title={!canIncrement ? `Maksimal stok tercapai (${availableStock} pcs)` : "Tambah kuantitas"}
                            aria-label="Tambah kuantitas"
                          >
                            <FaPlus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        {/* Total Harga Item & Tombol Hapus */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="font-fraunces font-bold text-xs sm:text-sm text-ungu-heading min-w-[70px] text-right">
                            {formatRupiah(item.price * item.qty)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-merah hover:text-merah-tua p-1 transition-colors cursor-pointer"
                            aria-label={`Hapus ${item.title}`}
                          >
                            <FaXmark className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Box Pilihan Metode Pengambilan */}
              <div className="bg-[#244C47]/10 border border-ungu-heading/30 rounded-xl p-3.5 mb-4 text-left">
                <span className="block font-dm-sans font-black text-[10px] sm:text-[11px] uppercase tracking-wider text-ungu-heading mb-2.5 flex items-center gap-1.5">
                  <span>&#128193;</span> METODE PENGAMBILAN
                </span>

                <div className="space-y-2">
                  <label className="flex items-start gap-2 text-xs font-dm-sans font-semibold text-ungu-heading cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      value="venue"
                      checked={shippingMethod === "venue"}
                      onChange={() => setShippingMethod("venue")}
                      className="mt-0.5 accent-hijau-butek cursor-pointer"
                    />
                    <span>Ambil di Venue PRPP (Gratis &amp; Fast-Track)</span>
                  </label>

                  <label className="flex items-start gap-2 text-xs font-dm-sans font-semibold text-ungu-heading cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      value="delivery"
                      checked={shippingMethod === "delivery"}
                      onChange={() => setShippingMethod("delivery")}
                      className="mt-0.5 accent-hijau-butek cursor-pointer"
                    />
                    <span>Ekspedisi ke Alamat Rumah (+Rp 25.000)</span>
                  </label>
                </div>
              </div>

              {/* Rincian Subtotal & Biaya */}
              <div className="space-y-1.5 text-xs font-dm-sans text-ungu-heading/85 border-b border-ungu-heading/20 pb-3 mb-3">
                <div className="flex justify-between">
                  <span>Subtotal Barang:</span>
                  <span className="font-bold text-ungu-heading">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Biaya Penanganan / Booth:</span>
                  <span className="font-black text-hijau">
                    {shippingMethod === "delivery" ? "Rp 25.000" : "GRATIS"}
                  </span>
                </div>
              </div>

              {/* Total Estimasi */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-dm-sans font-bold text-sm text-ungu-heading">
                  Total Estimasi:
                </span>
                <span className="font-fraunces font-black text-lg sm:text-xl text-ungu-heading">
                  {formatRupiah(totalEstimasi)}
                </span>
              </div>

              {/* Tombol Lanjut ke Pembayaran */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full font-dm-sans font-black text-xs sm:text-sm tracking-wider uppercase bg-kuning-tua hover:bg-kuning-muda text-ungu-heading py-3.5 rounded-full border-2 border-ungu-heading shadow-[3px_3px_0_var(--color-ungu-heading)] active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>LANJUT KE PEMBAYARAN</span>
                <span>&rarr;</span>
              </button>

              {/* Subtext Keamanan */}
              <p className="font-dm-sans text-[10px] text-ungu-heading/70 text-center mt-3 leading-snug">
                Pemesanan aman terintegrasi dengan tiket festival Anda.
              </p>
            </div>

            {/* Panduan Ukuran Baju */}
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
          </aside>
        </div>
      </div>

      {/* Modal Dialog Konfirmasi Checkout (Simulasi Kesiapan Integrasi API) */}
      {checkoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-cream-terang border-2 border-ungu-heading rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-[6px_6px_0_var(--color-ungu-heading)] relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b-2 border-ungu-heading/20">
              <div className="flex items-center gap-2">
                <FaCircleCheck className="w-5 h-5 text-hijau" />
                <h3 className="font-fraunces font-black text-lg sm:text-xl text-ungu-heading">
                  Validasi Pesanan Berhasil
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                className="w-8 h-8 rounded-full border border-ungu-heading/40 flex items-center justify-center text-ungu-heading hover:bg-cream-tua cursor-pointer transition-colors"
                aria-label="Tutup modal"
              >
                <FaXmark className="w-4 h-4" />
              </button>
            </div>

            <p className="font-dm-sans text-xs text-ungu-heading/85 mb-4 leading-relaxed">
              Semua item telah diverifikasi dengan ketersediaan stok aktual. Data siap dikirim ke backend API &amp; Payment Gateway.
            </p>

            {/* Ringkasan Item Pesanan */}
            <div className="bg-cream-tua/60 border border-ungu-heading/20 rounded-xl p-3.5 mb-4 space-y-2">
              <span className="block font-dm-sans font-bold text-xs text-ungu-heading uppercase tracking-wide">
                Ringkasan Item ({totalItemCount} pcs)
              </span>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs font-dm-sans text-ungu-heading/90">
                  <span className="truncate pr-2">
                    {item.qty}x {item.title} ({item.variant})
                  </span>
                  <span className="font-bold shrink-0">{formatRupiah(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-ungu-heading/15 flex justify-between text-xs font-dm-sans">
                <span>Metode: {shippingMethod === "delivery" ? "Ekspedisi (+Rp 25.000)" : "Ambil di Booth (Gratis)"}</span>
                <span className="font-fraunces font-black text-sm text-ungu-heading">{formatRupiah(totalEstimasi)}</span>
              </div>
            </div>

            <div className="bg-[#244C47]/10 border border-ungu-heading/20 rounded-xl p-3 mb-5 text-[11px] font-dm-sans text-ungu-heading/80">
              <span className="font-bold block mb-1 text-ungu-heading">Payload API Siap:</span>
              <code className="text-[10px] bg-white/70 px-1.5 py-0.5 rounded border border-ungu-heading/20 block overflow-x-auto">
                POST /api/v1/orders/merchandise &bull; items: {cartItems.length}, total: {totalEstimasi}
              </code>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={isSubmittingOrder}
                className="flex-1 font-dm-sans font-black text-xs uppercase bg-kuning-tua hover:bg-kuning-muda disabled:opacity-50 text-ungu-heading py-3 rounded-full border-2 border-ungu-heading shadow-[2px_2px_0_var(--color-ungu-heading)] active:translate-y-0.5 cursor-pointer transition-all"
              >
                {isSubmittingOrder ? "Memproses Pesanan..." : "Konfirmasi & Bayar Sekarang"}
              </button>
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                className="px-4 py-3 font-dm-sans font-bold text-xs text-ungu-heading/70 hover:text-ungu-heading cursor-pointer"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
