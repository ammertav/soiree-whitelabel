import { Link } from "react-router-dom";
import SectionDivider from "../SectionDivider";

export default function Tickets() {
  const ticketCategories = [
    {
      type: "TIKET HARIAN",
      name: "DAY 01 PASS",
      date: "Jumat, 16 April 2027",
      headerBg: "bg-hijau",
      titleColor: "text-cream-tua",
      labelColor: "text-cream-tua/80",
      dateColor: "text-cream-tua/80",
      price: "Rp 175.000",
      priceColor: "text-ungu-heading",
      desc: "Akses 4 Panggung • Pukul 13.00 – Selesai",
      statusText: "TERSEDIA",
      statusColor: "text-hijau",
      dotColor: "bg-hijau",
      btnBg: "bg-kuning-tua text-ungu-heading hover:bg-kuning-muda",
      isPopular: false,
    },
    {
      type: "TIKET HARIAN",
      name: "DAY 02 PASS",
      date: "Sabtu, 17 April 2027",
      headerBg: "bg-pink-custom",
      titleColor: "text-ungu-heading",
      labelColor: "text-ungu-heading/75",
      dateColor: "text-ungu-heading/80",
      price: "Rp 175.000",
      priceColor: "text-ungu-heading",
      desc: "Akses 4 Panggung • Pukul 13.00 – Selesai",
      statusText: "TERSEDIA",
      statusColor: "text-pink-custom",
      dotColor: "bg-pink-custom",
      btnBg: "bg-kuning-tua text-ungu-heading hover:bg-kuning-muda",
      isPopular: false,
    },
    {
      type: "AKSES PENUH 2 HARI",
      name: "2-DAY PASS (TERBAIK)",
      date: "16 & 17 April 2027",
      headerBg: "bg-kuning-muda",
      titleColor: "text-ungu-heading",
      labelColor: "text-ungu-heading/75",
      dateColor: "text-ungu-heading/80",
      price: "Rp 295.000",
      priceColor: "text-merah",
      desc: "Hemat Rp 55.000 dibanding tiket harian terpisah",
      statusText: "SISA SEDIKIT!",
      statusColor: "text-merah",
      dotColor: "bg-merah",
      btnBg: "bg-hijau text-cream-tua hover:bg-hijau-butek",
      isPopular: true,
    },
  ];

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
            PRESALE GELOMBANG 1
          </span>

          {/* Heading */}
          <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-5xl text-ungu-heading tracking-tight leading-tight mt-4">
            Open Presale Ticket
          </h2>

          {/* Subtitle */}
          <p className="font-dm-sans text-xs sm:text-sm md:text-base text-ungu-heading/90 max-w-xl mx-auto mt-3 leading-relaxed font-medium">
            Pilih tiketmu sekarang sebelum kuota presale habis. Kuota terbatas
            untuk setiap kategori panggung.
          </p>
        </div>

        {/* 3 Ticket Cards - aligned with Navbar width and strictly equal height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mt-12 md:mt-16 items-stretch">
          {ticketCategories.map((ticket, idx) => (
            <div
              key={idx}
              className="relative rounded-[24px] border-2 border-ungu-heading bg-cream-tua overflow-hidden shadow-[4px_6px_0_var(--color-ungu-heading)] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Ticket Top Header - fixed height for seamless horizontal alignment */}
              <div
                className={`${ticket.headerBg} p-5 sm:p-6 pb-4 relative h-[130px] sm:h-[138px] flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-dm-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider block ${ticket.labelColor}`}
                  >
                    {ticket.type}
                  </span>
                  {ticket.isPopular && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-merah text-cream-tua font-dm-sans font-bold text-[9px] uppercase tracking-wider border border-ungu-heading shadow-xs">
                      PALING LARIS
                    </span>
                  )}
                </div>

                <div>
                  <h3
                    className={`font-fraunces font-black text-xl sm:text-[22px] lg:text-2xl tracking-tight leading-snug whitespace-nowrap ${ticket.titleColor}`}
                  >
                    {ticket.name}
                  </h3>
                  <p
                    className={`font-dm-sans font-medium text-xs mt-0.5 ${ticket.dateColor}`}
                  >
                    {ticket.date}
                  </p>
                </div>
              </div>

              {/* Ticket Perforation / Notch Divider - guaranteed at exact same height */}
              <div className="relative flex items-center bg-cream-tua h-4 overflow-visible">
                {/* Left Cutout */}
                <div className="w-5 h-5 rounded-full bg-kuning-tua border-2 border-ungu-heading -ml-2.5 shrink-0 z-10" />
                {/* Dashed Line */}
                <div className="flex-1 border-b-2 border-dashed border-ungu-heading mx-1" />
                {/* Right Cutout */}
                <div className="w-5 h-5 rounded-full bg-kuning-tua border-2 border-ungu-heading -mr-2.5 shrink-0 z-10" />
              </div>

              {/* Ticket Bottom Body - guaranteed at exact same baseline */}
              <div className="p-5 sm:p-6 pt-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Price */}
                  <div
                    className={`font-fraunces font-black text-3xl sm:text-4xl tracking-tight ${ticket.priceColor}`}
                  >
                    {ticket.price}
                  </div>
                  {/* Description */}
                  <p className="font-dm-sans text-xs text-ungu-heading/80 mt-1 leading-snug font-medium line-clamp-1 sm:line-clamp-none">
                    {ticket.desc}
                  </p>
                </div>

                {/* Bottom Status & Action Bar */}
                <div className="border-t border-ungu-heading/20 pt-4 mt-6 flex items-center justify-between">
                  {/* Stock Status */}
                  <div className="inline-flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${ticket.dotColor} shrink-0`}
                    />
                    <span
                      className={`font-dm-sans font-black text-[11px] tracking-wider uppercase ${ticket.statusColor}`}
                    >
                      {ticket.statusText}
                    </span>
                  </div>

                  {/* Choose Ticket Button */}
                  <Link
                    to="/pemesanan"
                    className={`inline-block px-5 py-1.5 rounded-full border-2 border-ungu-heading font-dm-sans font-bold text-xs uppercase tracking-wider transition-all active:translate-y-0.5 ${ticket.btnBg}`}
                  >
                    PILIH TIKET
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Footnote */}
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
            Pajak &amp; biaya admin sudah termasuk. Tiket resmi langsung dikirim
            ke WhatsApp &amp; Email segera setelah transaksi selesai.
          </p>
        </div>
      </div>

      {/* Bottom Vintage Divider */}
      <SectionDivider className="mt-16 md:mt-24" />
    </section>
  );
}
