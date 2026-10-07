import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RundownHero from "../components/Rundown/RundownHero";

export default function Rundown() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Rundown & Jadwal Panggung Soirée Dansante 2027",
    "startDate": "2027-04-16T13:00:00+07:00",
    "endDate": "2027-04-17T23:59:59+07:00",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "PRPP Grand Maerakaca Semarang",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Anjasmoro Raya, Tawangsari",
        "addressLocality": "Semarang",
        "addressRegion": "Jawa Tengah",
        "addressCountry": "ID"
      }
    },
    "description": "Susunan jam tampil dan jadwal panggung festival musik Soirée Dansante 2027 segera hadir. Dapatkan estimasi waktu dan pengingat rilis resmi.",
    "url": "https://soireedansante.id/rundown"
  };

  return (
    <>
      <Helmet>
        <title>Rundown & Jadwal Panggung - Soirée Dansante Semarang 2027</title>
        <meta
          name="description"
          content="Susunan jam tampil dan jadwal panggung festival musik Soirée Dansante 2027 di PRPP Semarang segera hadir. Simak estimasi panggung dan daftarkan pengingat rilis pertama."
        />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-putih-butek text-ungu-heading selection:bg-kuning-tua selection:text-ungu-heading">
        <Navbar />

        <main className="flex-1 flex flex-col justify-center">
          {/* Section 1: Hero Rundown & Coming Soon Announcement */}
          <RundownHero />
        </main>

        <Footer />
      </div>
    </>
  );
}
