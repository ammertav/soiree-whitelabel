import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MAX_TICKETS_PER_TRANSACTION,
  calculateOrderTotals,
  createTransaction,
} from "../../services/ticketService";
import {
  formatRupiah,
  formatClockRange,
  formatDateIndo,
  isEventOnSale,
  ticketSlotKey,
} from "../../utils";
import TicketCard from "./components/TicketCard";
import OrderSummarySidebar from "./components/OrderSummarySidebar";
import CustomerDataForm from "./components/CustomerDataForm";
import ParticipantForms from "./components/ParticipantForms";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field kosong menurut aturan backend; checkbox wajib harus dicentang
const isEmptyAnswer = (field, value) =>
  field.type === "checkbox" ? !value : value === undefined || value === null || String(value).trim() === "";

export default function EventDetailTicketSection({ event }) {
  const navigate = useNavigate();
  const tickets = useMemo(() => event.tickets || [], [event.tickets]);
  const isOnSale = isEventOnSale(event);

  // Field form registrasi dinamis dari form builder organizer
  const perTicketFields = useMemo(
    () => (event.form_fields || []).filter((f) => f.scope === "per_ticket"),
    [event.form_fields]
  );
  const perOrderFields = useMemo(
    () => (event.form_fields || []).filter((f) => f.scope === "per_order"),
    [event.form_fields]
  );

  // State kuantitas per ticket.id
  const [ticketQtys, setTicketQtys] = useState({});

  // State Notifikasi Limit Tiket
  const [limitNotice, setLimitNotice] = useState(null);

  // State Formulir Data Diri Pembeli & jawaban form dinamis
  const [customerData, setCustomerData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    agreedToTerms: false,
  });
  const [orderAnswers, setOrderAnswers] = useState({});
  const [ticketAnswers, setTicketAnswers] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const clearError = (key) => {
    if (formErrors[key]) {
      setFormErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const handleCustomerDataChange = (field, value) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const handleOrderAnswerChange = (fieldKey, value) => {
    setOrderAnswers((prev) => ({ ...prev, [fieldKey]: value }));
    clearError(`order.${fieldKey}`);
  };

  const handleTicketAnswerChange = (slot, fieldKey, value) => {
    setTicketAnswers((prev) => ({ ...prev, [slot]: { ...prev[slot], [fieldKey]: value } }));
    clearError(`${slot}.${fieldKey}`);
  };

  // State Modal Checkout & Submit API
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Kalkulasi Rincian Order
  const orderSummary = useMemo(() => calculateOrderTotals(tickets, ticketQtys), [tickets, ticketQtys]);

  const dateLabel = formatDateIndo(event.start_time, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
  const timeLabel = formatClockRange(event.start_time, event.end_time);

  // Handler Stepper Kuantitas (dibatasi stok tiket & maksimal per transaksi)
  const handleQtyChange = (ticket, delta) => {
    setLimitNotice(null);
    setTicketQtys((prev) => {
      const current = prev[ticket.id] || 0;
      const nextQty = current + delta;
      if (nextQty < 0) return prev;

      if (delta > 0) {
        const currentTotal = Object.values(prev).reduce((sum, q) => sum + q, 0);
        if (currentTotal >= MAX_TICKETS_PER_TRANSACTION) {
          setLimitNotice(`Maksimal pemesanan adalah ${MAX_TICKETS_PER_TRANSACTION} tiket per transaksi.`);
          return prev;
        }
        if (nextQty > ticket.pcs) {
          setLimitNotice(`Sisa kuota tiket ${ticket.type} tidak mencukupi.`);
          return prev;
        }
      }

      return { ...prev, [ticket.id]: nextQty };
    });
  };

  // Validasi form; mengembalikan objek error (kosong = valid)
  const validateForm = () => {
    const errors = {};
    if (!customerData.fullName.trim()) errors.fullName = "Nama lengkap wajib diisi sesuai KTP/Paspor.";
    if (!customerData.email.trim()) errors.email = "Alamat email aktif wajib diisi.";
    else if (!EMAIL_PATTERN.test(customerData.email.trim())) errors.email = "Format alamat email tidak valid.";
    if (!customerData.whatsapp.trim()) errors.whatsapp = "Nomor WhatsApp aktif wajib diisi.";

    for (const field of perOrderFields) {
      if (field.is_required && isEmptyAnswer(field, orderAnswers[field.field_key])) {
        errors[`order.${field.field_key}`] = `${field.label} wajib diisi.`;
      }
    }

    for (const item of orderSummary.selectedItems) {
      for (let slot = 0; slot < item.qty; slot++) {
        const key = ticketSlotKey(item.id, slot);
        for (const field of perTicketFields) {
          if (field.is_required && isEmptyAnswer(field, ticketAnswers[key]?.[field.field_key])) {
            errors[`${key}.${field.field_key}`] = `${field.label} wajib diisi.`;
          }
        }
      }
    }

    if (!customerData.agreedToTerms) errors.agreedToTerms = "Anda harus menyetujui syarat & ketentuan sebelum melanjutkan.";
    return errors;
  };

  // Handler Lanjut ke Modal Konfirmasi
  const handleProceedToPayment = () => {
    if (orderSummary.totalTickets === 0) {
      setLimitNotice("Silakan pilih minimal 1 tiket untuk melanjutkan pemesanan.");
      return;
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLimitNotice("Mohon lengkapi formulir data diri terlebih dahulu.");
      return;
    }

    setLimitNotice(null);
    setSubmitError(null);
    setIsCheckoutModalOpen(true);
  };

  // Susun jawaban form dinamis sesuai format backend:
  // { order: {...}, tickets: [{ ticket_id, answers }] } — 1 entri per lembar tiket
  const buildFormAnswers = () => {
    if (perOrderFields.length === 0 && perTicketFields.length === 0) return null;

    const ticketsAnswers = [];
    if (perTicketFields.length > 0) {
      for (const item of orderSummary.selectedItems) {
        for (let slot = 0; slot < item.qty; slot++) {
          ticketsAnswers.push({ ticket_id: item.id, answers: ticketAnswers[ticketSlotKey(item.id, slot)] || {} });
        }
      }
    }

    return { order: orderAnswers, tickets: ticketsAnswers };
  };

  // Handler Submit: buat transaksi lalu ke halaman pembayaran Midtrans
  const handleConfirmPayment = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      event_id: event.id,
      tickets: orderSummary.selectedItems.map((item) => ({ ticket_id: item.id, qty: item.qty })),
      name: customerData.fullName.trim(),
      email: customerData.email.trim(),
      phone: customerData.whatsapp.trim(),
      form_answers: buildFormAnswers(),
    };

    try {
      const { transaction } = await createTransaction(payload);
      navigate(`/transaction/${transaction.id}/${transaction.no_order}`);
    } catch (error) {
      setSubmitError(error?.response?.data?.error || "Pemesanan gagal diproses. Silakan coba lagi.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-cream-tua pt-8 sm:pt-10 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">

          {/* Kolom Kiri: Pilihan Tiket & Form */}
          <div className="lg:col-span-8 w-full space-y-6">

            {/* Header Pilihan Tiket & Batas Maksimal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <h2 className="font-fraunces font-black text-2xl sm:text-[28px] text-ungu-heading leading-tight">
                  Pilihan Tiket
                </h2>
                <p className="font-dm-sans text-xs sm:text-sm text-ungu-heading/75 mt-0.5">
                  Amankan akses ke {event.event}.
                </p>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-terang border-2 border-ungu-heading text-ungu-heading font-dm-sans font-black text-[11px] sm:text-xs tracking-wider uppercase shadow-xs">
                  <svg className="w-3.5 h-3.5 text-hijau" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>MAKS. {MAX_TICKETS_PER_TRANSACTION} TIKET</span>
                </span>
              </div>
            </div>

            {/* Status Penjualan Ditutup */}
            {!isOnSale && (
              <div className="p-3 rounded-xl bg-merah/10 border-2 border-merah text-merah font-dm-sans text-xs font-black uppercase tracking-wider text-center">
                Penjualan tiket untuk event ini sudah ditutup.
              </div>
            )}

            {/* Alert Peringatan Limit Tiket */}
            {limitNotice && (
              <div className="p-3 rounded-xl bg-kuning-tua/20 border-2 border-kuning-tua text-ungu-heading font-dm-sans text-xs font-bold flex items-center justify-between animate-fadeIn">
                <span>{limitNotice}</span>
                <button
                  type="button"
                  onClick={() => setLimitNotice(null)}
                  className="text-ungu-heading hover:opacity-75 p-1 cursor-pointer"
                >
                  &times;
                </button>
              </div>
            )}

            {/* Daftar Tiket Format Stub Konser */}
            {tickets.length === 0 ? (
              <div className="bg-cream-terang border-2 border-dashed border-ungu-heading/40 rounded-2xl p-6 text-center font-dm-sans text-sm font-bold text-ungu-heading/60">
                Tiket untuk event ini belum tersedia.
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5">
                {tickets.map((ticket, index) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    index={index}
                    dateLabel={dateLabel}
                    timeLabel={timeLabel}
                    qty={ticketQtys[ticket.id] || 0}
                    onQtyChange={handleQtyChange}
                    canIncrement={isOnSale && orderSummary.totalTickets < MAX_TICKETS_PER_TRANSACTION}
                  />
                ))}
              </div>
            )}

            {/* Informasi Pengiriman E-Tiket */}
            <div className="bg-cream-terang border border-ungu-heading/30 rounded-xl p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
              <svg className="w-4 h-4 text-hijau shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <p className="font-dm-sans text-xs text-ungu-heading/85 leading-relaxed">
                <strong className="text-ungu-heading font-bold">Transparansi Penuh:</strong> E-tiket beserta QR Code gerbang masuk dikirim ke email Anda setelah pembayaran berhasil. Maksimal {MAX_TICKETS_PER_TRANSACTION} tiket per transaksi.
              </p>
            </div>

            {/* Formulir Data Diri Pembeli */}
            <CustomerDataForm
              formData={customerData}
              onChange={handleCustomerDataChange}
              errors={formErrors}
              orderFields={perOrderFields}
              orderAnswers={orderAnswers}
              onOrderAnswerChange={handleOrderAnswerChange}
              hasTerms={!!event.syarat}
            />

            {/* Formulir Data Peserta per Lembar Tiket */}
            <ParticipantForms
              tickets={tickets}
              quantities={ticketQtys}
              fields={perTicketFields}
              answers={ticketAnswers}
              onAnswerChange={handleTicketAnswerChange}
              errors={formErrors}
            />

            {/* Syarat & Ketentuan Event (dari organizer) */}
            {event.syarat && (
              <article
                id="syarat-ketentuan"
                className="bg-cream-terang border-2 border-ungu-heading rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[5px_5px_0_var(--color-ungu-heading)] scroll-mt-28"
              >
                <h2 className="font-fraunces font-black text-2xl sm:text-[26px] text-ungu-heading leading-tight mb-3">
                  Syarat &amp; Ketentuan
                </h2>
                <div
                  className="font-dm-sans text-xs sm:text-sm text-ungu-heading/85 leading-relaxed space-y-2"
                  dangerouslySetInnerHTML={{ __html: event.syarat }}
                />
              </article>
            )}

          </div>

          {/* Kolom Kanan: Sticky Sidebar Ringkasan Pesanan */}
          <OrderSummarySidebar
            orderSummary={orderSummary}
            onProceedToPayment={handleProceedToPayment}
            isOnSale={isOnSale}
          />

        </div>

      </div>

      {/* Modal Dialog Konfirmasi Pemesanan */}
      {isCheckoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-cream-terang border-2 border-ungu-heading rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-[6px_6px_0_var(--color-ungu-heading)] relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b-2 border-ungu-heading/20">
              <h3 className="font-fraunces font-black text-xl text-ungu-heading">
                Konfirmasi Pesanan Tiket
              </h3>
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                disabled={isSubmitting}
                className="w-8 h-8 rounded-full border border-ungu-heading/40 flex items-center justify-center text-ungu-heading hover:bg-cream-tua cursor-pointer disabled:opacity-40"
              >
                &times;
              </button>
            </div>

            <p className="font-dm-sans text-xs text-ungu-heading/85 mb-4 leading-relaxed">
              Pastikan rincian tiket Anda sudah sesuai sebelum dialihkan ke halaman pembayaran.
            </p>

            {/* Ringkasan Identitas Pembeli */}
            <div className="bg-cream-tua/60 border border-ungu-heading/20 rounded-xl p-3.5 mb-3 space-y-1 text-xs font-dm-sans">
              <span className="block font-bold text-ungu-heading uppercase mb-1">
                Identitas Pembeli
              </span>
              <div className="flex justify-between gap-3">
                <span className="text-ungu-heading/70">Nama:</span>
                <span className="font-bold text-ungu-heading text-right">{customerData.fullName}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-ungu-heading/70">Kontak:</span>
                <span className="font-bold text-ungu-heading text-right break-all">{customerData.whatsapp} · {customerData.email}</span>
              </div>
            </div>

            <div className="bg-cream-tua/60 border border-ungu-heading/20 rounded-xl p-3.5 mb-4 space-y-2 text-xs font-dm-sans">
              <span className="block font-bold text-ungu-heading uppercase">
                Rincian Tiket ({orderSummary.totalTickets} tiket)
              </span>
              {orderSummary.selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.qty}x {item.type}</span>
                  <span className="font-bold">{formatRupiah(item.total)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-ungu-heading/20 flex justify-between font-bold">
                <span>Subtotal:</span>
                <span className="font-fraunces text-base text-ungu-heading">{formatRupiah(orderSummary.subtotal)}</span>
              </div>
              <p className="text-[11px] text-ungu-heading/60">
                Biaya layanan ditambahkan dan ditampilkan di halaman pembayaran.
              </p>
            </div>

            {submitError && (
              <div role="alert" className="p-3 mb-4 rounded-xl bg-merah/10 border-2 border-merah text-merah font-dm-sans text-xs font-bold">
                {submitError}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={isSubmitting}
                className="flex-1 font-dm-sans font-black text-xs uppercase bg-kuning-tua hover:bg-kuning-muda text-ungu-heading py-3 rounded-full border-2 border-ungu-heading shadow-[2px_2px_0_var(--color-ungu-heading)] active:translate-y-0.5 cursor-pointer transition-all disabled:opacity-60 disabled:cursor-wait"
              >
                {isSubmitting ? "Memproses Pesanan..." : "Lanjut Bayar Sekarang"}
              </button>
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                disabled={isSubmitting}
                className="px-4 py-3 font-dm-sans font-bold text-xs text-ungu-heading/70 hover:text-ungu-heading cursor-pointer disabled:opacity-40"
              >
                Ubah Pilihan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
