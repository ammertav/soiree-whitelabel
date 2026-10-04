import { FaMasksTheater } from "react-icons/fa6";
import SectionDivider from "../SectionDivider";
import iconEye from "../../assets/icons/lineup/icon-15.svg";
import iconFestival from "../../assets/icons/lineup/icon-18.svg";
import iconStar from "../../assets/icons/lineup/icon-24.svg";

export default function LineupHero() {
  return (
    <section className="relative w-full bg-cream-tua pt-12 sm:pt-16 md:pt-20 pb-0 overflow-hidden">
      {/* 1. Watermark Dekoratif Kiri Atas: Bintang Berkilau 4 Sudut */}
      <div
        className="absolute top-6 sm:top-8 md:top-10 left-4 sm:left-8 md:left-12 pointer-events-none text-ungu-heading/20"
        aria-hidden="true"
      >
        <svg
          className="w-12 h-12 sm:w-16 sm:h-16"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bintang Utama */}
          <path
            d="M24 2 Q24 20 6 20 Q24 20 24 38 Q24 20 42 20 Q24 20 24 2 Z"
            fill="currentColor"
          />
          {/* Bintang Kedua (Lebih Kecil di Kanan Bawah) */}
          <path
            d="M48 24 Q48 34 38 34 Q48 34 48 44 Q48 34 58 34 Q48 34 48 24 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 2. Watermark Dekoratif Kanan Bawah: Topeng Teater */}
      <div
        className="absolute bottom-5 sm:bottom-7 md:bottom-9 right-4 sm:right-8 md:right-12 pointer-events-none text-ungu-heading/20 z-10"
        aria-hidden="true"
      >
        <FaMasksTheater className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* 3. Baris Badge di Tengah Atas (Mata, Pill Slogan Panggung, Bintang) */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-7">
          {/* Badge 1: Lingkaran Pink Mata */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] rounded-full bg-pink-custom border-[2.5px] border-ungu-heading flex items-center justify-center shadow-[3.5px_4px_0_var(--color-ungu-heading)] shrink-0 transition-transform hover:-translate-y-0.5">
            <img
              src={iconEye}
              alt="Eye Icon"
              className="w-5 h-4 sm:w-6 sm:h-4.5 object-contain"
            />
          </div>

          {/* Badge 2: Pill Kuning "PANGGUNG SETIAP SUARA · 2027" */}
          <div className="inline-flex items-center gap-2.5 px-5 sm:px-7 md:px-8 py-2 sm:py-2.5 rounded-full bg-kuning-tua border-[2.5px] border-ungu-heading shadow-[4px_5px_0_var(--color-ungu-heading)] transition-transform hover:-translate-y-0.5">
            <img
              src={iconFestival}
              alt="Festival Badge Icon"
              className="w-3.5 h-4.5 sm:w-4 sm:h-5 object-contain shrink-0"
            />
            <span className="font-dm-sans font-black text-xs sm:text-[13px] md:text-[14px] tracking-[0.16em] sm:tracking-[0.18em] text-ungu-heading uppercase whitespace-nowrap">
              PANGGUNG SETIAP SUARA · 2027
            </span>
          </div>

          {/* Badge 3: Lingkaran Kuning Bintang */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] rounded-full bg-[#FEB343] border-[2.5px] border-ungu-heading flex items-center justify-center shadow-[3.5px_4px_0_var(--color-ungu-heading)] shrink-0 transition-transform hover:-translate-y-0.5">
            <img
              src={iconStar}
              alt="Star Icon"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            />
          </div>
        </div>

        {/* 4. Judul Utama: LINE UP & JADWAL PENAMPIL */}
        <h1 className="font-fraunces font-black uppercase text-ungu-heading tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.98] sm:leading-[0.95]">
          LINE UP & JADWAL
          <span className="block mt-1 sm:mt-2.5">PENAMPIL</span>
        </h1>

        {/* 5. Subtitle */}
        <p className="mt-4 sm:mt-5 md:mt-6 font-dm-sans text-sm sm:text-base md:text-lg text-gray-custom max-w-2xl mx-auto px-4 leading-relaxed font-medium">
          Dua hari perayaan akbar mempertemukan{" "}
          <span className="underline underline-offset-4 decoration-gray-custom/80 font-semibold text-ungu-heading">
            60 musisi
          </span>{" "}
          lintas genre dan generasi di pesisir Semarang Barat.
        </p>

        {/* 6. Kartu 4 Statistik / Info Festival */}
        <div className="mt-9 sm:mt-12 md:mt-14 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
            {/* Card 1: 60 BAND & PENAMPIL */}
            <div className="bg-[#FAF5EA] rounded-2xl border-2 border-ungu-heading py-5 sm:py-6 md:py-7 px-3 sm:px-4 text-center flex flex-col items-center justify-center transition-transform hover:-translate-y-0.5 shadow-[0_2px_0_var(--color-ungu-heading)]">
              <span className="font-fraunces font-black text-4xl sm:text-5xl lg:text-[54px] text-hijau leading-none tracking-tight">
                60
              </span>
              <span className="mt-2.5 sm:mt-3 font-dm-sans font-black text-[11px] sm:text-xs tracking-[0.14em] text-ungu-heading uppercase">
                BAND & PENAMPIL
              </span>
            </div>

            {/* Card 2: 02 HARI FESTIVAL */}
            <div className="bg-[#FAF5EA] rounded-2xl border-2 border-ungu-heading py-5 sm:py-6 md:py-7 px-3 sm:px-4 text-center flex flex-col items-center justify-center transition-transform hover:-translate-y-0.5 shadow-[0_2px_0_var(--color-ungu-heading)]">
              <span className="font-fraunces font-black text-4xl sm:text-5xl lg:text-[54px] text-merah leading-none tracking-tight">
                02
              </span>
              <span className="mt-2.5 sm:mt-3 font-dm-sans font-black text-[11px] sm:text-xs tracking-[0.14em] text-ungu-heading uppercase">
                HARI FESTIVAL
              </span>
            </div>

            {/* Card 3: 04 PANGGUNG UTAMA */}
            <div className="bg-[#FAF5EA] rounded-2xl border-2 border-ungu-heading py-5 sm:py-6 md:py-7 px-3 sm:px-4 text-center flex flex-col items-center justify-center transition-transform hover:-translate-y-0.5 shadow-[0_2px_0_var(--color-ungu-heading)]">
              <span className="font-fraunces font-black text-4xl sm:text-5xl lg:text-[54px] text-[#A66C1E] leading-none tracking-tight">
                04
              </span>
              <span className="mt-2.5 sm:mt-3 font-dm-sans font-black text-[11px] sm:text-xs tracking-[0.14em] text-ungu-heading uppercase">
                PANGGUNG UTAMA
              </span>
            </div>

            {/* Card 4: PRPP SEMARANG BARAT */}
            <div className="bg-[#FAF5EA] rounded-2xl border-2 border-ungu-heading py-5 sm:py-6 md:py-7 px-3 sm:px-4 text-center flex flex-col items-center justify-center transition-transform hover:-translate-y-0.5 shadow-[0_2px_0_var(--color-ungu-heading)]">
              <span className="font-fraunces font-black text-3xl sm:text-4xl lg:text-[44px] text-ungu-heading leading-none tracking-tight">
                PRPP
              </span>
              <span className="mt-2.5 sm:mt-3 font-dm-sans font-black text-[11px] sm:text-xs tracking-[0.14em] text-ungu-heading uppercase">
                SEMARANG BARAT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Pita Pemisah Vintage Bagian Bawah */}
      <SectionDivider className="mt-12 sm:mt-16 md:mt-20" bgClass="bg-cream-tua" />
    </section>
  );
}
