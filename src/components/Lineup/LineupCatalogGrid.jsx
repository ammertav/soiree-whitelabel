import { useState } from "react";

/**
 * Data 16 Penampil pada Katalog Eksplorasi (Section 4)
 */
const CATALOG_ARTISTS = [
  // --- BARIS 1 ---
  {
    id: "soegi-bornean",
    name: "SOEGI BORNEAN",
    badge: "SEMARANG PRIDE",
    badgeType: "semarang",
    schedule: "D1 · 16:30",
    genre: "Folk Etnik Akustik",
    stage: "Panggung Kucing",
  },
  {
    id: "pyong-pyong",
    name: "PYONG PYONG",
    badge: "SEMARANG PRIDE",
    badgeType: "semarang",
    schedule: "D2 · 18:00",
    genre: "Pop Punk / Melodic",
    stage: "Ruang Riang",
  },
  {
    id: "the-jansen",
    name: "THE JANSEN",
    badge: "JATENG SOUND",
    badgeType: "jateng",
    schedule: "D1 · 20:00",
    genre: "70s Punk Rock · Bogor/Jateng",
    stage: "Panggung Teatrikal",
  },
  {
    id: "octopuz",
    name: "OCTOPUZ",
    badge: "SEMARANG PRIDE",
    badgeType: "semarang",
    schedule: "D1 · 17:00",
    genre: "Heavy Stoner Rock",
    stage: "Ruang Riang",
  },

  // --- BARIS 2 ---
  {
    id: "gagak-rimang-stoned",
    name: "GAGAK RIMANG STONED",
    badge: "SEMARANG PRIDE",
    badgeType: "semarang",
    schedule: "D2 · 15:45",
    genre: "Psychedelic Rock",
    stage: "Panggung Senja",
  },
  {
    id: "figura-renata",
    name: "FIGURA RENATA",
    badge: "SEMARANG PRIDE",
    badgeType: "semarang",
    schedule: "D1 · 16:00",
    genre: "Folk Pop Ballad",
    stage: "Panggung Senja",
  },
  {
    id: "perunggu",
    name: "PERUNGGU",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D2 · 19:45",
    genre: "Rock Pulang Kantor · Jakarta",
    stage: "Panggung Kucing",
  },
  {
    id: "lomba-sihir",
    name: "LOMBA SIHIR",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D1 · 17:45",
    genre: "Pop Eksentrik · Jakarta",
    stage: "Panggung Kucing",
  },

  // --- BARIS 3 ---
  {
    id: "nadin-amizah",
    name: "NADIN AMIZAH",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D2 · 18:30",
    genre: "Folk Teatrikal · Bandung",
    stage: "Panggung Teatrikal",
  },
  {
    id: "grrrl-gang",
    name: "GRRRL GANG",
    badge: "JATENG SOUND",
    badgeType: "jateng",
    schedule: "D1 · 21:00",
    genre: "Indie Pop / Twee · Yogyakarta",
    stage: "Ruang Riang",
  },
  {
    id: "dongker",
    name: "DONGKER",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D2 · 20:30",
    genre: "Punk Rock Fast · Bandung",
    stage: "Ruang Riang",
  },
  {
    id: "sal-priadi",
    name: "SAL PRIADI",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D1 · 20:30",
    genre: "Teatrikal Pop Romansa · Malang",
    stage: "Panggung Kucing",
  },

  // --- BARIS 4 ---
  {
    id: "kunto-aji",
    name: "KUNTO AJI",
    badge: "JATENG SOUND",
    badgeType: "jateng",
    schedule: "D2 · 17:15",
    genre: "Spiritual Healing Pop · DIY",
    stage: "Panggung Teatrikal",
  },
  {
    id: "bilal-indrajaya",
    name: "BILAL INDRAJAYA",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D1 · 18:15",
    genre: "Pop Melayu Retro · Jakarta",
    stage: "Panggung Senja",
  },
  {
    id: "tanpamatamu",
    name: "TANPAMATAMU",
    badge: "SEMARANG PRIDE",
    badgeType: "semarang",
    schedule: "D2 · 16:30",
    genre: "Dream Pop / Shoegaze",
    stage: "Panggung Senja",
  },
  {
    id: "fiersa-besari",
    name: "FIERSA BESARI",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D2 · 17:45",
    genre: "Akustik Sastra Alam · Bandung",
    stage: "Panggung Senja",
  },

  // --- BARIS 5 ---
  {
    id: "jason-ranti",
    name: "JASON RANTI",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D1 · 22:30",
    genre: "Folk Nyeleneh Berpuisi",
    stage: "Ruang Riang",
  },
  {
    id: "sisitipsi",
    name: "SISITIPSI",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D2 · 21:00",
    genre: "Bossa Swing 50s · Jakarta",
    stage: "Panggung Senja",
  },
  {
    id: "the-changcuters",
    name: "THE CHANGCUTERS",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D1 · 19:30",
    genre: "Rock & Roll Ksatria Bergitar",
    stage: "Panggung Kucing",
  },
  {
    id: "djenks",
    name: "D'JENKS",
    badge: "JATENG SOUND",
    badgeType: "jateng",
    schedule: "D1 · 15:30",
    genre: "Reggae / Roots Rockers",
    stage: "Panggung Senja",
  },

  // --- BARIS 6 ---
  {
    id: "penerbang-roket",
    name: "PENERBANG ROKET",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D2 · 22:15",
    genre: "Hard Heavy Psychedelic",
    stage: "Panggung Teatrikal",
  },
  {
    id: "rocket-rockers",
    name: "ROCKET ROCKERS",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D2 · 19:15",
    genre: "Melodic Punk Era Emas",
    stage: "Ruang Riang",
  },
  {
    id: "idgitaf",
    name: "IDGITAF",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D1 · 16:45",
    genre: "Indie Pop Manis & Cerita",
    stage: "Panggung Senja",
  },
  {
    id: "scaller",
    name: "SCALLER",
    badge: "NASIONAL",
    badgeType: "nasional",
    schedule: "D1 · 19:45",
    genre: "Post-Rock / Math Duo",
    stage: "Ruang Riang",
  },
];

/**
 * Section 4: Barisan Eksplorasi 60 Penampil (Katalog Lengkap Penampil)
 */
export default function LineupCatalogGrid() {
  const [playingId, setPlayingId] = useState(null);

  // Audio preview interaktif menggunakan Web Audio API
  const handleTogglePlay = (artistId) => {
    if (playingId === artistId) {
      setPlayingId(null);
      return;
    }

    setPlayingId(artistId);

    if (typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext)) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18);

        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } catch {
        // Fallback hening jika audio ditolak oleh browser
      }
    }

    // Reset status playing setelah 1.5 detik
    setTimeout(() => {
      setPlayingId((curr) => (curr === artistId ? null : curr));
    }, 1500);
  };

  // Helper pewarnaan badge asal kurasi
  const getBadgeStyle = (type) => {
    switch (type) {
      case "semarang":
        return "bg-kuning-tua text-ungu-heading border-ungu-heading";
      case "jateng":
        return "bg-pink-custom text-ungu-heading border-ungu-heading";
      case "nasional":
      default:
        return "bg-hijau text-cream-tua border-ungu-heading";
    }
  };

  return (
    <section className="w-full bg-cream-tua py-14 sm:py-18 md:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section 4 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-ungu-heading">
          <div className="shrink-0">
            {/* Pill Badge: KATALOG LENGKAP PENAMPIL */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-kuning-tua border-2 border-ungu-heading shadow-[2.5px_2.5px_0_var(--color-ungu-heading)] mb-3 sm:mb-4">
              {/* Icon 3 Garis Horizontal */}
              <svg
                className="w-3.5 h-3.5 text-ungu-heading"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
              <span className="font-dm-sans font-black text-[10px] sm:text-[11px] tracking-wider text-ungu-heading uppercase">
                KATALOG LENGKAP PENAMPIL
              </span>
            </div>

            {/* Headline H2 */}
            <h2 className="font-fraunces font-black uppercase text-ungu-heading tracking-tight text-3xl sm:text-4xl lg:text-[44px] leading-[0.94]">
              BARISAN EKSPLORASI 60
              <span className="block mt-1">PENAMPIL</span>
            </h2>
          </div>

          {/* Subtitle Deskripsi Kanan Aligned (16px) */}
          <div className="lg:max-w-lg shrink-0 lg:pb-1">
            <p className="font-dm-sans font-medium text-[16px] text-gray-custom leading-relaxed">
              Temukan jagoan lokal kebanggaan Semarang, talenta eksploratif Jawa
              Tengah, dan penampil favoritmu di panggung festival.
            </p>
          </div>
        </div>

        {/* Grid 16 Kartu (4 Kolom x 4 Baris) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 sm:mt-10">
          {CATALOG_ARTISTS.map((artist) => {
            const isPlaying = playingId === artist.id;
            return (
              <article
                key={artist.id}
                className="bg-cream-muda rounded-[18px] sm:rounded-[20px] border-2 border-ungu-heading p-4 sm:p-5 flex flex-col justify-between shadow-[3.5px_4px_0_var(--color-ungu-heading)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4.5px_5.5px_0_var(--color-ungu-heading)] min-h-[160px] sm:min-h-[175px]"
              >
                {/* Baris Atas: Badge Kategori & Jadwal */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full border-[1.5px] font-dm-sans font-bold text-[9px] sm:text-[10px] tracking-wider uppercase ${getBadgeStyle(
                        artist.badgeType
                      )}`}
                    >
                      {artist.badge}
                    </span>
                    <span className="font-dm-sans font-bold text-[11px] sm:text-xs text-ungu-heading tracking-tight">
                      {artist.schedule}
                    </span>
                  </div>

                  {/* Nama Artis (Sans-serif Black Uppercase sesuai desain) */}
                  <h3 className="font-dm-sans font-black uppercase text-base sm:text-lg lg:text-[19px] text-ungu-heading tracking-tight mt-3 leading-tight truncate">
                    {artist.name}
                  </h3>

                  {/* Subtitle Genre / Asal */}
                  <p className="font-dm-sans font-medium text-xs text-gray-custom mt-1 leading-snug truncate">
                    {artist.genre}
                  </p>
                </div>

                {/* Baris Bawah: Panggung & Ikon Speaker */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-ungu-heading/15">
                  <span className="font-dm-sans font-bold text-xs text-ungu-heading tracking-tight">
                    {artist.stage}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleTogglePlay(artist.id)}
                    className={`p-1 transition-transform cursor-pointer ${
                      isPlaying
                        ? "text-merah scale-125"
                        : "text-ungu-heading/75 hover:text-ungu-heading hover:scale-110"
                    }`}
                    title={`Dengarkan audio penampil ${artist.name}`}
                    aria-label={`Dengarkan audio penampil ${artist.name}`}
                  >
                    {/* Speaker Icon sesuai visual desain */}
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Info Pill: Menampilkan 24 dari 60 Kurasi Penampil */}
        <div className="flex justify-center mt-10 sm:mt-12 md:mt-14">
          <div className="inline-flex items-center gap-2.5 px-5 sm:px-8 py-2.5 rounded-full bg-cream-muda border-2 border-ungu-heading shadow-[3px_3.5px_0_var(--color-ungu-heading)] text-center">
            {/* Checkmark Circle Icon */}
            <svg
              className="w-4 h-4 text-ungu-heading shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="8.5 12 11 14.5 15.5 9.5" />
            </svg>
            <span className="font-dm-sans font-black text-[11px] sm:text-xs md:text-[13px] tracking-wider text-ungu-heading uppercase">
              MENAMPILKAN 24 DARI 60 KURASI PENAMPIL · PUTARAN 2 DIUMUMKAN 1 MARET 2027
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
