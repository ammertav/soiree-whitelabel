/**
 * event.js
 * Utilitas data event dari backend (Api-White-1): URL gambar, slug, jam, dan status penjualan.
 */

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || "http://localhost:8000";

// Status event yang masih dijual. Sama dengan LISTED_STATUSES di backend.
const ON_SALE_STATUSES = ["Approve", "ON SALE"];

/**
 * URL gambar dari storage Organizer, null jika path kosong
 * @example storageUrl("img/poster.jpg") => "http://localhost:8000/storage/img/poster.jpg"
 */
export const storageUrl = (path) => (path ? `${STORAGE_URL}/storage/${path}` : null);

/**
 * Slug URL dari nama event (backend tidak memakai slug, hanya untuk keterbacaan URL)
 * @example slugify("Pentas Senja Yogyakarta") => "pentas-senja-yogyakarta"
 */
export const slugify = (text) =>
  String(text || "event")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "event";

/**
 * Path halaman detail event
 * @example eventPath({ id: 3, event: "Pentas Senja" }) => "/event/3/pentas-senja"
 */
export const eventPath = (event) => `/event/${event.id}/${slugify(event.event)}`;

/**
 * Jam WIB format 24 jam
 * @example formatClock("2027-03-27T09:00:00.000Z") => "16.00"
 */
export const formatClock = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
};

/**
 * Rentang jam acara; tanpa end_time menjadi "16.00 – Selesai"
 * @example formatClockRange(start, end) => "16.00 – 22.00 WIB"
 */
export const formatClockRange = (start, end) => {
  const from = formatClock(start);
  if (!from) return "";
  const to = formatClock(end);
  return to ? `${from} – ${to} WIB` : `${from} WIB – Selesai`;
};

/**
 * Event masih menjual tiket?
 */
export const isEventOnSale = (event) => ON_SALE_STATUSES.includes(event?.status);

/**
 * Teks polos dari HTML deskripsi (untuk meta description)
 */
export const stripHtml = (html) => String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

/**
 * Urutkan event dari tanggal paling awal
 */
export const sortByStartTime = (events = []) =>
  [...events].sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

/**
 * Kunci jawaban form per lembar tiket
 * @example ticketSlotKey(12, 0) => "12-0" (tiket id 12, lembar pertama)
 */
export const ticketSlotKey = (ticketId, slot) => `${ticketId}-${slot}`;
