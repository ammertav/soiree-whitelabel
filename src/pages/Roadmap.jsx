import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoadmapHero from "../components/Roadmap/RoadmapHero";
import RoadmapTimeline from "../components/Roadmap/RoadmapTimeline";
import RoadmapMainEvent from "../components/Roadmap/RoadmapMainEvent";

export default function Roadmap() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Roadmap Festival - Soirée Dansante Semarang 2027",
    "startDate": "2027-04-16",
    "endDate": "2027-04-17",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "PRPP Semarang",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Semarang",
        "addressRegion": "Jawa Tengah",
        "addressCountry": "ID"
      }
    },
    "description": "Perjalanan menuju Soirée Dansante 2027. Satu rangkaian event, satu tujuan akhir di PRPP Semarang."
  };

  return (
    <>
      <Helmet>
        <title>Roadmap Festival - Soirée Dansante Semarang 2027</title>
        <meta
          name="description"
          content="Perjalanan menuju Soirée Dansante 2027. Satu rangkaian event, satu tujuan akhir di PRPP Semarang."
        />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-hijau-butek text-cream-tua selection:bg-kuning-tua selection:text-ungu-heading">
        <Navbar />

        <main className="flex-1">
          {/* Section 1: Hero Roadmap Festival */}
          <RoadmapHero />

          {/* Section 2: Alur Timeline Roadmap Festival */}
          <RoadmapTimeline />

          {/* Section 3: Event Utama Puncak Soirée Dansante */}
          <RoadmapMainEvent />
        </main>

        <Footer />
      </div>
    </>
  );
}
