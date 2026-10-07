import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionDivider from "../components/SectionDivider";
import EventDetailHero from "../components/EventDetail/EventDetailHero";
import EventDetailTicketSection from "../components/EventDetail/EventDetailTicketSection";
import { getEventDetail } from "../services/eventService";
import { stripHtml, storageUrl } from "../utils";

export default function EventDetail() {
  const { id, slug } = useParams();
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error

  useEffect(() => {
    const controller = new AbortController();

    const fetchEvent = async () => {
      setStatus("loading");
      try {
        const data = await getEventDetail(id, slug, { signal: controller.signal });
        setEvent(data);
        setStatus(data ? "ready" : "notfound");
      } catch (error) {
        if (error.name === "CanceledError" || error.name === "AbortError") return;
        setStatus(error?.response?.status === 404 ? "notfound" : "error");
      }
    };

    fetchEvent();
    return () => controller.abort();
  }, [id, slug]);

  if (status !== "ready") {
    const message = {
      loading: "Memuat detail event...",
      notfound: "Event tidak ditemukan atau sudah tidak tersedia.",
      error: "Gagal memuat event. Silakan coba lagi beberapa saat lagi.",
    }[status];

    return (
      <div className="flex flex-col min-h-screen bg-cream-tua text-ungu-heading">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-5 px-4 py-24 text-center">
          <p className="font-fraunces font-black text-2xl sm:text-3xl">{message}</p>
          {status !== "loading" && (
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

  const description = stripHtml(event.description).substring(0, 160);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.event,
    "startDate": event.start_time,
    "endDate": event.end_time,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "image": storageUrl(event.img) || undefined,
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.city || "",
        "addressCountry": "ID"
      }
    },
    "organizer": event.organizer ? { "@type": "Organization", "name": event.organizer } : undefined,
    "description": description
  };

  return (
    <>
      <Helmet>
        <title>{`${event.event} | Soirée Dansante 2027`}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-cream-tua text-ungu-heading selection:bg-kuning-tua selection:text-ungu-heading">
        {/* Header Navigasi Utama */}
        <Navbar />

        {/* Pita Pembatas Vintage Khas Festival */}
        <SectionDivider />

        <main className="flex-1">
          {/* Section 1: Hero Info Event */}
          <EventDetailHero event={event} />

          {/* Section 2: Pilihan Tiket, Form Data Diri + Sticky Ringkasan Pesanan */}
          <EventDetailTicketSection event={event} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
