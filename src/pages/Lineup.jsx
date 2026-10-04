import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LineupHero from "../components/Lineup/LineupHero";
import LineupFilterBar from "../components/Lineup/LineupFilterBar";
import LineupHeadliners from "../components/Lineup/LineupHeadliners";
import LineupRosterBanner from "../components/Lineup/LineupRosterBanner";
import LineupCatalogGrid from "../components/Lineup/LineupCatalogGrid";
import LineupStages from "../components/Lineup/LineupStages";
import LineupTicketCTA from "../components/Lineup/LineupTicketCTA";

export default function Lineup() {
  // Shared state untuk filter & search
  const [selectedDay, setSelectedDay] = useState("SEMUA");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedOrigin, setSelectedOrigin] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleResetFilters = () => {
    setSelectedDay("SEMUA");
    setSelectedStage("all");
    setSelectedOrigin("all");
    setSearchQuery("");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Line Up & Jadwal Penampil - Soirée Dansante Semarang 2027",
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
    "description": "Dua hari perayaan akbar mempertemukan 60 musisi lintas genre dan generasi di pesisir Semarang Barat."
  };

  return (
    <>
      <Helmet>
        <title>Line Up & Jadwal Penampil - Soirée Dansante Semarang 2027</title>
        <meta
          name="description"
          content="Line Up & Jadwal Penampil Soirée Dansante Semarang 2027. Dua hari perayaan akbar mempertemukan 60 musisi lintas genre dan generasi di pesisir Semarang Barat."
        />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-cream-tua text-ungu-heading selection:bg-kuning-tua selection:text-ungu-heading">
        <Navbar />

        <main className="flex-1">
          {/* Section 1: Hero Line Up & Jadwal Penampil */}
          <LineupHero />

          {/* Section Filter & Search Bar (Reusable Component) */}
          <LineupFilterBar
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
            selectedStage={selectedStage}
            onStageChange={setSelectedStage}
            selectedOrigin={selectedOrigin}
            onOriginChange={setSelectedOrigin}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Section 2: Headliner & Kurasi Utama */}
          <LineupHeadliners
            selectedDay={selectedDay}
            selectedStage={selectedStage}
            selectedOrigin={selectedOrigin}
            searchQuery={searchQuery}
            onResetFilters={handleResetFilters}
          />

          {/* Section 3: Suara Semarang, Jawa Tengah & Nusantara Bersatu */}
          <LineupRosterBanner />

          {/* Section 4: Barisan Eksplorasi 60 Penampil (Katalog Lengkap Penampil) */}
          <LineupCatalogGrid />

          {/* Section 5: Tata Letak Festival - Empat Panggung Simultan */}
          <LineupStages />

          {/* Section 6: CTA Pembelian Tiket Festival */}
          <LineupTicketCTA />
        </main>

        <Footer />
      </div>
    </>
  );
}
