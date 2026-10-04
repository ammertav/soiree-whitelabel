import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionDivider from "../components/SectionDivider";
import PemesananHero from "../components/Pemesanan/PemesananHero";
import PemesananTicketSection from "../components/Pemesanan/PemesananTicketSection";

export default function Pemesanan() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Pentas Senja Yogyakarta - Soirée Dansante 2027",
    "startDate": "2027-03-27T16:00:00+07:00",
    "endDate": "2027-03-27T22:00:00+07:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "PKKH UGM Yogyakarta",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sleman",
        "addressRegion": "D.I. Yogyakarta",
        "addressCountry": "ID"
      }
    },
    "description": "Showcase pra-festival resmi Soirée Dansante 2027 di PKKH UGM Yogyakarta. Penampilan akustik eksklusif musisi kurasi dan temu sapa kurator festival."
  };

  return (
    <>
      <Helmet>
        <title>Pemesanan Tiket - Pentas Senja Yogyakarta | Soirée Dansante 2027</title>
        <meta
          name="description"
          content="Amankan tiket resmi Pentas Senja Yogyakarta, showcase pra-festival Soirée Dansante 2027 di PKKH UGM Yogyakarta. Sabtu, 27 Maret 2027."
        />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-cream-tua text-ungu-heading selection:bg-kuning-tua selection:text-ungu-heading">
        {/* Header Navigasi Utama */}
        <Navbar />

        {/* Pita Pembatas Vintage Khas Festival */}
        <SectionDivider bgClass="bg-cream-tua" />

        <main className="flex-1">
          {/* Section 1: Hero Pentas Senja Yogyakarta */}
          <PemesananHero />

          {/* Section 2: Pilihan Registrasi & Tiket + Sticky Ringkasan Pesanan */}
          <PemesananTicketSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
