import api from "../api";
import { MAX_TICKETS_PER_TRANSACTION } from "../data/eventDetailData";
import { formatRupiah } from "../utils";

export { formatRupiah, MAX_TICKETS_PER_TRANSACTION };

/**
 * Rincian pesanan dari tiket event (backend) dan kuantitas per ticket.id.
 * Biaya layanan dihitung backend saat transaksi dibuat, jadi tidak termasuk di sini.
 */
export const calculateOrderTotals = (tickets = [], ticketQuantities = {}) => {
  let subtotal = 0;
  let totalTickets = 0;
  const selectedItems = [];

  for (const ticket of tickets) {
    const qty = ticketQuantities[ticket.id] || 0;
    if (qty > 0) {
      subtotal += ticket.price * qty;
      totalTickets += qty;
      selectedItems.push({
        ...ticket,
        qty,
        total: ticket.price * qty,
      });
    }
  }

  return {
    subtotal,
    totalTickets,
    selectedItems,
  };
};

/**
 * Buat transaksi di backend. Mengembalikan { snapToken, transaction, guestId }.
 * Payload: { event_id, tickets: [{ ticket_id, qty }], name, email, phone, form_answers }
 */
export const createTransaction = async (payload) => {
  const { data } = await api.post("/posttransaction", payload);
  return data;
};
