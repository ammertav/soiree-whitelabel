import SectionDivider from "../SectionDivider";


const STAGES_DATA = [
  {
    id: "panggung-kucing",
    title: "Panggung Kucing (Cat Proscenium)",
    description:
      "Panggung utama berkepala kucing kolosal tempat headliner akbar bergema.",
    dotColor: "bg-kuning-tua",
  },
  {
    id: "panggung-teatrikal",
    title: "Panggung Teatrikal",
    description:
      "Latar tirai beludru megah untuk pertunjukan orkestratif & aksi panggung konseptual.",
    dotColor: "bg-hijau",
  },
  {
    id: "panggung-senja",
    title: "Panggung Senja",
    description:
      "Menghadap cakrawala ufuk barat untuk petikan folk, jazz santun, dan sing-along intim.",
    dotColor: "bg-pink-custom",
  },
  {
    id: "ruang-riang",
    title: "Ruang Riang Alternatif",
    description:
      "Arena eksploratif untuk distorsi punk liar, gelombang synthwave, dan pesta disko larut malam.",
    dotColor: "bg-kuning-tua",
  },
];

/**
 * Section 5: Tata Letak Festival - Empat Panggung Simultan
 */
export default function LineupStages() {
  return (
    <section className="w-full bg-putih-butek transition-colors">
      {/* Top Vintage Double-Ribbon Section Divider */}
      <SectionDivider bgClass="bg-putih-butek" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        {/* Main Big Teal Box */}
        <div className="bg-hijau-butek rounded-[24px] sm:rounded-[30px] border-2 border-ungu-heading shadow-[5px_6px_0_var(--color-ungu-heading)] p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Sisi Kiri: Header & Deskripsi (5 Kolom) */}
            <div className="lg:col-span-5 flex flex-col items-start">
              {/* Pill Badge: TATA LETAK FESTIVAL */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-kuning-tua border-2 border-ungu-heading shadow-[2.5px_2.5px_0_var(--color-ungu-heading)] mb-4">
                {/* Stage Arch Icon */}
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
                  <path d="M4 19V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" />
                  <path d="M9 19v-6a3 3 0 0 1 6 0v6" />
                  <line x1="7" y1="4" x2="7" y2="7" />
                  <line x1="12" y1="3" x2="12" y2="7" />
                  <line x1="17" y1="4" x2="17" y2="7" />
                </svg>
                <span className="font-dm-sans font-black text-[10px] sm:text-[11px] tracking-wider text-ungu-heading uppercase">
                  TATA LETAK FESTIVAL
                </span>
              </div>

              {/* Headline H2 */}
              <h2 className="font-fraunces font-black uppercase text-cream-tua tracking-tight text-3xl sm:text-4xl lg:text-[44px] leading-[0.94]">
                EMPAT
                <span className="block mt-1">PANGGUNG</span>
                <span className="block mt-1">SIMULTAN</span>
              </h2>

              {/* Deskripsi */}
              <p className="font-dm-sans font-medium text-base sm:text-sm text-cream-tua/90 max-w-sm leading-relaxed mt-4 sm:mt-6">
                Jelajahi lanskap magis PRPP Semarang tanpa khawatir bentrok
                jadwal krusial. Setiap arena dirancang dengan tata akustik
                panggung terbuka mutakhir.
              </p>
            </div>

            {/* Sisi Kanan: Grid 4 Kartu Panggung (7 Kolom) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {STAGES_DATA.map((stage) => (
                <article
                  key={stage.id}
                  className="bg-cream-muda rounded-[18px] sm:rounded-[20px] border-2 border-ungu-heading p-4 sm:p-5 md:p-6 shadow-[3.5px_4px_0_var(--color-ungu-heading)] flex flex-col justify-start transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4.5px_5.5px_0_var(--color-ungu-heading)] min-h-[140px]"
                >
                  {/* Judul Panggung & Bullet Indicator */}
                  <div className="flex items-start gap-2">
                    <span
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] border-ungu-heading shrink-0 mt-1 sm:mt-1.5 ${stage.dotColor}`}
                      aria-hidden="true"
                    />
                    <h3 className="font-dm-sans font-black text-base sm:text-xl text-ungu-heading tracking-tight leading-snug">
                      {stage.title}
                    </h3>
                  </div>

                  {/* Deskripsi Panggung */}
                  <p className="font-dm-sans font-medium text-sm text-gray-custom mt-2 leading-relaxed">
                    {stage.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Vintage Double-Ribbon Section Divider */}
      <SectionDivider bgClass="bg-putih-butek" />
    </section>
  );
}
