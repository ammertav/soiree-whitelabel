import { Link } from "react-router-dom";
import { formatClockRange, formatDateIndo, isEventOnSale, storageUrl } from "../../utils";

export default function EventDetailHero({ event }) {
  const onSale = isEventOnSale(event);
  const poster = storageUrl(event.img);
  const dateLabel = formatDateIndo(event.start_time, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });

  return (
    <section className="w-full bg-cream-tua pt-7 sm:pt-9 pb-10 sm:pb-12 border-b-2 border-ungu-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Baris Atas: Tombol Kembali & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-ungu-heading bg-cream-terang text-ungu-heading font-dm-sans font-bold text-xs hover:bg-cream-tua active:translate-y-0.5 transition-all shadow-xs w-fit"
          >
            <span className="text-sm leading-none">&larr;</span>
            <span>Kembali ke Roadmap</span>
          </Link>

          <nav aria-label="Breadcrumb" className="flex items-center text-[11px] sm:text-xs font-dm-sans uppercase tracking-wider">
            <span className="text-ungu-heading/60 font-bold">ROADMAP TUR KOTA</span>
            <span className="text-ungu-heading/40 mx-2 font-bold">&gt;</span>
            <span className="text-hijau font-black">{event.event}</span>
          </nav>
        </div>

        {/* Baris Utama: Konten Headline (Kiri) & Kartu Highlight (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Kiri: Badges, Title, Desc, & Info Acara */}
          <div className="lg:col-span-8 xl:col-span-9">
            
            {/* Tag Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-kuning-tua text-ungu-heading font-dm-sans font-black text-[11px] sm:text-xs uppercase tracking-wider border-2 border-ungu-heading shadow-xs">
                {onSale ? "TIKET TERSEDIA" : "PENJUALAN DITUTUP"}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream-terang text-ungu-heading font-dm-sans font-black text-[11px] sm:text-xs uppercase tracking-wider border-2 border-ungu-heading shadow-xs">
                <svg
                  className="w-3.5 h-3.5 text-ungu-heading shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v2" />
                  <path d="M13 17v2" />
                  <path d="M13 11v2" />
                </svg>
                <span>{event.organizer || "SOIRÉE DANSANTE"}</span>
              </span>
            </div>

            {/* Judul Headline Besar */}
            <h1 className="font-fraunces font-black text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] text-ungu-heading leading-[1.04] tracking-tight uppercase mb-4">
              {event.event}
            </h1>

            {/* Deskripsi Acara */}
            <div
              className="font-dm-sans text-xs sm:text-sm md:text-[15px] text-ungu-heading/85 leading-relaxed max-w-3xl mb-8 space-y-2"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />

            {/* Kartu Informasi Waktu & Lokasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              
              {/* Kartu 1: Waktu Pelaksanaan */}
              <div className="bg-cream-terang border-2 border-ungu-heading rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                <div className="w-11 h-11 rounded-full bg-hijau-butek flex items-center justify-center text-white shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                  </svg>
                </div>
                <div>
                  <span className="block font-dm-sans font-bold text-[10px] text-ungu-heading/60 uppercase tracking-wider mb-0.5">
                    WAKTU PELAKSANAAN
                  </span>
                  <span className="block font-dm-sans font-bold text-sm sm:text-[15px] text-ungu-heading leading-tight">
                    {dateLabel}
                  </span>
                  <span className="block font-dm-sans text-xs text-ungu-heading/75 mt-0.5">
                    {formatClockRange(event.start_time, event.end_time)}
                  </span>
                </div>
              </div>

              {/* Kartu 2: Lokasi Acara */}
              <div className="bg-cream-terang border-2 border-ungu-heading rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                <div className="w-11 h-11 rounded-full bg-kuning-tua border-2 border-ungu-heading flex items-center justify-center text-ungu-heading shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <span className="block font-dm-sans font-bold text-[10px] text-ungu-heading/60 uppercase tracking-wider mb-0.5">
                    LOKASI ACARA
                  </span>
                  <span className="block font-dm-sans font-bold text-sm sm:text-[15px] text-ungu-heading leading-tight">
                    {event.location}
                  </span>
                  {event.city && (
                    <span className="block font-dm-sans text-xs text-ungu-heading/75 mt-0.5">
                      {event.city}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Kolom Kanan: Poster Event */}
          <div className="lg:col-span-4 xl:col-span-3 flex justify-center lg:justify-end">
            <div className="bg-cream-terang border-2 border-ungu-heading rounded-2xl sm:rounded-3xl p-3 shadow-[5px_5px_0_var(--color-ungu-heading)] w-full max-w-[270px]">
              {poster ? (
                <img
                  src={poster}
                  alt={`Poster ${event.event}`}
                  className="w-full h-auto rounded-xl sm:rounded-2xl border-2 border-ungu-heading object-cover"
                />
              ) : (
                <div className="aspect-[3/4] rounded-xl sm:rounded-2xl border-2 border-dashed border-ungu-heading/40 flex items-center justify-center font-dm-sans font-bold text-xs text-ungu-heading/50 uppercase tracking-wider">
                  Poster segera hadir
                </div>
              )}

              <div className="inline-flex w-full items-center justify-center gap-1.5 mt-3 mb-1 font-dm-sans font-black text-xs text-hijau uppercase tracking-wider">
                <span>&#10003;</span>
                <span>{onSale ? "KUOTA TERBATAS" : "PENJUALAN DITUTUP"}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
