/**
 * whatsapp.js
 * Link wa.me ke nomor WhatsApp panitia (VITE_WHATSAPP_NUMBER).
 */

// Nomor dinormalisasi ke format internasional tanpa simbol: 0812... → 62812...
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, "").replace(/^0/, "62");

/**
 * Nomor WhatsApp panitia untuk tampilan, null jika belum diatur
 * @example whatsappDisplayNumber() => "+6281234567890"
 */
export const whatsappDisplayNumber = () => (WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : null);

/**
 * Link wa.me dengan pesan terisi, null jika nomor belum diatur
 */
export const whatsappUrl = (message = "") => {
  if (!WHATSAPP_NUMBER) return null;
  return message
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;
};
