import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SectionDivider from "../SectionDivider";
import wingedCat from "../../assets/images/artist-lineup/kucing-bersayap-271.png";

// Data kurasi penampil playlist festival
const ARTISTS_PLAYLIST = [
  { id: "the-adams", name: "THE ADAMS", isHeadliner: true, color: "text-ungu-heading", day: "DAY 01", isMainStage: true },
  { id: "barasuara", name: "BARASUARA", isHeadliner: true, color: "text-hijau", day: "DAY 02", isMainStage: true },
  { id: "the-sigit", name: "THE S.I.G.I.T.", isHeadliner: true, color: "text-ungu-heading", day: "DAY 01", isMainStage: true },
  { id: "feast", name: ".FEAST", isHeadliner: false, color: "text-ungu-heading", day: "DAY 02", isMainStage: true },
  { id: "hindia", name: "HINDIA", isHeadliner: false, color: "text-hijau", day: "DAY 02", isMainStage: true },
  { id: "efek-rumah-kaca", name: "EFEK RUMAH KACA", isHeadliner: false, color: "text-ungu-heading", day: "DAY 01", isMainStage: true },
  { id: "reality-club", name: "REALITY CLUB", isHeadliner: false, color: "text-hijau", day: "DAY 02", isMainStage: false },
  { id: "grrrl-gang", name: "GRRRL GANG", isHeadliner: false, color: "text-ungu-heading", day: "DAY 01", isMainStage: false },
  { id: "morfem", name: "MORFEM", isHeadliner: false, color: "text-hijau", day: "DAY 02", isMainStage: false },
  { id: "rocket-rockers", name: "ROCKET ROCKERS", isHeadliner: false, color: "text-ungu-heading", day: "DAY 01", isMainStage: false },
  { id: "pee-wee-gaskins", name: "PEE WEE GASKINS", isHeadliner: false, color: "text-hijau", day: "DAY 01", isMainStage: false },
  { id: "soegi-bornean", name: "SOEGI BORNEAN", isHeadliner: false, color: "text-ungu-heading", day: "DAY 01", isMainStage: false },
  { id: "goodnight-electric", name: "GOODNIGHT ELECTRIC", isHeadliner: false, color: "text-hijau", day: "DAY 02", isMainStage: false },
  { id: "the-changcuters", name: "THE CHANGCUTERS", isHeadliner: false, color: "text-ungu-heading", day: "DAY 02", isMainStage: true },
  { id: "wsatcc", name: "WHITE SHOES & THE COUPLES COMPANY", isHeadliner: true, color: "text-hijau", day: "DAY 01", isMainStage: true },
  { id: "j-rocks", name: "J-ROCKS", isHeadliner: false, color: "text-ungu-heading", day: "DAY 01", isMainStage: false },
  { id: "danilla", name: "DANILLA", isHeadliner: false, color: "text-hijau", day: "DAY 02", isMainStage: false },
  { id: "jason-ranti", name: "JASON RANTI", isHeadliner: false, color: "text-ungu-heading", day: "DAY 02", isMainStage: false },
  { id: "the-panasdalam", name: "THE PANASDALAM", isHeadliner: false, color: "text-hijau", day: "DAY 01", isMainStage: false },
  { id: "dan-banyak-lagi", name: "DAN BANYAK LAGI...", isHeadliner: false, color: "text-ungu-heading", day: "ALL", isMainStage: false, isTrailer: true },
];

const TABS = ["SEMUA", "DAY 01", "DAY 02", "PANGGUNG UTAMA"];

export default function ArtistLineup() {
  const [activeTab, setActiveTab] = useState("SEMUA");

  const filteredArtists = useMemo(() => {
    if (activeTab === "SEMUA") return ARTISTS_PLAYLIST;
    if (activeTab === "DAY 01") {
      return ARTISTS_PLAYLIST.filter((artist) => artist.day === "DAY 01" || artist.isTrailer);
    }
    if (activeTab === "DAY 02") {
      return ARTISTS_PLAYLIST.filter((artist) => artist.day === "DAY 02" || artist.isTrailer);
    }
    if (activeTab === "PANGGUNG UTAMA") {
      return ARTISTS_PLAYLIST.filter((artist) => artist.isMainStage || artist.isTrailer);
    }
    return ARTISTS_PLAYLIST;
  }, [activeTab]);

  return (
    <section
      id="lineup"
      className="relative w-full bg-linear-to-b from-cream-tua to-cream-tengah pt-16 md:pt-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-block px-5 py-1 rounded-full bg-merah text-cream-tua font-dm-sans font-bold text-[10px] sm:text-xs tracking-widest uppercase border-2 border-ungu-heading shadow-sm">
            USULAN KURASI • BELUM LINEUP FINAL
          </span>

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
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
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

        {/* Artist Playlist Box */}
        <div className="bg-cream-tua rounded-[28px] border-2 border-ungu-heading p-6 sm:p-10 md:p-12 shadow-[4px_6px_0_var(--color-ungu-heading)] w-full mx-auto mt-8 sm:mt-10 text-center leading-loose">
          <div className="flex flex-wrap items-center justify-center gap-y-3 sm:gap-y-4">
            {filteredArtists.map((artist, idx) => {
              const isLast = idx === filteredArtists.length - 1;
              const isEvenSeparator = idx % 2 === 0;

              return (
                <div key={artist.id} className="inline-flex items-center">
                  <span
                    className={
                      artist.isHeadliner
                        ? `font-fraunces font-black text-lg sm:text-xl md:text-2xl tracking-tight ${artist.color}`
                        : `font-dm-sans font-black text-xs sm:text-sm md:text-base ${artist.color}`
                    }
                  >
                    {artist.name}
                  </span>

                  {!isLast && (
                    isEvenSeparator ? (
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
                    ) : (
                      <span
                        className="inline-block mx-2 sm:mx-3 text-merah/80 font-black text-xs select-none align-middle"
                        aria-hidden="true"
                      >
                        •
                      </span>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <Link
            to="/lineup"
            className="inline-flex items-center gap-2 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-cream-tua border-2 border-ungu-heading text-ungu-heading font-dm-sans font-bold text-xs uppercase tracking-wider shadow-[3px_4px_0_var(--color-ungu-heading)] hover:bg-cream-tengah hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all"
          >
            LIHAT SEMUA 60 LINEUP LENGKAP &rarr;
          </Link>
        </div>
      </div>

      <SectionDivider className="mt-16 md:mt-24" />
    </section>
  );
}
