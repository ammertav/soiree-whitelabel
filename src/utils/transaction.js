/**
 * transaction.js
 * Utilitas data transaksi dari backend (status Midtrans: pending | settlement | expire).
 */

/**
 * Path halaman pembayaran & konfirmasi transaksi
 */
export const transactionPath = (transaction) => `/transaction/${transaction.id}/${transaction.no_order}`;
export const confirmationPath = (transaction) => `${transactionPath(transaction)}/confirmation`;

/**
 * Jumlah lembar tiket dalam transaksi (dari pivot TransTick)
 */
export const countTransactionTickets = (transaction) =>
  (transaction?.tickets || []).reduce((sum, ticket) => sum + (ticket.TransTick?.qty || 0), 0);

/**
 * Tanggal & jam WIB lengkap
 * @example formatDateTimeIndo("2027-03-24T07:32:00.000Z") => "24 Maret 2027, 14.32 WIB"
 */
export const formatDateTimeIndo = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  const day = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
  const time = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
  return `${day}, ${time} WIB`;
};
