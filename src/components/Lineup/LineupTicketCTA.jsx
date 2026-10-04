import SectionDivider from "../SectionDivider";

/**
 * Section CTA Pembelian Tiket Festival
 */
export default function LineupTicketCTA() {
  return (
    <section className="w-full bg-kuning-tua transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24 flex flex-col items-center text-center">
        {/* Pill Badge: PRESALE KUOTA TERBATAS */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cream-muda border-2 border-ungu-heading shadow-[2.5px_2.5px_0_var(--color-ungu-heading)] mb-4 sm:mb-5">
          {/* Ticket Stub Icon */}
          <svg
            className="w-3.5 h-3.5 text-ungu-heading shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            <path d="M13 5v2" />
            <path d="M13 17v2" />
            <path d="M13 11v2" />
          </svg>
          <span className="font-dm-sans font-black text-[10px] sm:text-[11px] tracking-wider text-ungu-heading uppercase">
            PRESALE KUOTA TERBATAS
          </span>
        </div>

        {/* Headline H2 */}
        <h2 className="font-fraunces font-black uppercase text-ungu-heading text-3xl sm:text-4xl lg:text-[44px] leading-[1.04] tracking-tight max-w-3xl mx-auto">
          SIAP BERNYANYI DAN
          <span className="block mt-1">BERDANSA BERSAMA 60</span>
          <span className="block mt-1">MUSISI?</span>
        </h2>

        {/* Subtitle Deskripsi */}
        <p className="font-dm-sans font-medium text-xs sm:text-sm md:text-[15px] text-ungu-heading/90 max-w-xl mx-auto mt-4 leading-relaxed">
          Tiket presale kuota terbatas. Amankan tempatmu sekarang sebelum
          kehabisan dan saksikan sejarah musik di Semarang.
        </p>

        {/* Tombol CTA Pesan Tiket */}
        <a
          href="#tiket"
          className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-hijau border-2 border-ungu-heading text-cream-tua shadow-[4px_4.5px_0_var(--color-ungu-heading)] hover:-translate-y-0.5 hover:shadow-[5px_6px_0_var(--color-ungu-heading)] active:translate-y-0 active:shadow-[2px_2px_0_var(--color-ungu-heading)] transition-all mt-8 sm:mt-10 cursor-pointer"
        >
          {/* Ticket With Star Icon */}
          <svg
            className="w-4 h-4 text-cream-tua shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            <polygon
              points="12 8.5 13.09 10.71 15.53 11.06 13.77 12.78 14.18 15.21 12 14.06 9.82 15.21 10.23 12.78 8.47 11.06 10.91 10.71 12 8.5"
              fill="currentColor"
              stroke="none"
            />
          </svg>
          <span className="font-dm-sans font-black text-xs sm:text-sm tracking-wider uppercase text-cream-tua">
            PESAN TIKET SEKARANG
          </span>
        </a>

        {/* 3 Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7 md:gap-8 mt-8 sm:mt-10 text-ungu-heading font-dm-sans font-bold text-xs sm:text-[13px]">
          {/* 1. Transaksi Aman & Terverifikasi */}
          <div className="flex items-center gap-2">
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>Transaksi Aman &amp; Terverifikasi</span>
          </div>

          {/* 2. E-Tiket Instan via Email */}
          <div className="flex items-center gap-2">
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
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>E-Tiket Instan via Email</span>
          </div>

          {/* 3. Harga Sudah Termasuk Pajak & Admin */}
          <div className="flex items-center gap-2">
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
              <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
              <path d="M14 8H8" />
              <path d="M16 12H8" />
              <path d="M13 16H8" />
            </svg>
            <span>Harga Sudah Termasuk Pajak &amp; Admin</span>
          </div>
        </div>
      </div>

      {/* Bottom Vintage Double-Ribbon Section Divider */}
      <SectionDivider bgClass="bg-kuning-tua" />
    </section>
  );
}
