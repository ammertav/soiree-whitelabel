import { useState } from "react";
import { Link } from "react-router-dom";
import SectionDivider from "../SectionDivider";
import wingedCat from "../../assets/images/artist-lineup/kucing-bersayap-271.png";

export default function ArtistLineup() {
  const [activeTab, setActiveTab] = useState("SEMUA");

  const tabs = ["SEMUA", "DAY 01", "DAY 02", "PANGGUNG UTAMA"];

  // Custom decorative mini-ticket separator bar
  const DividerBar = () => (
    <span
      className="inline-flex items-center justify-center mx-2 sm:mx-3 select-none align-middle"
      aria-hidden="true"
    >
      <span className="w-1.5 h-4 sm:h-5 rounded-[2px] bg-merah/90 flex flex-col justify-between py-0.5 items-center">
        <span className="w-0.5 h-0.5 rounded-full bg-cream-tua/70" />
        <span className="w-0.5 h-0.5 rounded-full bg-cream-tua/70" />
        <span className="w-0.5 h-0.5 rounded-full bg-cream-tua/70" />
      </span>
    </span>
  );

  // Bullet separator
  const Dot = () => (
    <span
      className="inline-block mx-2 sm:mx-3 text-merah/80 font-black text-xs select-none align-middle"
      aria-hidden="true"
    >
      •
    </span>
  );

  return (
    <section
      id="lineup"
      className="relative w-full bg-linear-to-b from-cream-tua to-cream-tengah pt-16 md:pt-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          {/* Top Badge */}
          <span className="inline-block px-5 py-1 rounded-full bg-merah text-cream-tua font-dm-sans font-bold text-[10px] sm:text-xs tracking-widest uppercase border-2 border-ungu-heading shadow-sm">
            USULAN KURASI • BELUM LINEUP FINAL
          </span>

          {/* Title with Winged Cat Mascot */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4">
            <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-5xl text-ungu-heading tracking-tight leading-tight">
              Artist Playlist &amp; Penampil
            </h2>
            <img
              src={wingedCat}
              alt="Winged Cat Mascot"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain select-none shrink-0"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-dm-sans font-bold text-xs uppercase px-5 sm:px-6 py-1.5 rounded-full border-2 border-ungu-heading transition-all cursor-pointer ${
                    isActive
                      ? "bg-kuning-tua text-ungu-heading shadow-[2px_2px_0_var(--color-ungu-heading)] -translate-y-0.5"
                      : "bg-cream-tua text-ungu-heading hover:bg-cream-tengah"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Artist Playlist Box - aligned with Navbar width */}
        <div className="bg-cream-tua rounded-[28px] border-2 border-ungu-heading p-6 sm:p-10 md:p-12 shadow-[4px_6px_0_var(--color-ungu-heading)] w-full mx-auto mt-8 sm:mt-10 text-center leading-loose">
          <div className="flex flex-wrap items-center justify-center gap-y-3 sm:gap-y-4">
            {/* Line 1 */}
            <span className="font-fraunces font-black text-lg sm:text-xl md:text-2xl text-ungu-heading tracking-tight">
              THE ADAMS
            </span>
            <DividerBar />
            <span className="font-fraunces font-black text-lg sm:text-xl md:text-2xl text-hijau tracking-tight">
              BARASUARA
            </span>
            <DividerBar />
            <span className="font-fraunces font-black text-lg sm:text-xl md:text-2xl text-ungu-heading tracking-tight">
              THE S.I.G.I.T.
            </span>
            <DividerBar />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-ungu-heading">
              .FEAST
            </span>
            <Dot />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-hijau">
              HINDIA
            </span>
            <Dot />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-ungu-heading">
              EFEEK RUMAH KACA
            </span>
            <DividerBar />

            {/* Line 2 */}
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-hijau">
              REALITY CLUB
            </span>
            <Dot />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-ungu-heading">
              GRRRL GANG
            </span>
            <DividerBar />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-hijau">
              MORFEM
            </span>
            <Dot />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-ungu-heading">
              ROCKET ROCKERS
            </span>
            <DividerBar />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-hijau">
              PEE WEE GASKINS
            </span>
            <Dot />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-ungu-heading">
              SOEGI BORNEAN
            </span>
            <DividerBar />

            {/* Line 3 */}
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-hijau">
              GOODNIGHT ELECTRIC
            </span>
            <Dot />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-ungu-heading">
              THE CHANGCUTERS
            </span>
            <DividerBar />
            <span className="font-fraunces font-black text-xl sm:text-2xl md:text-3xl text-hijau tracking-tight">
              WHITE SHOES &amp; THE COUPLES COMPANY
            </span>
            <Dot />

            {/* Line 4 */}
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-ungu-heading">
              J-ROCKS
            </span>
            <DividerBar />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-hijau">
              DANILLA
            </span>
            <Dot />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-ungu-heading">
              JASON RANTI
            </span>
            <DividerBar />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-hijau">
              THE PANASDALAM
            </span>
            <Dot />
            <span className="font-dm-sans font-black text-xs sm:text-sm md:text-base text-ungu-heading">
              DAN BANYAK LAGI...
            </span>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <Link
            to="/lineup"
            className="inline-flex items-center gap-2 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-cream-tua border-2 border-ungu-heading text-ungu-heading font-dm-sans font-bold text-xs uppercase tracking-wider shadow-[3px_4px_0_var(--color-ungu-heading)] hover:bg-cream-tengah hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all"
          >
            LIHAT SEMUA 60 LINEUP LENGKAP →
          </Link>
        </div>
      </div>

      {/* Bottom Vintage Divider */}
      <SectionDivider className="mt-16 md:mt-24" />
    </section>
  );
}
