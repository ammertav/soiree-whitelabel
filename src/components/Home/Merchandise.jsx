import { Link } from "react-router-dom";
import SectionDivider from "../SectionDivider";
import merchImage from "../../assets/images/merchandise/node-480.png";
import iconHanger from "../../assets/icons/merchandise/icon-456.svg";
import iconHat from "../../assets/icons/merchandise/icon-461.svg";
import iconTote from "../../assets/icons/merchandise/icon-466.svg";
import iconTag from "../../assets/icons/merchandise/icon-471.svg";

export default function Merchandise() {
  const merchItems = [
    {
      name: "Long Sleeve Tee",
      icon: iconHanger,
    },
    {
      name: "Bucket Hat Catur",
      icon: iconHat,
    },
    {
      name: "Canvas Tote Bag",
      icon: iconTote,
    },
    {
      name: "Sticker & Woven Wristband",
      icon: iconTag,
    },
  ];

  return (
    <section
      id="merchandise"
      className="relative w-full bg-cream-tua pt-14 md:pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Merchandise Flat-Lay Image Card */}
          <div className="lg:col-span-6">
            <div className="rounded-[22px] sm:rounded-[26px] overflow-hidden border-[2.5px] sm:border-[3px] border-ungu-heading bg-cream-tua shadow-[4px_5px_0_var(--color-ungu-heading)] transition-transform duration-300 hover:scale-[1.01]">
              <img
                src={merchImage}
                alt="Official Festival Merchandise Soirée Dansante 2027"
                className="w-full h-auto object-cover block select-none"
              />
            </div>
          </div>

          {/* Right Column: Merchandise Details, Items & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center">
            {/* Top Pill Badge */}
            <span className="inline-block px-4 sm:px-5 py-1 sm:py-1.5 rounded-full bg-hijau text-cream-tua font-dm-sans font-bold text-[11px] sm:text-xs uppercase tracking-[0.16em] border-2 border-ungu-heading shadow-[2.5px_3px_0_var(--color-ungu-heading)] mb-4 sm:mb-5">
              EDISI TERBATAS 2027
            </span>

            {/* Title */}
            <h2 className="font-fraunces font-black text-3xl sm:text-4xl lg:text-[44px] text-hijau tracking-tight leading-[1.14] mb-3 sm:mb-4">
              Official Festival
              <br />
              Merchandise
            </h2>

            {/* Description */}
            <p className="font-dm-sans text-xs sm:text-sm text-ungu-heading/90 leading-relaxed font-normal mb-5 sm:mb-6 max-w-xl">
              Koleksi cenderamata resmi Soirée Dansante 2027 dengan grafis
              ilustrasi panggung teatrikal cat-proscenium yang ikonik. Tersedia
              pra-pesan online atau di booth resmi area festival.
            </p>

            {/* 2x2 Grid of Merch Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-6 sm:mb-8">
              {merchItems.map((item) => (
                <div
                  key={item.name}
                  className="rounded-[12px] border-2 border-ungu-heading bg-cream-tua px-3.5 py-2.5 sm:py-3 flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5 object-contain shrink-0"
                  />
                  <span className="font-dm-sans font-bold text-xs sm:text-[13px] text-ungu-heading leading-tight">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/katalog-merchandise"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-kuning-tua text-ungu-heading border-2 border-ungu-heading font-dm-sans font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[3.5px_4px_0_var(--color-ungu-heading)] hover:bg-kuning-muda hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all"
            >
              {/* Outline Shopping Bag Icon matching design */}
              <svg
                className="w-4 h-4 text-ungu-heading shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8h12v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8z" />
                <path d="M9 8V5a3 3 0 0 1 6 0v3" />
              </svg>
              <span>KUNJUNGI TOKO MERCH</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Vintage Divider */}
      <SectionDivider className="mt-14 md:mt-20" />
    </section>
  );
}

