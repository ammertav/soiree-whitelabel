import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Home/Hero";
import FaktaFestival from "../components/Home/FaktaFestival";
import Roadmap from "../components/Home/Roadmap";
import Manifesto from "../components/Home/Manifesto";
import ArtistLineup from "../components/Home/ArtistLineup";
import Tickets from "../components/Home/Tickets";
import Merchandise from "../components/Home/Merchandise";
import InstalasiGerbang from "../components/Home/InstalasiGerbang";
import Partners from "../components/Home/Partners";

function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Soirée Dansante Semarang 2027",
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
    "description": "Festival Musik Outdoor 2 Hari • 4 Panggung • 60 Band di PRPP Semarang."
  };

  return (
    <>
      <Helmet>
        <title>Soirée Dansante Semarang 2027 | Panggung Setiap Suara</title>
        <meta
          name="description"
          content="Soirée Dansante Semarang 2027 - Festival Musik Outdoor 2 Hari, 4 Panggung, 60 Band di PRPP Semarang. Amankan tiketmu sekarang!"
        />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-hijau-butek text-cream-tua selection:bg-kuning-tua selection:text-ungu-heading">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <FaktaFestival />
          <Roadmap />
          <Manifesto />
          <ArtistLineup />
          <Tickets />
          <Merchandise />
          <InstalasiGerbang />
          <Partners />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;
