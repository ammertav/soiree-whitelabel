import SectionDivider from "../SectionDivider";
import catMirror from "../../assets/images/manifesto/node-238.png";
import catHibiscus from "../../assets/images/manifesto/node-247.png";
import catCheer from "../../assets/images/manifesto/node-256.png";

export default function Manifesto() {
  const pillars = [
    {
      img: catMirror,
      alt: "Setiap Suara",
      title: "Setiap Suara",
      titleColor: "text-kuning-tua",
      description:
        "Keberagaman ekspresi musik menemukan cermin dan gaungnya di sini tanpa sekat hierarki antara panggung besar dan komunitas.",
    },
    {
      img: catHibiscus,
      alt: "Punya Tempat",
      title: "Punya Tempat",
      titleColor: "text-pink-custom",
      description:
        "Setiap musisi dan penikmat musik memiliki ruang aman untuk mekar bersama, merayakan karya otentik di tanah Jawa Tengah.",
    },
    {
      img: catCheer,
      alt: "Nama Sebagai Identitas",
      title: "Nama Sebagai Identitas",
      titleColor: "text-kuning-tua",
      description:
        "Merayakan kebersamaan, pertemanan baru, dan dentang kebebasan bernada yang akan selalu dikenang dalam riuh tepuk tangan.",
    },
  ];

  return (
    <section className="relative w-full bg-hijau-butek pt-16 md:pt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          {/* Pill Badge */}
          <span className="inline-block px-6 py-1.5 rounded-full bg-kuning-tua border-2 border-ungu-heading text-ungu-heading font-dm-sans font-bold text-xs tracking-widest uppercase shadow-sm">
            MANIFIESTO FESTIVAL
          </span>

          {/* Title */}
          <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-kuning-tua tracking-tight leading-tight mt-4 max-w-3xl">
            Bukan Sekadar Konser, Ini Panggung Pertemuan
          </h2>

          {/* Subtitle / Description */}
          <p className="font-dm-sans text-xs sm:text-sm md:text-base text-cream-tua/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            Soirée Dansante adalah festival musik outdoor dua hari di Semarang
            yang mempertemukan 60 band dari Semarang, Jawa Tengah, dan
            nasional. Dirancang sebagai ruang pertemuan, bukan hanya deretan
            penampilan panggung biasa.
          </p>
        </div>

        {/* 3 Pillar Cards - aligned with Navbar width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mt-12 md:mt-16">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-hijau-tua rounded-[24px] border-2 border-ungu-heading p-6 sm:p-8 flex flex-col items-center text-center shadow-[4px_5px_0_var(--color-ungu-heading)] transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Illustrated Mascot */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6">
                <img
                  src={pillar.img}
                  alt={pillar.alt}
                  className="max-w-full max-h-full object-contain drop-shadow-sm select-none"
                />
              </div>

              {/* Title */}
              <h3
                className={`font-fraunces font-black text-2xl sm:text-[26px] tracking-tight leading-snug ${pillar.titleColor}`}
              >
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="font-dm-sans text-xs sm:text-sm text-cream-tua/90 leading-relaxed mt-3">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Vintage Divider */}
      <SectionDivider className="mt-16 md:mt-24" />
    </section>
  );
}
