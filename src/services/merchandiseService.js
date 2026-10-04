import api from "../api";

// Asset foto produk resmi cenderamata Soirée Dansante 2027
import imgTshirtWhite from "../assets/images-katalog/node-160.png";
import imgTshirtTeal from "../assets/images-katalog/node-189.png";
import imgBucketDual from "../assets/images-katalog/node-208.png";
import imgBucketClassic from "../assets/images-katalog/node-226.png";
import imgToteBag from "../assets/images-katalog/node-244.png";
import imgStickerPack from "../assets/images-katalog/node-262.png";
import imgWristband from "../assets/images-katalog/node-280.png";
import imgBoxSet from "../assets/images-katalog/node-302.png";
import imgPinSet from "../assets/images-katalog/node-321.png";

/**
 * Data Master Katalog Cenderamata Resmi Festival
 */
export const PRODUCTS_DATA = [
  {
    id: "long-sleeve-krem",
    name: "Long Sleeve Teatrikal – Krem Vintage",
    category: "pakaian",
    categoryLabel: "PAKAIAN RESMI",
    badge: "BESTSELLER",
    badgeColor: "bg-merah text-cream-tua",
    desc: "Katun Heavyweight 16s, sablon puff plastisol tebal.",
    sizes: ["S", "M", "L", "XL"],
    defaultSize: "L",
    price: 225000,
    image: imgTshirtWhite,
    popularity: 100,
    stock: 12,
  },
  {
    id: "long-sleeve-teal",
    name: "Long Sleeve Kucing – Deep Teal",
    category: "pakaian",
    categoryLabel: "PAKAIAN RESMI",
    badge: "EDISI TERBATAS",
    badgeColor: "bg-kuning-tua text-ungu-heading",
    desc: "100% Combed 20s, washed look bernuansa panggung.",
    sizes: ["M", "L", "XL", "XXL"],
    defaultSize: "L",
    price: 225000,
    image: imgTshirtTeal,
    popularity: 98,
    stock: 8,
  },
  {
    id: "bucket-hat-reversible",
    name: "Bucket Hat Reversible Catur & Teal",
    category: "aksesoris",
    categoryLabel: "AKSESORIS TOPI",
    badge: "DUAL LOOK",
    badgeColor: "bg-pink-custom text-ungu-heading",
    desc: "Dua sisi bisa dibalik. Katun twill tebal, bordir timbul.",
    price: 135000,
    image: imgBucketDual,
    popularity: 96,
    stock: 5,
  },
  {
    id: "bucket-hat-classic",
    name: "Bucket Hat Classic – Krem Vintage",
    category: "aksesoris",
    categoryLabel: "AKSESORIS TOPI",
    badge: "FAVORIT",
    badgeColor: "bg-cream-terang text-ungu-heading border-ungu-heading",
    desc: "Washed Canvas Krem, bordir logo kepala kucing teatrikal.",
    price: 125000,
    image: imgBucketClassic,
    popularity: 94,
    stock: 1, // Sisa 1 pcs untuk simulasi batas stok
  },
  {
    id: "tote-bag-canvas",
    name: "Heavy Canvas Tote Bag 14oz",
    category: "tas",
    categoryLabel: "TAS & CANVAS",
    badge: "MUAT BANYAK",
    badgeColor: "bg-tosca-muda text-ungu-heading",
    desc: "Natural Canvas, resleting YKK, muat laptop 15 inch & botol.",
    price: 110000,
    image: imgToteBag,
    popularity: 92,
    stock: 10,
  },
  {
    id: "sticker-pack",
    name: "Sticker Pack Teatrikal (8 Karakter)",
    category: "kolektibel",
    categoryLabel: "KOLEKTIBEL",
    badge: "VINYL ANTI-AIR",
    badgeColor: "bg-kuning-tua text-ungu-heading",
    desc: "Vinyl laminasi doff tahan cuaca untuk helm & laptop.",
    price: 45000,
    image: imgStickerPack,
    popularity: 90,
    stock: 20,
  },
  {
    id: "wristband-set",
    name: "Replika Gelang Tenun (Wristband)",
    category: "kolektibel",
    categoryLabel: "KOLEKTIBEL",
    badge: "EDISI SPESIAL",
    badgeColor: "bg-pink-custom text-ungu-heading",
    desc: "Set 3 gelang tenun jacquard edisi Day 1, Day 2, dan 2-Day Pass.",
    price: 35000,
    image: imgWristband,
    popularity: 88,
    stock: 2, // Sisa 2 pcs
  },
  {
    id: "box-set-bundel",
    name: "Bundel Lengkap Box Set Teatrikal",
    category: "pakaian",
    categoryLabel: "PAKET HEMAT",
    badge: "HEMAT 15%",
    badgeColor: "bg-merah text-cream-tua",
    desc: "Kotak panggung eksklusif isi kaos, bucket hat, tote bag, dan gelang.",
    price: 440000,
    image: imgBoxSet,
    popularity: 86,
    stock: 3, // Sisa 3 pcs
  },
  {
    id: "enamel-pin-set",
    name: "Pin Enamel Set Maskot Teatrikal",
    category: "kolektibel",
    categoryLabel: "KOLEKTIBEL",
    badge: "PIN LOGAM",
    badgeColor: "bg-kuning-tua text-ungu-heading",
    desc: "Set 3 pin enamel lapis emas: Kuda Karnaval, Topeng Teater, & Popcorn.",
    price: 75000,
    image: imgPinSet,
    popularity: 84,
    stock: 14,
  },
];

export const SIZE_GUIDE_ROWS = [
  { size: "S", chest: "50 cm", length: "70 cm", sleeve: "58 cm" },
  { size: "M", chest: "54 cm", length: "73 cm", sleeve: "60 cm" },
  { size: "L", chest: "58 cm", length: "76 cm", sleeve: "62 cm" },
  { size: "XL", chest: "62 cm", length: "78 cm", sleeve: "64 cm" },
  { size: "XXL", chest: "66 cm", length: "80 cm", sleeve: "66 cm" },
];

/**
 * Format angka ke format mata uang Rupiah
 */
export const formatRupiah = (val) => `Rp ${Number(val || 0).toLocaleString("id-ID")}`;

/**
 * Ambil produk berdasarkan ID
 */
export const getProductById = (productId) => {
  return PRODUCTS_DATA.find((p) => p.id === productId) || null;
};

/**
 * Cek ketersediaan stok produk terhadap jumlah yang diminta
 */
export const checkStockAvailability = (productId, requestedQty = 1) => {
  const product = getProductById(productId);
  if (!product) {
    return { available: false, stock: 0, message: "Produk tidak ditemukan." };
  }

  const stock = product.stock ?? 10;
  if (stock <= 0) {
    return {
      available: false,
      stock: 0,
      message: `Mohon maaf, "${product.name}" saat ini sudah habis terjual (Sold Out).`,
    };
  }

  if (requestedQty > stock) {
    return {
      available: false,
      stock,
      message: `Stok "${product.name}" terbatas (${stock} pcs).`,
    };
  }

  return { available: true, stock, message: "Stok tersedia." };
};

/**
 * Validasi seluruh item keranjang terhadap stok master sebelum checkout
 */
export const validateCartStock = (cartItems = []) => {
  const errors = [];

  for (const item of cartItems) {
    const product = getProductById(item.productId);
    const availableStock = product?.stock ?? 10;

    // Hitung total unit produk ini di seluruh baris keranjang
    const totalInCart = cartItems
      .filter((ci) => ci.productId === item.productId)
      .reduce((sum, ci) => sum + ci.qty, 0);

    if (product && totalInCart > availableStock) {
      errors.push({
        productId: item.productId,
        title: item.title,
        stock: availableStock,
        requested: totalInCart,
        message: `Jumlah "${item.title}" (${totalInCart} pcs) melebihi stok yang tersedia (${availableStock} pcs).`,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Hitung kalkulasi rincian biaya keranjang & pengiriman
 */
export const calculateCartTotals = (cartItems = [], shippingMethod = "venue") => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingCost = shippingMethod === "delivery" ? 25000 : 0;
  const totalAmount = subtotal + shippingCost;
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return {
    subtotal,
    shippingCost,
    totalAmount,
    totalItemCount,
  };
};

/**
 * Submit pesanan cenderamata ke endpoint API
 * Jika backend belum aktif, mengembalikan respons simulasi terverifikasi.
 */
export const submitMerchandiseOrder = async (orderPayload) => {
  try {
    const response = await api.post("/merchandise/orders", orderPayload);
    return { success: true, data: response.data };
  } catch (error) {
    // Mode simulasi fallback saat offline / dev lokal tanpa backend
    console.warn("Backend API offline atau belum tersedia, menggunakan simulasi pesanan:", error?.message);
    return {
      success: true,
      simulated: true,
      orderId: `SDM-${Date.now().toString().slice(-6)}`,
      data: orderPayload,
    };
  }
};
