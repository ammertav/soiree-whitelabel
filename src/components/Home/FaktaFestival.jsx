import SectionDivider from "../SectionDivider";
import iconCalendar from "../../assets/icons/fakta-festival/icon-66.svg";
import iconLocationPin from "../../assets/icons/fakta-festival/icon-80.svg";
import iconEqualizer from "../../assets/icons/fakta-festival/icon-94.svg";
import iconTheaterMasks from "../../assets/icons/fakta-festival/icon-108.svg";

export default function FaktaFestival() {
  const cards = [
    {
      label: "WAKTU PELAKSANAAN",
      icon: iconCalendar,
      title: "2 HARI FESTIVAL",
      titleColor: "text-kuning-tua",
      subtitle: "16–17 April 2027",
      description:
        "Perayaan akhir pekan penuh musik di ruang terbuka dengan ritme tanpa henti dari siang hingga malam hari.",
      bgColor: "bg-hijau",
    },
    {
      label: "LOKASI BERSEJARAH",
      icon: iconLocationPin,
      title: "SEMARANG BARAT",
      titleColor: "text-pink-custom",
      subtitle: "PRPP SEMARANG",
      description:
        "Jl. Anjasmoro Raya, area festival outdoor yang lapang, sejuk dengan angin pesisir, serta ramah akses transportasi.",
      bgColor: "bg-ungu-heading",
    },
    {
      label: "DERETAN EKSIBISE",
      icon: iconEqualizer,
      title: "60 BAND",
      titleColor: "text-kuning-tua",
      subtitle: "15 LOKAL • 25 JATENG • 20 NASIONAL",
      description:
        "Ruang temu kurasi talenta alternatif, indie pop, post-punk, rock n' roll, hingga eksplorasi folk kontemporer.",
      bgColor: "bg-ungu-heading",
    },
    {
      label: "DESAIN PANGGUNG",
      icon: iconTheaterMasks,
      title: "4 PANGGUNG",
      titleColor: "text-kuning-tua",
      subtitle: "2 Main Stage • 2 Stage Pendukung",
      description:
        "Pengalaman pertunjukan simultan tanpa jeda panjang, memungkinkan eksplorasi nada tanpa batas di setiap penjuru.",
      bgColor: "bg-hijau",
    },
  ];

  return (
    <section className="relative w-full bg-linear-to-b from-cream-tua to-cream-tengah pt-16 md:pt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          {/* Pill Badge */}
          <span className="inline-block px-6 py-1.5 rounded-full bg-kuning-tua border-2 border-ungu-heading text-ungu-heading font-dm-sans font-bold text-xs tracking-widest uppercase shadow-sm">
            FAKTA FESTIVAL
          </span>

          {/* Heading */}
          <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-5xl text-ungu-heading tracking-tight leading-tight mt-4">
            Dua Hari Perayaan Akbar Semarang
          </h2>
        </div>

        {/* 2x2 Grid of Fact Cards - aligned with Navbar width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`${card.bgColor} rounded-[22px] border-2 border-ungu-heading p-6 sm:p-8 flex flex-col justify-between shadow-[3px_4px_0_var(--color-ungu-heading)] transition-transform duration-300 hover:-translate-y-0.5`}
            >
              {/* Card Top Row: Label & Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-dm-sans font-bold text-xs uppercase tracking-wider text-cream-tua/75">
                  {card.label}
                </span>
                <img
                  src={card.icon}
                  alt={card.label}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
                />
              </div>

              {/* Card Body: Title, Subtitle, Description */}
              <div>
                <h3
                  className={`font-fraunces font-black text-3xl sm:text-4xl tracking-tight leading-none ${card.titleColor}`}
                >
                  {card.title}
                </h3>
                <p className="font-dm-sans font-bold text-sm sm:text-base text-cream-tua mt-2 mb-4 tracking-wide">
                  {card.subtitle}
                </p>
                <p className="font-dm-sans text-xs sm:text-sm text-cream-tua/90 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Vintage Divider */}
      <SectionDivider className="mt-16 md:mt-24" />
    </section>
  );
}
