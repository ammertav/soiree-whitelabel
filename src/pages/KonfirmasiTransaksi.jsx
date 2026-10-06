import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionDivider from "../components/SectionDivider";
import TransactionConfirmationHero from "../components/TransactionConfirmation/TransactionConfirmationHero";
import TransactionPaymentProof from "../components/TransactionConfirmation/TransactionPaymentProof";
import TransactionAudienceGuide from "../components/TransactionConfirmation/TransactionAudienceGuide";

export default function KonfirmasiTransaksi() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Order",
    "orderNumber": "SD2027-894218",
    "orderStatus": "https://schema.org/OrderDelivered",
    "description": "Konfirmasi Transaksi Pemesanan Tiket Soirée Dansante Semarang 2027. Tiket telah berhasil diamankan."
  };

  return (
    <>
      <Helmet>
        <title>Konfirmasi Transaksi - Soirée Dansante</title>
        <meta
          name="description"
          content="Konfirmasi transaksi berhasil. Tiket Soirée Dansante Semarang 2027 telah diamankan. Salinan e-tiket dan kode QR resmi telah dikirimkan ke email terdaftar."
        />
        <meta name="robots" content="noindex,nofollow" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-putih-butek text-ungu-heading selection:bg-kuning-tua selection:text-ungu-heading">
        <Navbar />

        <main className="flex-1">
          {/* Section 1: Hero Konfirmasi Transaksi Berhasil */}
          <TransactionConfirmationHero />

          {/* Section 2: Ringkasan Faktur & Bukti Pembayaran */}
          <TransactionPaymentProof />

          {/* Pita Pembatas Vintage */}
          <SectionDivider bgClass="bg-cream-tua" />

          {/* Section 3: Panduan Penting Penonton */}
          <TransactionAudienceGuide />

          {/* Pita Pembatas Vintage Bawah */}
          <SectionDivider bgClass="bg-cream-tua" />
        </main>

        <Footer />
      </div>
    </>
  );
}
