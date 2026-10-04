import { useState, useEffect, useMemo } from "react";
import {
  getTicketsCatalog,
  MAX_TICKETS_PER_TRANSACTION,
  applyVoucherCode,
  calculateOrderTotals,
  submitTicketOrder,
} from "../../services/ticketService";
import { formatRupiah, formatCountdown } from "../../utils";
import TicketCard from "./components/TicketCard";
import PromoCodeBox from "./components/PromoCodeBox";
import OrderSummarySidebar from "./components/OrderSummarySidebar";
import CustomerDataForm from "./components/CustomerDataForm";

export default function PemesananTicketSection() {
  const tickets = useMemo(() => getTicketsCatalog(), []);

  // State kuantitas tiket (default 1 Day 1, 1 Bundle, 0 Festival)
  const [ticketQtys, setTicketQtys] = useState({
    "jogja-showcase": 1,
    "roadmap-bundle": 1,
    "festival-2day": 0,
  });

  // State Voucher Promo
  const [promoInput, setPromoInput] = useState("");
  const [activeDiscount, setActiveDiscount] = useState(0);
  const [promoFeedback, setPromoFeedback] = useState(null);

  // State Notifikasi Limit Tiket
  const [limitNotice, setLimitNotice] = useState(null);

  // State Formulir Data Diri Pembeli & Pengunjung
  const [customerData, setCustomerData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    gender: "LAKI-LAKI",
    birthDate: "",
    identityNumber: "",
    domicile: "",
    agreedToTerms: false,
  });
  const [formErrors, setFormErrors] = useState({});

  const handleCustomerDataChange = (field, value) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // State Modal Checkout & Submit API
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State Countdown Timer (14 menit 32 detik)
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 32);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formattedTimer = useMemo(() => formatCountdown(timeLeft), [timeLeft]);

  // Kalkulasi Rincian Order
  const orderSummary = useMemo(() => {
    return calculateOrderTotals(ticketQtys, activeDiscount);
  }, [ticketQtys, activeDiscount]);

  // Handler Stepper Kuantitas
  const handleQtyChange = (ticketId, delta) => {
    setLimitNotice(null);
    setTicketQtys((prev) => {
      const current = prev[ticketId] || 0;
      const nextQty = current + delta;
      if (nextQty < 0) return prev;

      const currentTotal = Object.values(prev).reduce((sum, q) => sum + q, 0);
      if (delta > 0 && currentTotal >= MAX_TICKETS_PER_TRANSACTION) {
        setLimitNotice(`Maksimal pemesanan adalah ${MAX_TICKETS_PER_TRANSACTION} tiket per transaksi.`);
        return prev;
      }

      return { ...prev, [ticketId]: nextQty };
    });
  };

  // Handler Terapkan Promo
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) {
      setPromoFeedback({ valid: false, message: "Silakan masukkan kode voucher terlebih dahulu." });
      return;
    }

    const result = applyVoucherCode(promoInput, orderSummary.subtotal);
    setPromoFeedback(result);
    setActiveDiscount(result.valid ? result.discount : 0);
  };

  // Handler Lanjut ke Modal Pembayaran
  const handleProceedToPayment = () => {
    if (orderSummary.totalTickets === 0) {
      setLimitNotice("Silakan pilih minimal 1 tiket untuk melanjutkan pemesanan.");
      return;
    }

    const errors = {};
    if (!customerData.fullName.trim()) errors.fullName = "Nama lengkap wajib diisi sesuai KTP/Paspor.";
    if (!customerData.email.trim()) errors.email = "Alamat email aktif wajib diisi.";
    if (!customerData.whatsapp.trim()) errors.whatsapp = "Nomor WhatsApp aktif wajib diisi.";
    if (!customerData.birthDate.trim()) errors.birthDate = "Tanggal lahir wajib diisi.";
    if (!customerData.identityNumber.trim()) errors.identityNumber = "NIK / No. Paspor wajib diisi.";
    if (!customerData.domicile) errors.domicile = "Silakan pilih asal domisili.";
    if (!customerData.agreedToTerms) errors.agreedToTerms = "Anda harus menyetujui syarat & ketentuan sebelum melanjutkan.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLimitNotice("Mohon lengkapi formulir Data Diri Pembeli & Pengunjung terlebih dahulu.");
      return;
    }

    setLimitNotice(null);
    setIsCheckoutModalOpen(true);
  };

  // Handler Submit Konfirmasi Pembayaran
  const handleConfirmPayment = async () => {
    setIsSubmitting(true);
    const payload = {
      items: orderSummary.selectedItems.map((item) => ({
        ticketId: item.id,
        title: item.title,
        quantity: item.qty,
        price: item.price,
        subtotal: item.total,
      })),
      customer: {
        fullName: customerData.fullName,
        email: customerData.email,
        whatsapp: customerData.whatsapp,
        gender: customerData.gender,
        birthDate: customerData.birthDate,
        identityNumber: customerData.identityNumber,
        domicile: customerData.domicile,
      },
      voucherCode: activeDiscount > 0 ? promoInput.trim().toUpperCase() : null,
      discountAmount: activeDiscount,
      totalAmount: orderSummary.totalPayment,
      timestamp: new Date().toISOString(),
    };

    const res = await submitTicketOrder(payload);
    setIsSubmitting(false);
    setIsCheckoutModalOpen(false);

    if (res.success) {
      alert("Pemesanan tiket berhasil diverifikasi! Menghubungkan ke gateway pembayaran...");
    }
  };

  return (
    <section className="w-full bg-cream-tua pt-8 sm:pt-10 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
          
          {/* Kolom Kiri: Pilihan Tiket & Promo */}
          <div className="lg:col-span-8 w-full space-y-6">
            
            {/* Box Kode Promo */}
            <PromoCodeBox
              promoInput={promoInput}
              onPromoInputChange={setPromoInput}
              onApplyPromo={handleApplyPromo}
              feedback={promoFeedback}
            />

            {/* Header Pilihan Tiket & Batas Maksimal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <h2 className="font-fraunces font-black text-2xl sm:text-[28px] text-ungu-heading leading-tight">
                  Pilihan Registrasi &amp; Tiket
                </h2>
                <p className="font-dm-sans text-xs sm:text-sm text-ungu-heading/75 mt-0.5">
                  Amankan akses ke Pentas Senja Jogja dan tiket festival utama Soirée Dansante Semarang 2027.
                </p>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-terang border-2 border-ungu-heading text-ungu-heading font-dm-sans font-black text-[11px] sm:text-xs tracking-wider uppercase shadow-xs">
                  <svg className="w-3.5 h-3.5 text-hijau" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>MAKS. 4 TIKET</span>
                </span>
              </div>
            </div>

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
            <div className="space-y-4 sm:space-y-5">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  qty={ticketQtys[ticket.id] || 0}
                  onQtyChange={handleQtyChange}
                  canIncrement={orderSummary.totalTickets < MAX_TICKETS_PER_TRANSACTION}
                />
              ))}
            </div>

            {/* Transparansi Penuh */}
            <div className="bg-cream-terang border border-ungu-heading/30 rounded-xl p-3.5 sm:p-4 flex items-start gap-3 shadow-xs">
              <svg className="w-4 h-4 text-hijau shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <p className="font-dm-sans text-xs text-ungu-heading/85 leading-relaxed">
                <strong className="text-ungu-heading font-bold">Transparansi Penuh:</strong> Tiket Pentas Senja Jogja otomatis dikirim ke WhatsApp/Email Anda beserta QR Code gerbang masuk. Maksimal 4 tiket per transaksi.
              </p>
            </div>

            {/* Formulir Data Diri Pembeli & Pengunjung */}
            <CustomerDataForm
              formData={customerData}
              onChange={handleCustomerDataChange}
              errors={formErrors}
            />

          </div>

          {/* Kolom Kanan: Sticky Sidebar Ringkasan Pesanan */}
          <OrderSummarySidebar
            orderSummary={orderSummary}
            formattedTimer={formattedTimer}
            onProceedToPayment={handleProceedToPayment}
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
                Konfirmasi Tiket Festival
              </h3>
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                className="w-8 h-8 rounded-full border border-ungu-heading/40 flex items-center justify-center text-ungu-heading hover:bg-cream-tua cursor-pointer"
              >
                &times;
              </button>
            </div>

            <p className="font-dm-sans text-xs text-ungu-heading/85 mb-4 leading-relaxed">
              Pastikan rincian tiket Anda sudah sesuai sebelum dialihkan ke portal pembayaran resmi Soirée Dansante 2027.
            </p>

            {/* Ringkasan Identitas Pembeli */}
            <div className="bg-cream-tua/60 border border-ungu-heading/20 rounded-xl p-3.5 mb-3 space-y-1 text-xs font-dm-sans">
              <span className="block font-bold text-ungu-heading uppercase mb-1">
                Identitas Pembeli
              </span>
              <div className="flex justify-between">
                <span className="text-ungu-heading/70">Nama:</span>
                <span className="font-bold text-ungu-heading">{customerData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ungu-heading/70">Kontak:</span>
                <span className="font-bold text-ungu-heading">{customerData.whatsapp} · {customerData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ungu-heading/70">NIK / Domisili:</span>
                <span className="font-bold text-ungu-heading">{customerData.identityNumber} ({customerData.domicile})</span>
              </div>
            </div>

            <div className="bg-cream-tua/60 border border-ungu-heading/20 rounded-xl p-3.5 mb-4 space-y-2 text-xs font-dm-sans">
              <span className="block font-bold text-ungu-heading uppercase">
                Rincian Tiket ({orderSummary.totalTickets} tiket)
              </span>
              {orderSummary.selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.qty}x {item.title}</span>
                  <span className="font-bold">{formatRupiah(item.total)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-ungu-heading/20 flex justify-between font-bold">
                <span>Total Tagihan:</span>
                <span className="font-fraunces text-base text-ungu-heading">{formatRupiah(orderSummary.totalPayment)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={isSubmitting}
                className="flex-1 font-dm-sans font-black text-xs uppercase bg-kuning-tua hover:bg-kuning-muda text-ungu-heading py-3 rounded-full border-2 border-ungu-heading shadow-[2px_2px_0_var(--color-ungu-heading)] active:translate-y-0.5 cursor-pointer transition-all"
              >
                {isSubmitting ? "Menghubungkan Gateway..." : "Lanjut Bayar Sekarang"}
              </button>
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                className="px-4 py-3 font-dm-sans font-bold text-xs text-ungu-heading/70 hover:text-ungu-heading cursor-pointer"
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
