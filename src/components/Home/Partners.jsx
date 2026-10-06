import SectionDivider from "../SectionDivider";
import iconAntenna from "../../assets/icons/partners/icon-548.svg";
import iconTemple from "../../assets/icons/partners/icon-569.svg";
import iconBadge from "../../assets/icons/partners/icon-575.svg";

export default function Partners() {
  const mainPartners = [
    { name: "BANK JATENG", twoLines: false },
    { name: "TELKOMSEL", twoLines: false },
    { name: "GRAB", twoLines: false },
    { name: "TEH BOTOL\nSOSRO", twoLines: true },
  ];

  const brandPartners = [
    "EIGER",
    "KOPI KENANGAN",
    "CLEO WATER",
    "SUPERMUSIC",
    "POSTER.ID",
  ];

  const mediaPartners = [
    "PRAMBORS RADIO",
    "TRAX FM SEMARANG",
    "WHITEBOARD JOURNAL",
    "GIGSPLAY",
    "KANALTIGAPULUH",
    "REKAM MEDIA JATENG",
    "SEMARANG KREATIF",
  ];

  const institutionalPartners = [
    "Kemenparekraf / Wonderful Indonesia",
    "Disbudpar Kota Semarang",
    "Pemerintah Provinsi Jawa Tengah",
    "PT PRPP Jawa Tengah (Perseroda)",
  ];

  return (
    <section
      id="partners"
      className="relative w-full bg-cream-tua pt-14 md:pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          {/* Top Pill Badge */}
          <span className="inline-block px-5 py-1.5 rounded-full bg-kuning-tua text-ungu-heading font-dm-sans font-black text-[10px] sm:text-xs uppercase tracking-[0.18em] border-2 border-ungu-heading shadow-sm mb-3">
            KOLABORASI &amp; DUKUNGAN
          </span>

          {/* Heading */}
          <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-ungu-heading tracking-tight leading-tight mt-1 mb-6 sm:mb-8">
            Para Mitra Penjaga Suara
          </h2>
        </div>

        {/* Tier 1: Main Partners (Mitra Utama) */}
        <div>
          {/* Subheading with decorative dots */}
          <div className="flex items-center justify-center gap-2 mb-4 font-dm-sans font-bold text-[10px] sm:text-xs text-ungu-heading/90 uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-kuning-tua border border-ungu-heading shrink-0" />
            <span>MITRA UTAMA • OFFICIAL MAIN PARTNERS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-kuning-tua border border-ungu-heading shrink-0" />
          </div>

          {/* 4 Large Partner Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 w-full">
            {mainPartners.map((partner) => (
              <div
                key={partner.name}
                className="rounded-[20px] border-2 border-ungu-heading bg-cream-tua shadow-[4px_5px_0_var(--color-ungu-heading)] flex items-center justify-center p-4 sm:p-5 text-center min-h-[96px] sm:min-h-[115px] md:min-h-[125px] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="font-fraunces font-black text-lg sm:text-xl md:text-2xl text-ungu-heading tracking-tight uppercase leading-snug whitespace-pre-line">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Supporting Brand Partners */}
        <div className="mt-8 sm:mt-10">
          {/* Subheading */}
          <div className="text-center font-dm-sans font-bold text-[10px] sm:text-xs text-ungu-heading/90 uppercase tracking-[0.2em] mb-4">
            MITRA PENDUKUNG &amp; BRAND PARTNERS
          </div>

          {/* 5 Brand Partner Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 w-full">
            {brandPartners.map((brand) => (
              <div
                key={brand}
                className="rounded-[14px] border-2 border-ungu-heading bg-cream-tua shadow-[3px_4px_0_var(--color-ungu-heading)] flex items-center justify-center p-3 text-center min-h-[58px] sm:min-h-[68px] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="font-dm-sans font-black text-xs sm:text-sm text-ungu-heading tracking-wider uppercase">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3: Media Partners & Institutional Support Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mt-8 sm:mt-10 items-stretch w-full">
          {/* Left Column: Media Partner & Creative Hubs */}
          <div className="lg:col-span-7 rounded-[22px] border-2 border-ungu-heading bg-cream-tua p-5 sm:p-6 shadow-[4px_5px_0_var(--color-ungu-heading)] flex flex-col justify-start">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <img
                src={iconAntenna}
                alt=""
                className="w-4 h-4 object-contain shrink-0"
              />
              <span className="font-dm-sans font-black text-[11px] sm:text-xs uppercase tracking-wider text-ungu-heading">
                MEDIA PARTNER &amp; CREATIVE HUBS
              </span>
            </div>

            {/* Partner Pills */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {mediaPartners.map((item) => (
                <span
                  key={item}
                  className="inline-block px-3.5 sm:px-4 py-1.5 rounded-full border-2 border-ungu-heading bg-cream-tua text-ungu-heading font-dm-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors hover:bg-cream-tengah"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Institutional Support */}
          <div className="lg:col-span-5 rounded-[22px] border-2 border-ungu-heading bg-cream-tua p-5 sm:p-6 shadow-[4px_5px_0_var(--color-ungu-heading)] flex flex-col justify-start">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <img
                src={iconTemple}
                alt=""
                className="w-4 h-4 object-contain shrink-0"
              />
              <span className="font-dm-sans font-black text-[11px] sm:text-xs uppercase tracking-wider text-ungu-heading">
                DIDUKUNG OLEH (INSTITUTIONAL SUPPORT)
              </span>
            </div>

            {/* Partner List */}
            <div className="flex flex-col gap-2.5">
              {institutionalPartners.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-ungu-heading"
                >
                  <img
                    src={iconBadge}
                    alt=""
                    className="w-4 h-4 object-contain shrink-0"
                  />
                  <span className="font-dm-sans font-bold text-xs sm:text-[13px] text-ungu-heading leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Vintage Divider */}
      <SectionDivider className="mt-14 md:mt-20" />
    </section>
  );
}
