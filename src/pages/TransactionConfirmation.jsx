import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionDivider from "../components/SectionDivider";
import TransactionStepper from "../components/Transaction/TransactionStepper";
import TransactionConfirmationHero from "../components/TransactionConfirmation/TransactionConfirmationHero";
import TransactionPaymentProof from "../components/TransactionConfirmation/TransactionPaymentProof";
import TransactionAudienceGuide from "../components/TransactionConfirmation/TransactionAudienceGuide";
import { getTransaction } from "../services/transactionService";
import { eventPath, transactionPath } from "../utils";

// Status final dikirim webhook Midtrans ke backend; selama masih pending, cek ulang berkala
const POLL_INTERVAL_MS = 5000;
const POLL_TIMEOUT_MS = 10 * 60 * 1000;

const BUTTON_CLASS =
  "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-kuning-tua border-2 border-ungu-heading font-dm-sans font-black text-xs uppercase tracking-wider shadow-[3px_3px_0_var(--color-ungu-heading)] hover:bg-kuning-muda transition-all";

export default function TransactionConfirmation() {
  const { transactionId, no_order } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | notfound | pending | settlement | expire
  const [isPollingStopped, setIsPollingStopped] = useState(false);
  const [pollRound, setPollRound] = useState(0); // naik saat "Cek Status Lagi" ditekan → polling diulang

  useEffect(() => {
    const controller = new AbortController();
    const startedAt = Date.now();
    let timer = null;
    setIsPollingStopped(false);

    const load = async () => {
      try {
        const data = await getTransaction(transactionId, no_order, { signal: controller.signal });
        if (!data) {
          setStatus("notfound");
          return;
        }
        setTransaction(data);
        setStatus(data.status);

        if (data.status === "pending") {
          if (Date.now() - startedAt < POLL_TIMEOUT_MS) {
            timer = setTimeout(load, POLL_INTERVAL_MS);
          } else {
            setIsPollingStopped(true);
          }
        }
      } catch (error) {
        if (error.name === "CanceledError" || error.name === "AbortError") return;
        setStatus("notfound");
      }
    };

    load();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [transactionId, no_order, pollRound]);

  const renderState = () => {
    if (status === "settlement") {
      return (
        <>
          {/* Section 1: Hero Konfirmasi Transaksi Berhasil */}
          <TransactionConfirmationHero transaction={transaction} />

          {/* Section 2: Ringkasan Faktur & Bukti Pembayaran */}
          <TransactionPaymentProof transaction={transaction} />

          {/* Section 3: Panduan Penting Penonton (syarat event) */}
          {transaction.event?.syarat && (
            <>
              <SectionDivider />
              <TransactionAudienceGuide event={transaction.event} />
            </>
          )}
        </>
      );
    }

    const content = {
      loading: { title: "Memuat status pesanan...", text: null },
      notfound: { title: "Pesanan tidak ditemukan.", text: "Periksa kembali tautan pesanan Anda." },
      pending: {
        title: "Menunggu Konfirmasi Pembayaran",
        text: isPollingStopped
          ? "Status pembayaran belum berubah. Jika Anda sudah membayar, tekan \"Cek Status Lagi\" beberapa saat kemudian. Jika memilih transfer/virtual account, selesaikan pembayaran sesuai instruksi sebelum batas waktu."
          : "Pembayaran Anda sedang diverifikasi. Halaman ini akan diperbarui otomatis. Jika memilih transfer/virtual account, selesaikan pembayaran sesuai instruksi sebelum batas waktu.",
      },
      expire: {
        title: "Pesanan Kedaluwarsa",
        text: "Batas waktu pembayaran telah habis atau pesanan dibatalkan. Silakan buat pesanan baru.",
      },
    }[status] || { title: "Status pesanan tidak dikenal.", text: null };

    return (
      <>
        {transaction && (
          <TransactionStepper
            title={status === "expire" ? "Pesanan Kedaluwarsa" : "Menunggu Pembayaran"}
            activeStep={3}
          />
        )}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-6 sm:p-9 shadow-[5px_6px_0_var(--color-ungu-heading)] text-center">
            <h1 className="font-fraunces font-black text-2xl sm:text-3xl text-ungu-heading leading-tight">
              {content.title}
            </h1>
            {content.text && (
              <p className="font-dm-sans text-sm sm:text-[15px] text-gray-custom leading-relaxed mt-3">
                {content.text}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {status === "pending" && isPollingStopped && (
                <button type="button" onClick={() => setPollRound((round) => round + 1)} className={`${BUTTON_CLASS} cursor-pointer`}>
                  Cek Status Lagi
                </button>
              )}
              {status === "pending" && transaction && (
                <Link
                  to={transactionPath(transaction)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream-terang border-2 border-ungu-heading font-dm-sans font-bold text-xs uppercase tracking-wider hover:bg-cream-tua transition-all"
                >
                  Kembali ke Halaman Pembayaran
                </Link>
              )}
              {status === "expire" && transaction?.event && (
                <Link to={eventPath(transaction.event)} className={BUTTON_CLASS}>
                  Pesan Ulang Tiket
                </Link>
              )}
              {status === "notfound" && (
                <Link to="/roadmap" className={BUTTON_CLASS}>
                  &larr; Lihat Roadmap Event
                </Link>
              )}
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Konfirmasi Transaksi - Soirée Dansante</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-putih-butek text-ungu-heading selection:bg-kuning-tua selection:text-ungu-heading">
        <Navbar />

        <main className="flex-1">
          {renderState()}

          {/* Pita Pembatas Vintage Bawah */}
          <SectionDivider />
        </main>

        <Footer />
      </div>
    </>
  );
}
