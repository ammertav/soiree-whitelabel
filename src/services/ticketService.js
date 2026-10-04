import {
  TICKETS_CATALOG,
  VALID_VOUCHERS,
  MAX_TICKETS_PER_TRANSACTION,
} from "../data/pemesananData";

import { formatRupiah } from "../utils";

export { formatRupiah };

export const getTicketsCatalog = () => TICKETS_CATALOG;

export const applyVoucherCode = (code, subtotal) => {
  const cleanCode = (code || "").trim().toUpperCase();
  const voucher = VALID_VOUCHERS[cleanCode];

  if (!voucher) {
    return {
      valid: false,
      discount: 0,
      message: "Kode promo tidak ditemukan atau sudah kedaluwarsa.",
    };
  }

  if (subtotal < voucher.minPurchase) {
    return {
      valid: false,
      discount: 0,
      message: `Minimal transaksi untuk voucher ${cleanCode} adalah ${formatRupiah(voucher.minPurchase)}.`,
    };
  }

  return {
    valid: true,
    discount: voucher.discountAmount,
    voucher,
    message: `Voucher ${cleanCode} berhasil digunakan (-${formatRupiah(voucher.discountAmount)}).`,
  };
};

export const calculateOrderTotals = (ticketQuantities, discount = 0) => {
  let subtotal = 0;
  let totalTickets = 0;
  const selectedItems = [];

  for (const ticket of TICKETS_CATALOG) {
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

  const effectiveDiscount = Math.min(discount, subtotal);
  const totalPayment = Math.max(0, subtotal - effectiveDiscount);

  return {
    subtotal,
    discount: effectiveDiscount,
    totalPayment,
    totalTickets,
    selectedItems,
  };
};

export const submitTicketOrder = async (orderPayload) => {
  // Simulasi pesanan lokal (backend API belum tersedia)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: `TKT-${Date.now().toString().slice(-6)}`,
        data: orderPayload,
      });
    }, 400);
  });
};

export { MAX_TICKETS_PER_TRANSACTION };
