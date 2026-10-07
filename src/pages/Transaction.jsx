import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LuReceipt, LuClock } from "react-icons/lu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionDivider from "../components/SectionDivider";
import TransactionStepper from "../components/Transaction/TransactionStepper";
import PaymentEventCard from "../components/Transaction/PaymentEventCard";
import { getTransaction, cancelTransaction } from "../services/transactionService";
import { confirmationPath, eventPath, formatCountdown, formatRupiah } from "../utils";

export default function Transaction() {
  const { transactionId, no_order } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [notice, setNotice] = useState(null); // { type: "info" | "error", text }

  // Muat transaksi; yang sudah lunas langsung ke halaman konfirmasi
  useEffect(() => {
    const controller = new AbortController();

    getTransaction(transactionId, no_order, { signal: controller.signal })
      .then((data) => {
        if (!data) {
          setStatus("notfound");
          return;
        }
        if (data.status === "settlement") {
          navigate(confirmationPath(data), { replace: true });
          return;
        }
        setTransaction(data);
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name === "CanceledError" || error.name === "AbortError") return;
        setStatus("notfound");
      });

    return () => controller.abort();
  }, [transactionId, no_order, navigate]);

  // Hitung mundur batas pembayaran (expired_at dari backend, 15 menit)
  const expiredAt = transaction?.expired_at;
  useEffect(() => {
    if (!expiredAt) return;

    const tick = () => setSecondsLeft(Math.max(0, Math.floor((new Date(expiredAt).getTime() - Date.now()) / 1000)));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiredAt]);

  const isExpired = transaction?.status === "expire" || secondsLeft === 0;

  const handlePayment = useCallback(() => {
    setNotice(null);

    if (!transaction?.snap_token) {
      setNotice({ type: "error", text: "Token pembayaran tidak ditemukan. Silakan buat pesanan ulang." });
      return;
    }
    if (!window.snap) {
      setNotice({ type: "error", text: "Gateway pembayaran gagal dimuat. Muat ulang halaman lalu coba lagi." });
      return;
    }

    setIsPaying(true);
    window.snap.pay(transaction.snap_token, {
      // Status final ditentukan webhook Midtrans; halaman konfirmasi menunggu hingga lunas
      onSuccess() {
        navigate(confirmationPath(transaction));
      },
      onPending() {
        navigate(confirmationPath(transaction));
      },
      onError() {
        setIsPaying(false);
        setNotice({ type: "error", text: "Pembayaran gagal. Silakan coba lagi." });
      },
      onClose() {
        setIsPaying(false);
        setNotice({ type: "info", text: "Jendela pembayaran ditutup sebelum selesai." });
      },
    });
  }, [transaction, navigate]);

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await cancelTransaction(transactionId, no_order);
      setIsCancelModalOpen(false);
      setTransaction((prev) => ({ ...prev, status: "expire" }));
      setNotice({ type: "info", text: "Pesanan dibatalkan dan kuota tiket telah dikembalikan." });
    } catch (error) {
      setNotice({ type: "error", text: error?.response?.data?.error || "Gagal membatalkan pesanan." });
      setIsCancelModalOpen(false);
    } finally {
      setIsCancelling(false);
    }
  };

  if (status !== "ready") {
    return (
      <div className="flex flex-col min-h-screen bg-putih-butek text-ungu-heading">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-5 px-4 py-24 text-center">
          <p className="font-fraunces font-black text-2xl sm:text-3xl">
            {status === "loading" ? "Memuat pesanan..." : "Pesanan tidak ditemukan."}
          </p>
          {status === "notfound" && (
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-kuning-tua border-2 border-ungu-heading font-dm-sans font-black text-xs uppercase tracking-wider shadow-[2px_3px_0_var(--color-ungu-heading)] hover:bg-kuning-muda transition-all"
            >
              &larr; Lihat Roadmap Event
            </Link>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  const tickets = transaction.tickets || [];

  return (
    <>
      <Helmet>
        <title>Pembayaran Pesanan - Soirée Dansante</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-putih-butek text-ungu-heading selection:bg-kuning-tua selection:text-ungu-heading">
        <Navbar />
        <SectionDivider />

        <main className="flex-1">
          <TransactionStepper title={isExpired ? "Pesanan Kedaluwarsa" : "Selesaikan Pembayaran"} activeStep={3} />

          <section className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Kolom Kiri: Ringkasan Pesanan & Aksi */}
              <div className="lg:col-span-7 space-y-6">
                {notice && (
                  <div
                    role="alert"
                    className={`p-3 rounded-xl border-2 font-dm-sans text-xs font-bold ${
                      notice.type === "error" ? "bg-merah/10 border-merah text-merah" : "bg-kuning-tua/20 border-kuning-tua text-ungu-heading"
                    }`}
                  >
                    {notice.text}
                  </div>
                )}

                <div className="bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-6 sm:p-8 shadow-[5px_6px_0_var(--color-ungu-heading)]">
                  {/* Header + Countdown */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-ungu-heading/50 flex items-center justify-center shrink-0 bg-cream-tua/40">
                        <LuReceipt className="w-5 h-5 text-ungu-heading stroke-[2.2]" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block font-dm-sans font-black text-xs tracking-widest text-ungu-heading/75 uppercase leading-none mb-1">
                          NOMOR PESANAN
                        </span>
                        <span className="font-dm-sans font-black text-sm sm:text-base text-ungu-heading break-all">
                          #{transaction.no_order}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-ungu-heading font-dm-sans font-black text-xs ${
                        isExpired ? "bg-merah text-cream-terang" : "bg-kuning-tua text-ungu-heading"
                      }`}
                    >
                      <LuClock className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                      <span>{isExpired ? "KEDALUWARSA" : `Bayar dalam ${formatCountdown(secondsLeft)}`}</span>
                    </div>
                  </div>

                  {/* Rincian Tiket */}
                  <h2 className="font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase text-ungu-heading mb-3">
                    RINCIAN ITEM PEMBELIAN
                  </h2>
                  <div className="space-y-3 mb-4">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-start justify-between gap-4 pb-3 border-b border-ungu-heading/15">
                        <div>
                          <p className="font-dm-sans font-black text-sm sm:text-base text-ungu-heading leading-snug">
                            {ticket.TransTick?.qty}x {ticket.type}
                          </p>
                          <p className="font-dm-sans text-xs text-gray-custom/80 mt-0.5">
                            {formatRupiah(ticket.price)} / tiket
                          </p>
                        </div>
                        <span className="font-dm-sans font-black text-sm sm:text-base text-ungu-heading shrink-0">
                          {formatRupiah(ticket.TransTick?.subtotal)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start justify-between gap-4 text-xs sm:text-[13px] font-dm-sans pb-5">
                    <span className="text-gray-custom">Biaya Layanan</span>
                    <span className="font-bold text-ungu-heading shrink-0">{formatRupiah(transaction.total_service)}</span>
                  </div>

                  {/* Data Pembeli */}
                  <div className="bg-cream-tua/50 border border-ungu-heading/40 rounded-2xl p-4 sm:p-5 mb-5 space-y-2.5">
                    {[
                      ["Nama Pemesan", transaction.name],
                      ["Email", transaction.email],
                      ["Nomor WhatsApp", transaction.phone || "-"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between gap-3 text-xs sm:text-[13px] font-dm-sans">
                        <span className="text-gray-custom shrink-0">{label}</span>
                        <span className="font-bold text-ungu-heading text-right break-all">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="bg-cream-tua/70 border-2 border-ungu-heading rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3">
                    <span className="font-dm-sans font-black text-[10px] sm:text-[11px] tracking-wider uppercase text-ungu-heading/70">
                      TOTAL PEMBAYARAN
                    </span>
                    <span className="font-fraunces font-black text-2xl sm:text-3xl text-ungu-heading tracking-tight leading-none">
                      {formatRupiah(transaction.total_amount)}
                    </span>
                  </div>
                </div>

                {/* Aksi */}
                {isExpired ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-dm-sans text-sm text-gray-custom w-full">
                      Batas waktu pembayaran telah habis atau pesanan dibatalkan. Silakan buat pesanan baru.
                    </p>
                    {transaction.event && (
                      <Link
                        to={eventPath(transaction.event)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-kuning-tua border-2 border-ungu-heading font-dm-sans font-black text-xs uppercase tracking-wider shadow-[3px_3px_0_var(--color-ungu-heading)] hover:bg-kuning-muda transition-all"
                      >
                        Pesan Ulang Tiket
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handlePayment}
                      disabled={isPaying}
                      className="flex-1 py-3.5 rounded-full bg-kuning-tua hover:bg-kuning-muda border-2 border-ungu-heading shadow-[3px_3px_0_var(--color-ungu-heading)] active:translate-y-0.5 text-ungu-heading font-dm-sans font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                    >
                      {isPaying ? "Membuka Pembayaran..." : "Bayar Sekarang"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCancelModalOpen(true)}
                      disabled={isPaying}
                      className="px-7 py-3.5 rounded-full bg-cream-terang hover:bg-cream-tua border-2 border-ungu-heading text-ungu-heading font-dm-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40"
                    >
                      Batalkan Pesanan
                    </button>
                  </div>
                )}
              </div>

              {/* Kolom Kanan: Info Event */}
              <PaymentEventCard event={transaction.event} />
            </div>
          </section>

          <SectionDivider />
        </main>

        <Footer />
      </div>

      {/* Modal Konfirmasi Pembatalan */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" role="dialog" aria-modal="true">
          <div className="bg-cream-terang border-2 border-ungu-heading rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-[6px_6px_0_var(--color-ungu-heading)]">
            <h3 className="font-fraunces font-black text-xl text-ungu-heading mb-2">Batalkan pesanan ini?</h3>
            <p className="font-dm-sans text-xs sm:text-sm text-ungu-heading/85 leading-relaxed mb-5">
              Kuota tiket akan dikembalikan dan pesanan tidak dapat dibayar lagi.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isCancelling}
                className="flex-1 font-dm-sans font-black text-xs uppercase bg-merah text-cream-terang py-3 rounded-full border-2 border-ungu-heading shadow-[2px_2px_0_var(--color-ungu-heading)] active:translate-y-0.5 cursor-pointer transition-all disabled:opacity-60"
              >
                {isCancelling ? "Membatalkan..." : "Ya, Batalkan"}
              </button>
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                disabled={isCancelling}
                className="px-4 py-3 font-dm-sans font-bold text-xs text-ungu-heading/70 hover:text-ungu-heading cursor-pointer"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
