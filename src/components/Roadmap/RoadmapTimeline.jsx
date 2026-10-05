import { Link } from "react-router-dom";
import { HiCheck, HiBolt, HiClock, HiChevronDoubleDown } from "react-icons/hi2";
import { ROADMAP_MILESTONES } from "../../data/roadmapData";
import SectionDivider from "../SectionDivider";
import nodeEyeStar from "../../assets/soiree-dansante-assets/objects/11-mata-bintang.png";

// Subkomponen Card Timeline (Menerapkan prinsip DRY agar kode rapi & mudah dimaintain)
function TimelineCard({ item, renderStatusIcon }) {
  return (
    <div className="relative w-full max-w-[480px]">
      {/* Bintang Pink Didekatkan Tepat di Atas Sudut Kanan Card 2 Sesuai Desain */}
      {item.id === 2 && (
        <span
          className="absolute -top-7 right-0 text-pink-custom text-3xl select-none pointer-events-none z-30"
          aria-hidden="true"
        >
          ★
        </span>
      )}

      {/* Label Vertikal Hijau Melekat di Sisi Kiri Card 3 Sesuai Desain */}
      {item.id === 3 && (
        <div
          className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 px-0.5 py-1.5 bg-hijau/85 border border-ungu-heading/40 rounded text-[8px] font-mono font-bold text-cream-terang [writing-mode:vertical-lr] tracking-widest select-none z-30 pointer-events-none"
          aria-hidden="true"
        >
          RO-03
        </div>
      )}

      <article className="w-full bg-cream-terang border-2 border-ungu-heading rounded-[22px] sm:rounded-[26px] shadow-[4px_4px_0_var(--color-ungu-heading)] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ungu-heading)] text-left">
        {/* Top Accent Strip untuk Card Aktif */}
        {item.isHighlighted && (
          <div className="h-2.5 w-full bg-kuning-tua border-b-2 border-ungu-heading" aria-hidden="true" />
        )}

        <div className="p-5 sm:p-7 lg:p-8">
          {/* Header: Status Badge (Kanan untuk Card Kiri, Kiri untuk Card Kanan) */}
          <div className={`flex ${item.cardPosition === "left" ? "justify-end" : "justify-start"} mb-3`}>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-dm-sans font-bold shadow-2xs ${item.statusBadgeColor}`}
            >
              {renderStatusIcon(item.statusType)}
              <span>{item.statusText}</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="font-fraunces font-black text-xl sm:text-2xl text-ungu-heading mb-1.5 leading-tight">
            {item.title}
          </h2>

          {/* Date & Venue */}
          <p className={`font-dm-sans font-bold text-xs sm:text-[13px] ${item.dateColor} mb-3`}>
            {item.dateVenue}
          </p>

          {/* Description */}
          <p className="font-dm-sans text-xs sm:text-sm text-gray-custom leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Action Button */}
          <div>
            <Link
              to={item.buttonLink}
              className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full border-2 border-ungu-heading shadow-[2px_2px_0_var(--color-ungu-heading)] text-xs font-dm-sans font-black uppercase tracking-wider transition-all active:translate-y-0.5 cursor-pointer ${
                item.isHighlighted
                  ? "bg-kuning-tua hover:bg-kuning-muda text-ungu-heading"
                  : "bg-cream-terang hover:bg-cream-tua text-ungu-heading"
              }`}
            >
              <span>{item.buttonText}</span>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

// Subkomponen Ilustrasi Lingkaran Artwork
function TimelineArtwork({ item }) {
  return (
    <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-full bg-cream-terang border-2 border-ungu-heading shadow-[4px_4px_0_var(--color-ungu-heading)] flex items-center justify-center p-3 sm:p-4 overflow-hidden select-none">
      <img
        src={item.artwork}
        alt={item.artworkAlt}
        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}

export default function RoadmapTimeline() {
  const renderStatusIcon = (statusType) => {
    if (statusType === "completed") {
      return <HiCheck className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" aria-hidden="true" />;
    }
    if (statusType === "active") {
      return <HiBolt className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" aria-hidden="true" />;
    }
    return <HiClock className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" aria-hidden="true" />;
  };

  return (
    <section id="roadmap-timeline" className="relative w-full bg-cream-terang py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Label Sudut Bergaya Vintage Sesuai Desain */}
      <div
        className="absolute top-6 left-4 sm:left-6 lg:left-8 px-1 py-2 bg-kuning-tua/90 border border-ungu-heading/50 rounded text-[9px] font-mono font-bold text-ungu-heading [writing-mode:vertical-lr] tracking-widest select-none shadow-2xs pointer-events-none"
        aria-hidden="true"
      >
        SD-2027
      </div>

      <div
        className="absolute bottom-8 right-4 sm:right-6 lg:right-8 px-1 py-2 bg-kuning-tua/90 border border-ungu-heading/50 rounded text-[9px] font-mono font-bold text-ungu-heading [writing-mode:vertical-lr] tracking-widest select-none shadow-2xs pointer-events-none"
        aria-hidden="true"
      >
        SD-2027
      </div>

      {/* Container utama dengan lebar sejajar persis seperti Navbar (max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Garis Kolom Pita Belang Diagonal Tengah */}
        <div
          className="hidden md:block absolute top-4 bottom-14 left-1/2 -translate-x-1/2 w-6 lg:w-7 bg-stripe-timeline border-x-2 border-ungu-heading pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Daftar Milestones Roadmap */}
        <div className="space-y-14 sm:space-y-18 md:space-y-24 relative z-10">
          {ROADMAP_MILESTONES.map((item) => {
            const isLeft = item.cardPosition === "left";

            return (
              <div
                key={item.id}
                className="relative flex flex-col md:grid md:grid-cols-2 items-center"
              >
                {/* Node Tengah di atas Timeline Line (Desktop) */}
                <div
                  className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                  aria-hidden="true"
                >
                  <div
                    className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-ungu-heading shadow-[3px_3px_0_var(--color-ungu-heading)] flex items-center justify-center p-1.5 ${item.nodeCircleBg}`}
                  >
                    <img
                      src={nodeEyeStar}
                      alt="Ornamen Titik Roadmap"
                      className="w-full h-full object-contain select-none"
                    />
                  </div>

                  <div
                    className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full border-2 border-ungu-heading shadow-[2px_2px_0_var(--color-ungu-heading)] text-[11px] font-black tracking-wider uppercase -mt-2.5 z-30 select-none ${item.nodeBadgeColor}`}
                  >
                    {item.hasCheckmark && <span>✓</span>}
                    <span>{item.badgeLabel}</span>
                  </div>
                </div>

                {/* Sisi Kiri: Diberi margin kanan agar tidak mepet garis tengah */}
                <div className={`w-full flex justify-center md:justify-end ${isLeft ? "order-1" : "order-2 md:order-1"}`}>
                  <div className="w-full flex justify-center md:justify-end md:mr-10 lg:mr-16">
                    {isLeft ? (
                      <TimelineCard item={item} renderStatusIcon={renderStatusIcon} />
                    ) : (
                      <TimelineArtwork item={item} />
                    )}
                  </div>
                </div>

                {/* Node Penanda Khusus Tampilan Mobile */}
                <div className="flex md:hidden flex-col items-center my-4 z-10" aria-hidden="true">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-ungu-heading shadow-[2px_2px_0_var(--color-ungu-heading)] text-xs font-black tracking-wider uppercase ${item.nodeBadgeColor}`}
                  >
                    {item.hasCheckmark && <span>✓</span>}
                    <span>{item.badgeLabel}</span>
                  </div>
                </div>

                {/* Sisi Kanan: Diberi margin kiri agar tidak mepet garis tengah */}
                <div className={`w-full flex justify-center md:justify-start ${isLeft ? "order-3 md:order-2" : "order-1 md:order-2"}`}>
                  <div className="w-full flex justify-center md:justify-start md:ml-10 lg:ml-16">
                    {!isLeft ? (
                      <TimelineCard item={item} renderStatusIcon={renderStatusIcon} />
                    ) : (
                      <TimelineArtwork item={item} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Titik Akhir Alur Timeline (Lingkaran Kuning dengan Panah Ganda ke Bawah) */}
        <div className="flex justify-center mt-14 sm:mt-18 relative z-20">
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-kuning-tua border-2 border-ungu-heading shadow-[2.5px_2.5px_0_var(--color-ungu-heading)] flex items-center justify-center text-ungu-heading select-none hover:scale-105 transition-transform"
            aria-label="Penanda akhir timeline"
          >
            <HiChevronDoubleDown className="w-5 h-5 text-ungu-heading stroke-[2.5]" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Pembatas Bawah Section Alur Timeline Menuju Section 3 */}
      <SectionDivider className="mt-16 sm:mt-20" />
    </section>
  );
}
