import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionDivider from "../SectionDivider";
import { getEventDetail } from "../../services/eventService";
import { eventPath, formatDateIndo, formatRupiah, slugify, stripHtml } from "../../utils";

// Tema header kartu tiket, dirotasi per urutan tiket
const CARD_THEMES = [
  {
    headerBg: "bg-hijau",
    titleColor: "text-cream-tua",
    labelColor: "text-cream-tua/80",
    dateColor: "text-cream-tua/80",
    accentColor: "text-hijau",
    dotColor: "bg-hijau",
  },
  {
    headerBg: "bg-pink-custom",
    titleColor: "text-ungu-heading",
    labelColor: "text-ungu-heading/75",
    dateColor: "text-ungu-heading/80",
    accentColor: "text-pink-custom",
    dotColor: "bg-pink-custom",
  },
  {
    headerBg: "bg-kuning-muda",
    titleColor: "text-ungu-heading",
    labelColor: "text-ungu-heading/75",
    dateColor: "text-ungu-heading/80",
    accentColor: "text-merah",
    dotColor: "bg-merah",
  },
];

// Lebar grid mengikuti jumlah tiket agar 1–2 kartu tetap di tengah
const GRID_CLASS = {
  1: "md:grid-cols-1 max-w-md mx-auto",
  2: "md:grid-cols-2 max-w-3xl mx-auto",
};

export default function Tickets({ activeEvent, isLoading: isLoadingEvents = false }) {
  const [event, setEvent] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const isLoading = isLoadingEvents || isLoadingDetail;

  // Tiket dari event aktif (event terdekat milik organizer, dikirim dari Home)
  const activeId = activeEvent?.id;
  const activeName = activeEvent?.event;
  useEffect(() => {
    if (!activeId) return;
    const controller = new AbortController();
    setIsLoadingDetail(true);

    getEventDetail(activeId, slugify(activeName), { signal: controller.signal })
      .then((data) => {
        setEvent(data);
        setIsLoadingDetail(false);
      })
      .catch((error) => {
        if (error.name === "CanceledError" || error.name === "AbortError") return;
        console.error("Failed to fetch active event tickets:", error);
        setIsLoadingDetail(false);
      });

    return () => controller.abort();
  }, [activeId, activeName]);

  const tickets = event?.tickets || [];
  const dateLabel = event
    ? formatDateIndo(event.start_time, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      })
    : "";

  return (
    <section
      id="tickets"
      className="relative w-full bg-kuning-tua pt-16 md:pt-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          {/* Top Pill Badge */}
          <span className="inline-block px-6 py-1.5 rounded-full bg-ungu-heading text-cream-tua font-dm-sans font-bold text-xs uppercase tracking-widest border-2 border-ungu-heading shadow-sm">
            TIKET EVENT AKTIF
          </span>

          {/* Heading */}
          <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-5xl text-ungu-heading tracking-tight leading-tight mt-4">
            {event ? event.event : "Amankan Tiketmu"}
          </h2>

          {/* Subtitle */}
          <p className="font-dm-sans text-xs sm:text-sm md:text-base text-ungu-heading/90 max-w-xl mx-auto mt-3 leading-relaxed font-medium">
            {event
              ? `${dateLabel} · ${[event.location, event.city].filter(Boolean).join(", ")}`
              : "Pilih tiketmu sekarang sebelum kuota habis."}
          </p>
        </div>

        {/* Kosong / Memuat */}
        {tickets.length === 0 && (
          <div className="max-w-xl mx-auto mt-12 md:mt-16 bg-cream-tua rounded-[24px] border-2 border-dashed border-ungu-heading/50 p-8 text-center">
            <p className="font-dm-sans text-sm font-bold text-ungu-heading/70">
              {isLoading ? "Memuat tiket..." : "Tiket untuk event berikutnya segera dibuka."}
            </p>
            {!isLoading && (
              <Link
                to="/roadmap"
                className="inline-block mt-4 px-5 py-1.5 rounded-full border-2 border-ungu-heading bg-kuning-tua hover:bg-kuning-muda font-dm-sans font-bold text-xs uppercase tracking-wider text-ungu-heading transition-all"
              >
                LIHAT ROADMAP EVENT
              </Link>
            )}
          </div>
        )}

        {/* Ticket Cards - aligned with Navbar width and strictly equal height */}
        {tickets.length > 0 && (
          <div
            className={`grid grid-cols-1 ${GRID_CLASS[tickets.length] || "md:grid-cols-3"} gap-6 lg:gap-8 w-full mt-12 md:mt-16 items-stretch`}
          >
            {tickets.map((ticket, index) => {
              const theme = CARD_THEMES[index % CARD_THEMES.length];
              const isSoldOut = !!ticket.sold;
              const desc = stripHtml(ticket.desc);

              return (
                <div
                  key={ticket.id}
                  className={`relative rounded-[24px] border-2 border-ungu-heading bg-cream-tua overflow-hidden shadow-[4px_6px_0_var(--color-ungu-heading)] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${isSoldOut ? "opacity-70" : ""}`}
                >
                  {/* Ticket Top Header */}
                  <div
                    className={`${theme.headerBg} p-5 sm:p-6 pb-4 relative min-h-[130px] sm:min-h-[138px] flex flex-col justify-between gap-3`}
                  >
                    <span
                      className={`font-dm-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block ${theme.labelColor}`}
                    >
                      TIKET {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3
                        className={`font-fraunces font-black text-xl sm:text-[22px] lg:text-2xl tracking-tight leading-snug line-clamp-2 ${theme.titleColor}`}
                      >
                        {ticket.type}
                      </h3>
                      <p
                        className={`font-dm-sans font-medium text-xs mt-0.5 ${theme.dateColor}`}
                      >
                        {dateLabel}
                      </p>
                    </div>
                  </div>

                  {/* Ticket Perforation / Notch Divider */}
                  <div className="relative flex items-center bg-cream-tua h-4 overflow-visible">
                    <div className="w-5 h-5 rounded-full bg-kuning-tua border-2 border-ungu-heading -ml-2.5 shrink-0 z-10" />
                    <div className="flex-1 border-b-2 border-dashed border-ungu-heading mx-1" />
                    <div className="w-5 h-5 rounded-full bg-kuning-tua border-2 border-ungu-heading -mr-2.5 shrink-0 z-10" />
                  </div>

                  {/* Ticket Bottom Body */}
                  <div className="p-5 sm:p-6 pt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="font-fraunces font-black text-3xl sm:text-4xl tracking-tight text-ungu-heading">
                        {formatRupiah(ticket.price)}
                      </div>
                      {desc && (
                        <p className="font-dm-sans text-xs text-ungu-heading/80 mt-1 leading-snug font-medium line-clamp-2">
                          {desc}
                        </p>
                      )}
                    </div>

                    {/* Bottom Status & Action Bar */}
                    <div className="border-t border-ungu-heading/20 pt-4 mt-6 flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${isSoldOut ? "bg-merah" : theme.dotColor} shrink-0`}
                        />
                        <span
                          className={`font-dm-sans font-black text-[11px] tracking-wider uppercase ${isSoldOut ? "text-merah" : theme.accentColor}`}
                        >
                          {isSoldOut ? "HABIS TERJUAL" : "TERSEDIA"}
                        </span>
                      </div>

                      <Link
                        to={eventPath(event)}
                        className="inline-block px-5 py-1.5 rounded-full border-2 border-ungu-heading bg-kuning-tua text-ungu-heading hover:bg-kuning-muda font-dm-sans font-bold text-xs uppercase tracking-wider transition-all active:translate-y-0.5"
                      >
                        {isSoldOut ? "LIHAT EVENT" : "PILIH TIKET"}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footnote */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="inline-flex items-center gap-1.5 font-dm-sans text-xs sm:text-sm text-ungu-heading/90 font-medium">
            <svg
              className="w-4 h-4 text-ungu-heading shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Biaya layanan ditampilkan saat pembayaran. E-tiket resmi dikirim ke
            email segera setelah pembayaran berhasil.
          </p>
        </div>
      </div>

      {/* Bottom Vintage Divider */}
      <SectionDivider className="mt-16 md:mt-24" />
    </section>
  );
}
