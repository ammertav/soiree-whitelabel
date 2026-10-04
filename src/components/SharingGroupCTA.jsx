import { FaWhatsapp } from "react-icons/fa";
import { MdGroups, MdArrowForward } from "react-icons/md";

// Satu grup WhatsApp untuk semua event, link invite diambil dari env
export const SHARING_GROUP_URL = (import.meta.env.VITE_SHARING_GROUP_URL || "").trim();

const DISCLAIMER = "Arrangements between members are outside Keenan Society's responsibility.";

// variant "compact": kartu kecil di blok reservasi table (EventDetail)
// variant "banner": pita ticker selebar layar di Home
export default function SharingGroupCTA({ variant = "compact" }) {
  if (!SHARING_GROUP_URL) return null;

  if (variant === "banner") {
    const item = (
      <span className="flex items-center gap-6 pr-6">
        <span>Going solo? Find your crew</span>
        <span className="text-[#FF0000]">✦</span>
        <span className="text-white/50">Link up or share a table</span>
        <span className="text-[#FF0000]">✦</span>
        <span>Join the WhatsApp group</span>
        <span className="text-[#FF0000]">✦</span>
      </span>
    );

    // Pita teks berjalan + tombol diam di kanan sebagai penanda bisa diklik.
    // Isi ticker digandakan agar loop translateX(-50%) mulus.
    return (
      <a
        href={SHARING_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Going solo? Find your crew, link up or share a table. Join the Keenan Society WhatsApp group."
        className="group flex items-stretch bg-black border-y border-[#C41A20]/30"
      >
        <div aria-hidden="true" className="relative flex-1 min-w-0 overflow-hidden py-3">
          <div className="flex w-max animate-[sharingTicker_30s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none font-headline font-bold text-sm uppercase tracking-widest text-white whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => <span key={i}>{item}</span>)}
          </div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </div>
        <span
          aria-hidden="true"
          className="shrink-0 flex items-center gap-2 px-4 md:px-6 bg-[#FF0000] group-hover:bg-[#C41A20] font-label text-xs font-bold uppercase tracking-widest text-white transition-colors"
        >
          <FaWhatsapp className="text-base" />
          Join
          <MdArrowForward className="text-base group-hover:translate-x-1 transition-transform" />
        </span>
        <style>{`
          @keyframes sharingTicker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </a>
    );
  }

  return (
    <div className="space-y-2">
      <a
        href={SHARING_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 p-4 border border-[#25D366]/30 bg-[#25D366]/5 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-colors"
      >
        <div className="w-10 h-10 shrink-0 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
          <MdGroups className="text-2xl" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-headline font-bold text-white text-sm uppercase tracking-wide">
            No crew yet?
          </p>
          <p className="font-body text-white/60 text-xs leading-relaxed">
            Join our WhatsApp group to find people to go with or share a table.
          </p>
        </div>
        <MdArrowForward className="text-xl text-[#25D366] shrink-0 group-hover:translate-x-1 transition-transform" />
      </a>
      <p className="font-label text-[10px] tracking-widest uppercase text-white/30 text-center">
        {DISCLAIMER}
      </p>
    </div>
  );
}
