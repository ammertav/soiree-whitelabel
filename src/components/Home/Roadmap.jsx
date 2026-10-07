import { Link } from "react-router-dom";
import { eventPath, formatClockRange, formatDateIndo } from "../../utils";
import SectionDivider from "../SectionDivider";
import iconCalendar from "../../assets/icons/roadmap/icon-139.svg";
import iconLocation from "../../assets/icons/roadmap/icon-143.svg";
import iconClock from "../../assets/icons/roadmap/icon-147.svg";
import iconTicket from "../../assets/icons/roadmap/icon-155.svg";
import iconRoute from "../../assets/icons/roadmap/icon-159.svg";

// Kartu penutup timeline: festival puncak (bukan event tiket di backend)
const FINALE_CARD = {
  label: "PUNCAK",
  status: "Festival",
  title: "Soirée Dansante",
  info: "16–17 Apr · PRPP Smg",
  variant: "finale",
};

// Gaya per status kartu timeline
const variantStyles = {
  done: {
    card: "bg-cream-tua",
    label: "text-ungu-heading/70",
    badge: "bg-hijau-butek text-cream-tua",
    title: "text-ungu-heading",
    info: "text-ungu-heading/70",
  },
  active: {
    card: "bg-hijau",
    label: "text-kuning-tua",
    badge: "bg-pink-custom text-ungu-heading",
    title: "text-kuning-tua",
    info: "text-cream-tua",
  },
  upcoming: {
    card: "bg-cream-tua",
    label: "text-ungu-heading/70",
    badge: "bg-cream-tengah text-ungu-heading",
    title: "text-ungu-heading",
    info: "text-ungu-heading/70",
  },
  finale: {
    card: "bg-kuning-tua",
    label: "text-ungu-heading/80",
    badge: "bg-merah text-cream-tua",
    title: "text-ungu-heading",
    info: "text-ungu-heading",
  },
};

const formatShortDateIndo = (dateStr) =>
  formatDateIndo(dateStr, { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Jakarta" });

export default function Roadmap({ events = [], isLoading = false }) {
  const featured = events[0];
  const lineups = featured?.lineups || [];

  const timelineCards = [
    ...events.map((event, index) => ({
      key: event.id,
      label: `EVENT ${String(index + 1).padStart(2, "0")}`,
      status: index === 0 ? "Aktif" : "Akan Datang",
      title: event.event,
      info: `${formatShortDateIndo(event.start_time)} · ${event.city || event.location}`,
      variant: index === 0 ? "active" : "upcoming",
      to: eventPath(event),
    })),
    { key: "finale", ...FINALE_CARD },
  ];

  return (
    <section
      id="roadmap"
      className="relative w-full bg-cream-tua pt-16 md:pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <span className="inline-block px-5 py-1 rounded-full bg-kuning-tua border-2 border-ungu-heading text-ungu-heading font-dm-sans font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase shadow-[2px_2px_0_var(--color-ungu-heading)]">
            RANGKAIAN ROADMAP EVENT
          </span>
          <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-[42px] text-ungu-heading tracking-tight leading-tight mt-3">
            Perjalanan Menuju Soirée Dansante
          </h2>
          <p className="font-dm-sans text-sm text-ungu-heading/80 max-w-md mt-3 leading-relaxed">
            Menghubungkan simpul musik independen lintas kota sebelum puncak
            perayaan agung di PRPP Semarang.
          </p>
        </div>

        {/* Featured Active Event Card */}
        {!featured && (
          <div className="bg-cream-terang rounded-[22px] border-2 border-dashed border-ungu-heading/40 p-8 text-center font-dm-sans text-sm font-bold text-ungu-heading/60">
            {isLoading ? "Memuat rangkaian event..." : "Rangkaian event berikutnya segera diumumkan."}
          </div>
        )}
        {featured && (
        <div className="bg-hijau-tua rounded-[22px] border-2 border-ungu-heading shadow-[4px_5px_0_var(--color-ungu-heading)] p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Event Details */}
            <div className="lg:col-span-8">
              {/* Status Badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-custom text-ungu-heading font-dm-sans font-bold text-[10px] tracking-wider uppercase">
                EVENT AKTIF
              </span>

              {/* Title */}
              <h3 className="font-fraunces font-black text-3xl sm:text-4xl text-kuning-tua leading-[1.15] tracking-tight mt-3 max-w-md">
                Event 01: {featured.event}
              </h3>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 font-dm-sans text-xs sm:text-sm text-cream-tua">
                <span className="inline-flex items-center gap-1.5">
                  <img src={iconCalendar} alt="" className="w-3 h-3.5" />
                  {formatDateIndo(featured.start_time, { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <img src={iconLocation} alt="" className="w-3 h-3.5" />
                  {featured.location}{featured.city ? `, ${featured.city}` : ""}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <img src={iconClock} alt="" className="w-3.5 h-3.5" />
                  {formatClockRange(featured.start_time)}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col items-start gap-3 mt-5">
                <Link
                  to={eventPath(featured)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-kuning-tua border-2 border-ungu-heading text-ungu-heading font-dm-sans font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-[2px_3px_0_var(--color-ungu-heading)] hover:bg-kuning-muda active:translate-y-0.5 active:shadow-none transition-all"
                >
                  <img src={iconTicket} alt="" className="w-3.5 h-3" />
                  LIHAT DETAIL &amp; RSVP / TIKET EVENT AKTIF
                </Link>
                <Link
                  to="/roadmap"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-cream-tua text-cream-tua font-dm-sans font-black text-[11px] sm:text-xs uppercase tracking-wider hover:bg-cream-tua/10 transition-all"
                >
                  <img src={iconRoute} alt="" className="w-3.5 h-3.5" />
                  LIHAT SELURUH ROADMAP EVENT
                </Link>
              </div>
            </div>

            {/* Right: Roadshow Performers Box (dari lineup event) */}
            {lineups.length > 0 && (
              <div className="lg:col-span-4">
                <div className="bg-ungu-heading rounded-[14px] p-5 shadow-[3px_4px_0_rgba(0,0,0,0.25)]">
                  <span className="font-dm-sans font-bold text-[10px] tracking-wider uppercase text-pink-custom">
                    PENAMPIL ROADSHOW
                  </span>
                  {lineups.slice(0, 3).map((lineup) => (
                    <p key={lineup.id} className="font-dm-sans font-black text-sm sm:text-base text-kuning-tua uppercase mt-1.5 leading-snug">
                      {lineup.name}
                    </p>
                  ))}
                  {lineups.length > 3 && (
                    <p className="font-dm-sans font-bold text-[11px] text-cream-tua mt-1">
                      + {lineups.length - 3} penampil lainnya
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        )}

        {/* Timeline Mini Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-8">
          {timelineCards.map((event) => {
            const style = variantStyles[event.variant];
            const CardTag = event.to ? Link : "div";
            return (
              <CardTag
                key={event.key}
                to={event.to}
                className={`${style.card} block rounded-[12px] border-2 border-ungu-heading p-3 sm:p-3.5 shadow-[3px_4px_0_var(--color-ungu-heading)] transition-transform duration-200 hover:-translate-y-0.5`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-dm-sans font-bold text-[9px] sm:text-[10px] tracking-wider uppercase ${style.label}`}
                  >
                    {event.label}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-dm-sans font-bold text-[9px] sm:text-[10px] whitespace-nowrap ${style.badge}`}
                  >
                    {event.status}
                  </span>
                </div>
                <p
                  className={`font-dm-sans font-black text-xs sm:text-sm mt-1.5 ${style.title}`}
                >
                  {event.title}
                </p>
                <p
                  className={`font-dm-sans text-[10px] sm:text-xs mt-1 leading-snug ${style.info}`}
                >
                  {event.info}
                </p>
              </CardTag>
            );
          })}
        </div>
      </div>

      {/* Bottom Vintage Divider */}
      <SectionDivider className="mt-16 md:mt-20" />
    </section>
  );
}
