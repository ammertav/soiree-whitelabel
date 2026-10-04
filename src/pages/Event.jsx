import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import All from "../components/Event/All";

function Event() {
  return (
    <>
      <Helmet>
        {/* Title tetap branding-friendly */}
        <title>Jelajahi Event — Tiket Acara Online dari Keenan Society</title>

        {/* Description: fokus pada pencarian event dan keyword target */}
        <meta
          name="description"
          content="Cari dan beli tiket acara dari berbagai kategori di platform e-ticketing Keenan Society. Praktis, aman, dan official."
        />

        <meta name="robots" content="index,follow" />

        <meta
          name="keywords"
          content="event, beli tiket konser, tiket online, platform e-ticketing, Keenan Society event, daftar event digital"
        />

        <meta name="author" content="Keenan Society" />
        <link rel="canonical" href="https://keenan-society.com/events" />

        {/* Open Graph */}
        <meta property="og:url" content="https://keenan-society.com/events" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jelajahi Event — Tiket Acara Online dari Keenan Society" />
        <meta
          property="og:description"
          content="Lihat daftar event terbaru dan beli tiket online di platform e-ticketing official dari Keenan Society."
        />
        <meta property="og:image" content="https://keenan-society.com/keenan-logo.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jelajahi Event — Tiket Acara Online dari Keenan Society" />
        <meta
          name="twitter:description"
          content="Temukan berbagai event dan beli tiket digital secara praktis di Keenan Society."
        />
        <meta name="twitter:image" content="https://keenan-society.com/keenan-logo.webp" />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <div className="flex-grow pt-24">
          <All />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Event;
