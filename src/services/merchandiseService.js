/**
 * Data Master Katalog Cenderamata Resmi Festival (sumber: Konsep 02 — Key Visual & Aplikasi).
 * Harga belum diumumkan (price: null). Pembelian dilakukan di e-commerce;
 * engine e-ticketing tidak menangani checkout merchandise.
 * Urutan array = urutan tampil default.
 */
export const PRODUCTS_DATA = [
  {
    id: "long-sleeve-krem",
    name: "Long Sleeve – Krem",
    category: "pakaian",
    categoryLabel: "PAKAIAN RESMI",
    desc: "Ilustrasi penuh di depan; pita papan catur dan mata di lengan.",
    price: null,
    url: "", // link produk di e-commerce; kosong = link toko
    image: null, // foto produk belum tersedia → placeholder
  },
  {
    id: "long-sleeve-teal",
    name: "Long Sleeve – Teal",
    category: "pakaian",
    categoryLabel: "PAKAIAN RESMI",
    desc: "Wordmark dan mata bunga di punggung; pita di lengan.",
    price: null,
    url: "",
    image: null, // foto produk belum tersedia → placeholder
  },
  {
    id: "bucket-hat-krem",
    name: "Bucket Hat – Krem",
    category: "aksesoris",
    categoryLabel: "AKSESORIS TOPI",
    desc: "Emblem kepala kucing dan pinggiran papan catur.",
    price: null,
    url: "",
    image: null, // foto produk belum tersedia → placeholder
  },
  {
    id: "bucket-hat-teal",
    name: "Bucket Hat – Teal",
    category: "aksesoris",
    categoryLabel: "AKSESORIS TOPI",
    desc: "Emblem kepala kucing dan pinggiran papan catur.",
    price: null,
    url: "",
    image: null, // foto produk belum tersedia → placeholder
  },
  {
    id: "canvas-bag",
    name: "Canvas Bag",
    category: "tas",
    categoryLabel: "TAS & CANVAS",
    desc: "Komposisi key visual dengan margin kain polos.",
    price: null,
    url: "",
    image: null, // foto produk belum tersedia → placeholder
  },
  {
    id: "sticker-pack",
    name: "Sticker Pack",
    category: "kolektibel",
    categoryLabel: "KOLEKTIBEL",
    desc: "Enam stiker kiss-cut dari object pack.",
    price: null,
    url: "",
    image: null, // foto produk belum tersedia → placeholder
  },
  {
    id: "gelang-tiket",
    name: "Gelang Tiket",
    category: "kolektibel",
    categoryLabel: "KOLEKTIBEL",
    desc: "Day 01 teal, Day 02 merah muda, 2-Day kuning.",
    price: null,
    url: "",
    image: null, // foto produk belum tersedia → placeholder
  },
];

export const SIZE_GUIDE_ROWS = [
  { size: "S", chest: "50 cm", length: "70 cm", sleeve: "58 cm" },
  { size: "M", chest: "54 cm", length: "73 cm", sleeve: "60 cm" },
  { size: "L", chest: "58 cm", length: "76 cm", sleeve: "62 cm" },
  { size: "XL", chest: "62 cm", length: "78 cm", sleeve: "64 cm" },
  { size: "XXL", chest: "66 cm", length: "80 cm", sleeve: "66 cm" },
];

import { formatRupiah } from "../utils";
export { formatRupiah };

// Link toko e-commerce resmi (fallback bila produk belum punya link sendiri)
export const MERCHANDISE_STORE_URL = (import.meta.env.VITE_MERCHANDISE_STORE_URL || "").trim();

/**
 * Link pembelian produk: url produk, atau link toko bila kosong. null = belum tersedia.
 */
export const getProductStoreUrl = (product) => (product?.url || "").trim() || MERCHANDISE_STORE_URL || null;
