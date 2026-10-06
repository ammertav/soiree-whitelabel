import eyeStarOrnament from "../../assets/soiree-dansante-assets/objects/11-mata-bintang.png";

// Data konstan hero kontak
const CONTACT_HERO_DATA = {
  badgeText: "PUSAT INFORMASI & BANTUAN PENONTON",
  titleMain: "Hubungi Penyelenggara",
  titleAccent: "Soirée Dansante",
  descriptionLines: [
    "Ada pertanyaan seputar tiket, aksesibilitas panggung, kemitraan sponsor, peliputan",
    "pers, atau penukaran wristband? Kami siap mendengar setiap suara.",
  ],
  cardHeader: "HUBUNGI KAMI",
  cardBrand: "SOIRÉE DANSANTE",
  bannerLines: ["SETIAP SUARA PUNYA", "TEMPAT"],
};

export default function ContactHero() {
  return (
    <section
      id="contact-hero"
      className="relative w-full bg-putih-butek pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 overflow-hidden"
      aria-label="Pusat Informasi dan Bantuan Penonton Soirée Dansante"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge Pusat Informasi */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-1.5 rounded-full border-2 border-ungu-heading bg-putih-butek mb-6 sm:mb-8 select-none">
          <span
            className="w-4 h-4 rounded-[4px] border border-ungu-heading flex items-center justify-center font-dm-sans font-bold text-[10px] text-ungu-heading leading-none"
            aria-hidden="true"
          >
            ?
          </span>
          <span className="font-dm-sans font-bold text-xs sm:text-[13px] tracking-wider uppercase text-ungu-heading">
            {CONTACT_HERO_DATA.badgeText}
          </span>
        </div>

        {/* Judul Hero */}
        <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight mb-5 sm:mb-6">
          <span className="block font-black text-ungu-heading">
            {CONTACT_HERO_DATA.titleMain}
          </span>
          <span className="block italic font-black text-hijau mt-1 sm:mt-2">
            {CONTACT_HERO_DATA.titleAccent}
          </span>
        </h1>

        {/* Deskripsi */}
        <p className="font-dm-sans font-normal text-sm sm:text-base md:text-lg text-gray-custom max-w-3xl leading-relaxed mb-8 sm:mb-10">
          {CONTACT_HERO_DATA.descriptionLines.map((line, idx) => (
            <span key={idx}>
              {line}
              {idx < CONTACT_HERO_DATA.descriptionLines.length - 1 && (
                <>
                  {" "}
                  <br className="hidden md:inline" />
                </>
              )}
            </span>
          ))}
        </p>

        {/* Card Badge */}
        <div className="relative w-64 sm:w-[270px] bg-putih-butek rounded-2xl border-2 sm:border-[2.5px] border-ungu-heading pt-3 sm:pt-3.5 flex flex-col items-center">
          <span className="font-dm-sans font-bold text-[10px] sm:text-[11px] text-ungu-heading tracking-[0.22em] uppercase mb-1 select-none">
            {CONTACT_HERO_DATA.cardHeader}
          </span>

          <div className="flex flex-col items-center">
            <img
              src={eyeStarOrnament}
              alt="Ilustrasi Mata Bintang Soirée Dansante"
              className="w-28 sm:w-32 h-auto object-contain select-none pointer-events-none"
            />
            <span className="font-fraunces font-bold text-[9px] sm:text-[10px] text-ungu-heading tracking-[0.16em] uppercase -mt-1 mb-2 select-none">
              {CONTACT_HERO_DATA.cardBrand}
            </span>
          </div>

          <div className="w-[calc(100%+4px)] -mb-[2px] -mx-[2px] bg-kuning-tua border-2 sm:border-[2.5px] border-ungu-heading rounded-2xl py-2 px-3 text-center select-none shadow-[0_4px_0_var(--color-ungu-heading)]">
            <p className="font-dm-sans font-black text-xs sm:text-[13px] text-ungu-heading uppercase tracking-wider leading-tight">
              {CONTACT_HERO_DATA.bannerLines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < CONTACT_HERO_DATA.bannerLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
