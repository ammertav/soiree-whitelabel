import { useState } from "react";
import { FaRegClock, FaRegCirclePlay, FaCircleCheck } from "react-icons/fa6";

import imgTheAdams from "../../assets/images/lineup-headliners/node-87.png";
import imgBarasuara from "../../assets/images/lineup-headliners/node-114.png";
import imgTheSigit from "../../assets/images/lineup-headliners/node-141.png";
import imgWsatcc from "../../assets/images/lineup-headliners/node-169.png";
import imgFeast from "../../assets/images/lineup-headliners/node-196.png";
import imgHindia from "../../assets/images/lineup-headliners/node-223.png";
import imgEfekRumahKaca from "../../assets/images/lineup-headliners/node-250.png";
import imgRealityClub from "../../assets/images/lineup-headliners/node-277.png";
import imgPeeWeeGaskins from "../../assets/images/lineup-headliners/node-304.png";
import imgDanilla from "../../assets/images/lineup-headliners/node-331.png";
import imgGoodnightElectric from "../../assets/images/lineup-headliners/node-359.png";
import imgMorfem from "../../assets/images/lineup-headliners/node-386.png";

export const HEADLINER_ARTISTS = [
  {
    id: "the-adams",
    name: "THE ADAMS",
    day: "DAY 01",
    stage: "Cat Proscenium",
    stageBadge: "DAY 01 · PROSCENIUM",
    isDay1: true,
    originBadge: "NASIONAL",
    genre: "Power Pop / Indie Rock · Jakarta",
    origin: "Jakarta",
    description:
      'Harmoni vokal empat suara legendaris siap menggemakan lagu-lagu anthemic "Konservatif",...',
    time: "21:30 WIB",
    image: imgTheAdams,
  },
  {
    id: "barasuara",
    name: "BARASUARA",
    day: "DAY 02",
    stage: "Cat Proscenium",
    stageBadge: "DAY 02 · PROSCENIUM",
    isDay1: false,
    originBadge: "NASIONAL",
    genre: "Alternative Rock · Jakarta",
    origin: "Jakarta",
    description:
      "Ledakan energi ritmik, distorsi menyayat, dan koor massal tak terbendung menyongsong...",
    time: "22:45 WIB",
    image: imgBarasuara,
  },
  {
    id: "the-sigit",
    name: "THE S.I.G.I.T.",
    day: "DAY 01",
    stage: "Panggung Teatrikal",
    stageBadge: "DAY 01 · TEATRIKAL",
    isDay1: true,
    originBadge: "NASIONAL",
    genre: "Garage Hard Rock · Bandung",
    origin: "Bandung",
    description:
      "Riff gitar beringas dan solo psikedelik murni dari punggawa rock legendaris tanah air yang selalu...",
    time: "20:15 WIB",
    image: imgTheSigit,
  },
  {
    id: "wsatcc",
    name: "WSATCC",
    day: "DAY 02",
    stage: "Panggung Teatrikal",
    stageBadge: "DAY 02 · TEATRIKAL",
    isDay1: false,
    originBadge: "NASIONAL",
    genre: "Retro Pop / Jazz 70s · Jakarta",
    origin: "Jakarta",
    description:
      "Lagu dansa santun dan irama ciamik nostalgia membawamu terhanyut dalam pesona karnaval...",
    time: "19:30 WIB",
    image: imgWsatcc,
  },
  {
    id: "feast",
    name: ".FEAST",
    day: "DAY 01",
    stage: "Cat Proscenium",
    stageBadge: "DAY 01 · PROSCENIUM",
    isDay1: true,
    originBadge: "NASIONAL",
    genre: "Post-Hardcore Rock · Jakarta",
    origin: "Jakarta",
    description:
      "Nyanyian lantang dan kemarahan teatrikal lagu-lagu pergerakan yang menyatukan ribuan kawan...",
    time: "18:45 WIB",
    image: imgFeast,
  },
  {
    id: "hindia",
    name: "HINDIA",
    day: "DAY 02",
    stage: "Cat Proscenium",
    stageBadge: "DAY 02 · PROSCENIUM",
    isDay1: false,
    originBadge: "NASIONAL",
    genre: "Alternative Pop · Jakarta",
    origin: "Jakarta",
    description:
      "Kisah katarsis tentang keputusasaan, cinta, dan bertahan hidup yang dirayakan bersama di depan...",
    time: "21:00 WIB",
    image: imgHindia,
  },
  {
    id: "efek-rumah-kaca",
    name: "EFEK RUMAH KACA",
    day: "DAY 02",
    stage: "Panggung Teatrikal",
    stageBadge: "DAY 02 · TEATRIKAL",
    isDay1: false,
    originBadge: "NASIONAL",
    genre: "Indie Pop / Post-Rock · Jakarta",
    origin: "Jakarta",
    description:
      "Ritual kontemplatif sarat pesan sosial, membawakan himne puitis penggetar sanubari...",
    time: "21:15 WIB",
    image: imgEfekRumahKaca,
  },
  {
    id: "reality-club",
    name: "REALITY CLUB",
    day: "DAY 01",
    stage: "Panggung Teatrikal",
    stageBadge: "DAY 01 · TEATRIKAL",
    isDay1: true,
    originBadge: "NASIONAL",
    genre: "Indie Pop Rock · Jakarta",
    origin: "Jakarta",
    description:
      "Sentuhan sinematik orkestratif memikat yang mengajak penonton berdansa menyambut senja...",
    time: "17:30 WIB",
    image: imgRealityClub,
  },
  {
    id: "pee-wee-gaskins",
    name: "PEE WEE GASKINS",
    day: "DAY 02",
    stage: "Panggung Senja",
    stageBadge: "DAY 02 · SENJA",
    isDay1: false,
    originBadge: "NASIONAL",
    genre: "Pop Punk / Synth · Jakarta",
    origin: "Jakarta",
    description:
      "Nostalgia masa remaja tak terbendung bersama lantunan synthpunk dan lagu-lagu persahabatan",
    time: "16:45 WIB",
    image: imgPeeWeeGaskins,
  },
  {
    id: "danilla",
    name: "DANILLA",
    day: "DAY 01",
    stage: "Panggung Senja",
    stageBadge: "DAY 01 · SENJA",
    isDay1: true,
    originBadge: "NASIONAL",
    genre: "Bossa Nova / Jazz Pop · Jakarta",
    origin: "Jakarta",
    description:
      "Vokal berat nan membius melantunkan balada sendu, berpadu magis dengan angin senja PRPP.",
    time: "17:15 WIB",
    image: imgDanilla,
  },
  {
    id: "goodnight-electric",
    name: "GOODNIGHT ELECTRIC",
    day: "DAY 02",
    stage: "Panggung Ruang Riang",
    stageBadge: "DAY 02 · RUANG RIANG",
    isDay1: false,
    originBadge: "NASIONAL",
    genre: "Synthpop / Electro · Jakarta",
    origin: "Jakarta",
    description:
      "Lantai dansa tak berujung dengan dentuman bass synth 80s dan pesta karnaval malam tak...",
    time: "22:00 WIB",
    image: imgGoodnightElectric,
  },
  {
    id: "morfem",
    name: "MORFEM",
    day: "DAY 01",
    stage: "Panggung Teatrikal",
    stageBadge: "DAY 01 · TEATRIKAL",
    isDay1: true,
    originBadge: "NASIONAL",
    genre: "Fuzz Rock / Power Punk · Jakarta",
    origin: "Jakarta",
    description:
      "Gemuruh fuzz guitar berdengung membakar semangat penonton Semarang dalam hentakan...",
    time: "19:15 WIB",
    image: imgMorfem,
  },
];

/**
 * Section 2: Headliner & Kurasi Utama Festival
 */
export default function LineupHeadliners({
  selectedDay = "SEMUA",
  selectedStage = "all",
  selectedOrigin = "all",
  searchQuery = "",
  onResetFilters,
}) {
  const [playingId, setPlayingId] = useState(null);

  // Filter logika dinamis
  const filteredArtists = HEADLINER_ARTISTS.filter((artist) => {
    // 1. Filter Hari
    if (selectedDay !== "SEMUA" && artist.day !== selectedDay) {
      return false;
    }
    // 2. Filter Panggung
    if (
      selectedStage !== "all" &&
      !artist.stage.toLowerCase().includes(selectedStage.toLowerCase())
    ) {
      return false;
    }
    // 3. Filter Asal
    if (
      selectedOrigin !== "all" &&
      !artist.origin.toLowerCase().includes(selectedOrigin.toLowerCase())
    ) {
      return false;
    }
    // 4. Filter Kata Kunci Pencarian
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = artist.name.toLowerCase().includes(q);
      const matchGenre = artist.genre.toLowerCase().includes(q);
      const matchOrigin = artist.origin.toLowerCase().includes(q);
      const matchDesc = artist.description.toLowerCase().includes(q);
      if (!matchName && !matchGenre && !matchOrigin && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  const handlePreview = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <section className="w-full bg-putih-butek py-10 sm:py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section 2 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-ungu-heading/30">
          <div>
            {/* Pill Badge: PANGGUNG UTAMA FESTIVAL */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-pink-custom border-2 border-ungu-heading shadow-xs mb-3 sm:mb-4">
              {/* Concentric Target Icon */}
              <svg
                className="w-3.5 h-3.5 text-ungu-heading shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
              <span className="font-dm-sans font-black text-[10px] sm:text-xs tracking-widest text-ungu-heading uppercase">
                PANGGUNG UTAMA FESTIVAL
              </span>
            </div>

            {/* Headline H2 */}
            <h2 className="font-fraunces font-black uppercase text-ungu-heading tracking-tight text-3xl sm:text-4xl lg:text-[44px] leading-[0.98]">
              HEADLINER & KURASI
              <span className="block mt-1">UTAMA</span>
            </h2>
          </div>

          {/* Subtitle Deskripsi Kanan */}
          <p className="font-dm-sans text-[14px] sm:text-[16px] text-gray-custom max-w-md lg:text-left leading-relaxed">
            Deretan penampil utama panggung kolosal{" "}
            <em className="italic text-ungu-heading font-semibold">
              Cat Proscenium
            </em>{" "}
            dan megahnya{" "}
            <em className="italic text-ungu-heading font-semibold">
              Panggung Teatrikal
            </em>{" "}
            di bawah gemintang malam Semarang.
          </p>
        </div>

        {/* Grid 6 Kartu Artis */}
        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 pt-8 sm:pt-10">
            {filteredArtists.map((artist) => {
              const isPlaying = playingId === artist.id;
              return (
                <article
                  key={artist.id}
                  className="bg-cream-tua rounded-[24px] sm:rounded-[28px] border-[2.5px] border-ungu-heading p-3.5 sm:p-4 pb-4 sm:pb-5 shadow-[4px_4px_0_var(--color-ungu-heading)] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0_var(--color-ungu-heading)]"
                >
                  <div>
                    {/* Wadah Gambar / Foto Artis */}
                    <div className="relative w-full aspect-16/10 rounded-2xl border-2 border-ungu-heading overflow-hidden bg-black/10">
                      <img
                        src={artist.image}
                        alt={`Penampilan ${artist.name}`}
                        className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />

                      {/* Badge Kiri Atas: Hari & Panggung */}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span
                          className={`inline-block px-3 py-1 rounded-full border border-ungu-heading text-[10px] sm:text-[11px] font-black tracking-wider uppercase shadow-xs ${
                            artist.isDay1
                              ? "bg-hijau text-cream-tua"
                              : "bg-pink-custom text-ungu-heading"
                          }`}
                        >
                          {artist.stageBadge}
                        </span>
                      </div>

                      {/* Badge Kanan Bawah: NASIONAL */}
                      <div className="absolute bottom-2.5 right-2.5 z-10">
                        <span className="inline-block bg-kuning-tua text-ungu-heading border-2 border-ungu-heading text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-md shadow-xs">
                          {artist.originBadge}
                        </span>
                      </div>
                    </div>

                    {/* Informasi Artis */}
                    <div className="pt-3.5 sm:pt-4">
                      {/* Baris Nama Artis & Verified Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-fraunces font-black uppercase text-xl sm:text-2xl text-ungu-heading tracking-tight truncate">
                          {artist.name}
                        </h3>
                        <div
                          className="text-ungu-heading/90 shrink-0"
                          title="Penampil Terverifikasi"
                        >
                          <FaCircleCheck className="w-4 h-4 text-ungu-heading" />
                        </div>
                      </div>

                      {/* Genre & Kota Asal */}
                      <p className="font-dm-sans font-bold text-[14px] text-gray-custom mt-1 tracking-tight">
                        {artist.genre}
                      </p>

                      {/* Deskripsi Singkat 2 Baris */}
                      <p className="font-dm-sans text-[14px] text-gray-custom/90 leading-relaxed line-clamp-2 mt-2.5">
                        {artist.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Kartu: Jam Tampil & Tombol Preview */}
                  <div className="flex items-center justify-between pt-3.5 mt-4 border-t border-ungu-heading/15">
                    <div className="flex items-center gap-1.5 font-dm-sans font-black text-xs text-ungu-heading">
                      <FaRegClock className="text-xs text-ungu-heading/80" />
                      <span>{artist.time}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePreview(artist.id)}
                      className={`inline-flex items-center gap-1.5 font-dm-sans font-black text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                        isPlaying
                          ? "text-merah animate-pulse"
                          : "text-hijau hover:text-hijau-tua hover:underline"
                      }`}
                      aria-label={`Dengarkan cuplikan audio ${artist.name}`}
                    >
                      <FaRegCirclePlay
                        className={`text-sm ${isPlaying ? "rotate-90 text-merah" : ""}`}
                      />
                      <span>{isPlaying ? "PLAYING..." : "PREVIEW"}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Tampilan jika filter tidak menemukan hasil */
          <div className="mt-12 text-center py-12 px-4 bg-cream-tua rounded-3xl border-2 border-dashed border-ungu-heading/40 max-w-lg mx-auto">
            <p className="font-fraunces text-xl font-bold text-ungu-heading">
              Tidak ada penampil yang sesuai
            </p>
            <p className="font-dm-sans text-xs sm:text-sm text-gray-custom mt-2">
              Coba sesuaikan kata kunci pencarian atau filter hari & panggung.
            </p>
            {onResetFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="mt-4 px-5 py-2 rounded-full bg-kuning-tua border-2 border-ungu-heading font-dm-sans font-black text-xs uppercase text-ungu-heading hover:bg-kuning-muda transition-colors shadow-xs"
              >
                Reset Semua Filter
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
