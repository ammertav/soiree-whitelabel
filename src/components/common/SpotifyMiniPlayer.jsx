import { useState } from "react";
import { FaSpotify, FaInstagram } from "react-icons/fa6";
import { LuMinus } from "react-icons/lu";
import { INSTAGRAM } from "../../data/socialLinks";
import { whatsappUrl } from "../../utils";

// Link Spotify dari .env, contoh: https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=...
const SPOTIFY_URL = (import.meta.env.VITE_SPOTIFY_PLAYLIST_URL || "").trim();

// Ubah link biasa menjadi URL embed resmi Spotify; null jika link tidak dikenali
const toEmbedUrl = (url) => {
  const match = url.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]+)/);
  return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator` : null;
};

const EMBED_URL = toEmbedUrl(SPOTIFY_URL);

// Tombol chat WhatsApp (Footer) ada di pojok kanan bawah; mini player ditumpuk di atasnya
const POSITION_CLASS = whatsappUrl()
  ? "bottom-[5.5rem] right-6 sm:bottom-[6rem]"
  : "bottom-4 right-4 sm:bottom-6 sm:right-6";

/**
 * Mini player Spotify melayang di pojok kanan bawah, dipasang sekali di App (di luar Routes)
 * agar musik tetap berputar saat pindah halaman. Iframe baru dimuat setelah dibuka pertama kali,
 * dan saat diciutkan hanya disembunyikan (tidak dilepas) supaya pemutaran tidak berhenti.
 * Selama link playlist belum diisi, panel menampilkan pesan "segera hadir".
 */
export default function SpotifyMiniPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const open = () => {
    setIsOpen(true);
    setHasOpened(true);
  };

  return (
    <div className={`fixed ${POSITION_CLASS} z-40 flex flex-col items-end gap-3`}>
      {/* Panel pemutar */}
      {hasOpened && (
        <div
          className={`w-[calc(100vw-2rem)] max-w-[340px] bg-cream-terang border-2 border-ungu-heading rounded-2xl shadow-[4px_5px_0_var(--color-ungu-heading)] overflow-hidden transition-all duration-200 origin-bottom-right ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="flex items-center justify-between gap-2 px-3.5 py-2 bg-hijau-butek border-b-2 border-ungu-heading">
            <span className="inline-flex items-center gap-2 font-dm-sans font-black text-[11px] tracking-wider uppercase text-cream-tua">
              <FaSpotify className="w-4 h-4 text-kuning-tua" aria-hidden="true" />
              Soirée Dansante Playlist
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-cream-terang border-2 border-ungu-heading flex items-center justify-center text-ungu-heading hover:bg-kuning-tua transition-colors cursor-pointer"
              aria-label="Ciutkan pemutar Spotify"
              tabIndex={isOpen ? 0 : -1}
            >
              <LuMinus className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            </button>
          </div>
          {EMBED_URL ? (
            <iframe
              title="Playlist Spotify Soirée Dansante"
              src={EMBED_URL}
              width="100%"
              height="152"
              className="block border-0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              tabIndex={isOpen ? 0 : -1}
            />
          ) : (
            <div className="h-[152px] flex flex-col items-center justify-center gap-2 px-5 text-center">
              <FaSpotify className="w-8 h-8 text-hijau" aria-hidden="true" />
              <p className="font-fraunces font-black text-lg text-ungu-heading leading-tight">
                Playlist Segera Hadir
              </p>
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isOpen ? 0 : -1}
                className="inline-flex items-center gap-1 font-dm-sans font-bold text-xs text-ungu-heading/80 hover:text-hijau transition-colors"
              >
                <FaInstagram className="w-3.5 h-3.5 text-pink-custom" aria-hidden="true" />
                Ikuti {INSTAGRAM.handle} untuk kabar terbaru
              </a>
            </div>
          )}
        </div>
      )}

      {/* Tombol buka pemutar */}
      {!isOpen && (
        <button
          type="button"
          onClick={open}
          className="inline-flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-kuning-tua hover:bg-kuning-muda border-2 border-ungu-heading shadow-[3px_3px_0_var(--color-ungu-heading)] active:translate-y-0.5 text-ungu-heading font-dm-sans font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
          aria-label="Buka pemutar playlist Spotify"
          aria-expanded={isOpen}
        >
          <FaSpotify className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline">Playlist</span>
        </button>
      )}
    </div>
  );
}
