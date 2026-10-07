import { formatRupiah } from "../../../utils";

// Tema stub tiket dirotasi per urutan tiket event
const STUB_THEMES = ["teal", "yellow", "cream"];

export default function TicketCard({ ticket, index, dateLabel, timeLabel, qty, onQtyChange, canIncrement }) {
  const theme = STUB_THEMES[index % STUB_THEMES.length];
  const isTeal = theme === "teal";
  const isYellow = theme === "yellow";
  const isSoldOut = !!ticket.sold;

  const stubBgClass = isTeal
    ? "bg-hijau text-cream-tua"
    : isYellow
    ? "bg-kuning-tua text-ungu-heading"
    : "bg-cream-terang text-ungu-heading";

  return (
    <article className={`bg-cream-terang border-2 border-ungu-heading rounded-2xl shadow-[4px_4px_0_var(--color-ungu-heading)] overflow-hidden flex flex-col md:flex-row items-stretch ${isSoldOut ? "opacity-60" : ""}`}>
      {/* Stub Kiri Bergaya Tiket Konser */}
      <div
        className={`w-full md:w-[230px] lg:w-[245px] ${stubBgClass} p-4 sm:p-5 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-dashed border-ungu-heading relative shrink-0`}
      >
        {/* Potongan Lubang Tiket Retro (Notches) */}
        <div className="hidden md:block absolute -top-3 -right-3 w-6 h-6 rounded-full bg-cream-tua border-2 border-ungu-heading z-10" />
        <div className="hidden md:block absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-cream-tua border-2 border-ungu-heading z-10" />

        <div>
          {/* Badge Atas */}
          <div className="mb-2.5">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-dm-sans font-black text-[10px] tracking-wider uppercase border border-ungu-heading ${
                isTeal
                  ? "bg-cream-terang text-ungu-heading"
                  : isYellow
                  ? "bg-ungu-heading text-cream-tua"
                  : "bg-hijau text-cream-tua"
              }`}
            >
              {isYellow ? <span>&#9733;</span> : <span className="text-kuning-tua font-black">||</span>}
              <span>TIKET {String(index + 1).padStart(2, "0")}</span>
            </span>
          </div>

          <h3
            className={`font-fraunces font-black text-xl sm:text-[22px] leading-tight uppercase ${
              isTeal ? "text-cream-tua" : "text-ungu-heading"
            }`}
          >
            {ticket.type}
          </h3>

          {dateLabel && (
            <p
              className={`font-dm-sans text-xs mt-1 ${
                isTeal ? "text-cream-tua/85" : "text-ungu-heading/85"
              }`}
            >
              {dateLabel}
            </p>
          )}
        </div>

        {/* Info Bawah Stub */}
        <div className="mt-3.5 space-y-1.5">
          {timeLabel && (
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-dm-sans border ${
                isTeal ? "border-cream-tua/30 text-cream-tua" : "border-ungu-heading/30 text-ungu-heading"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>{timeLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Konten Kanan: Harga, Stepper, & Deskripsi */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3 mb-2.5">
            <span className="font-fraunces font-black text-2xl sm:text-3xl text-ungu-heading tracking-tight">
              {formatRupiah(ticket.price)}
            </span>

            {/* Stepper Jumlah Tiket */}
            <div className="flex items-center gap-2 bg-cream-terang border-2 border-ungu-heading rounded-full px-2 py-1 shadow-xs">
              <button
                type="button"
                onClick={() => onQtyChange(ticket, -1)}
                disabled={qty === 0}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-cream-tua text-ungu-heading font-bold text-xs disabled:opacity-30 cursor-pointer"
                aria-label={`Kurangi kuantitas ${ticket.type}`}
              >
                &minus;
              </button>
              <span className="font-dm-sans font-black text-sm text-ungu-heading min-w-[18px] text-center">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => onQtyChange(ticket, 1)}
                disabled={isSoldOut || !canIncrement}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-cream-tua text-ungu-heading font-bold text-xs disabled:opacity-30 cursor-pointer"
                aria-label={`Tambah kuantitas ${ticket.type}`}
              >
                +
              </button>
            </div>
          </div>

          {/* Tag Status Ketersediaan */}
          <div className="mb-3">
            {isSoldOut ? (
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-merah/10 border border-merah/40 text-merah font-dm-sans font-black text-[10px] uppercase tracking-wider">
                HABIS TERJUAL
              </span>
            ) : (
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-hijau/10 border border-hijau/30 text-hijau font-dm-sans font-black text-[10px] uppercase tracking-wider">
                TERSEDIA
              </span>
            )}
          </div>

          {/* Deskripsi Tiket (dari organizer) */}
          {ticket.desc && (
            <div
              className="text-xs font-dm-sans text-ungu-heading/85 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: ticket.desc }}
            />
          )}
        </div>
      </div>
    </article>
  );
}
