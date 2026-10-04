/**
 * formatters.js
 * Kumpulan fungsi utilitas formatting global (mata uang, waktu, tanggal)
 */

/**
 * Format angka ke format mata uang Rupiah Indonesia
 * @example formatRupiah(45000) => "Rp 45.000"
 */
export const formatRupiah = (val) => `Rp ${Number(val || 0).toLocaleString("id-ID")}`;

/**
 * Format durasi detik ke format countdown "MM:SS"
 * @example formatCountdown(872) => "14:32"
 */
export const formatCountdown = (totalSeconds) => {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds || 0));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

/**
 * Format string tanggal ke format standar Indonesia
 * @example formatDateIndo("2027-03-27") => "Sabtu, 27 Maret 2027"
 */
export const formatDateIndo = (
  dateStr,
  options = { weekday: "long", day: "numeric", month: "long", year: "numeric" }
) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString("id-ID", options);
};

/**
 * Format string tanggal ke format ringkas internasional
 * @example formatShortDate("2027-03-27") => "MAR 27, 2027"
 */
export const formatShortDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    .toUpperCase();
};

/**
 * Format jam dan menit 12-jam (AM/PM)
 * @example formatTime("2027-03-27T16:00:00") => "4 PM"
 */
export const formatTime = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours} ${ampm}`;
};

/**
 * Ekstraksi nama kota dari string lokasi lengkap
 * @example extractCity("PKKH UGM, Sleman, Yogyakarta") => "Yogyakarta"
 */
export const extractCity = (location) => {
  if (!location) return "";
  const parts = location.split(",");
  return parts.length > 0 ? parts[parts.length - 1].trim() : location;
};
