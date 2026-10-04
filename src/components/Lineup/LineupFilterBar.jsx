import { FaChevronDown } from "react-icons/fa6";
import SearchBar from "../common/SearchBar";

/**
 * Reusable Filter Bar untuk Line Up & Jadwal Festival
 * Dilengkapi filter hari (pills), dropdown panggung, kurasi asal, dan reusable search bar.
 */
export default function LineupFilterBar({
  selectedDay = "SEMUA",
  onDayChange,
  selectedStage = "all",
  onStageChange,
  selectedOrigin = "all",
  onOriginChange,
  searchQuery = "",
  onSearchChange,
  className = "",
}) {
  const dayFilters = [
    { id: "SEMUA", topText: "SEMUA", bottomText: "HARI" },
    { id: "DAY 01", topText: "DAY 01 · 16", bottomText: "APR" },
    { id: "DAY 02", topText: "DAY 02 · 17", bottomText: "APR" },
  ];

  const stages = [
    { value: "all", label: "Semua Panggung (4 Stage)" },
    { value: "Cat Proscenium", label: "Cat Proscenium" },
    { value: "Panggung Teatrikal", label: "Panggung Teatrikal" },
    { value: "Panggung Senja", label: "Panggung Senja" },
    { value: "Panggung Ruang Riang", label: "Panggung Ruang Riang" },
  ];

  const origins = [
    { value: "all", label: "Semua Kurasi Asal" },
    { value: "Jakarta", label: "Jakarta" },
    { value: "Bandung", label: "Bandung" },
    { value: "Semarang", label: "Semarang" },
    { value: "Yogyakarta", label: "Yogyakarta" },
  ];

  return (
    <div
      className={`w-full bg-hijau-butek border-b-[3px] border-ungu-heading py-6 sm:py-7 md:py-8 transition-colors ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-8">
        {/* Sisi Kiri: 3 Pills Filter Hari */}
        <div className="flex items-center gap-3 sm:gap-3.5 flex-wrap justify-center sm:justify-start">
          {dayFilters.map((day) => {
            const isActive = selectedDay === day.id;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => onDayChange && onDayChange(day.id)}
                className={`rounded-[20px] sm:rounded-[22px] px-7 sm:px-8 py-2.5 sm:py-3.5 border-[2.5px] border-ungu-heading text-center leading-tight transition-all duration-200 cursor-pointer min-w-[115px] sm:min-w-[130px] shadow-[3.5px_4px_0_var(--color-ungu-heading)] ${
                  isActive
                    ? "bg-kuning-tua text-ungu-heading scale-[1.02]"
                    : "bg-[#FDF6E8] text-ungu-heading hover:bg-[#F5EEDB] active:scale-95"
                }`}
                aria-pressed={isActive}
              >
                <span className="block font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase">
                  {day.topText}
                </span>
                <span className="block font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase mt-0.5">
                  {day.bottomText}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bagian Tengah: 2 Dropdown Bertingkat (Panggung & Kurasi Asal) */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-2.5 w-full sm:w-auto items-center">
          {/* Dropdown 1: Semua Panggung */}
          <div className="relative w-full sm:w-72 lg:w-80">
            <select
              value={selectedStage}
              onChange={(e) => onStageChange && onStageChange(e.target.value)}
              className="w-full appearance-none bg-[#FDF6E8] border-[2.5px] border-ungu-heading rounded-[18px] sm:rounded-[20px] px-5 sm:px-6 py-2 sm:py-2.5 pr-10 font-dm-sans font-black text-xs sm:text-[13px] text-ungu-heading focus:outline-none cursor-pointer shadow-[3.5px_4px_0_var(--color-ungu-heading)]"
              aria-label="Filter Panggung"
            >
              {stages.map((stg) => (
                <option key={stg.value} value={stg.value}>
                  {stg.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ungu-heading pointer-events-none" />
          </div>

          {/* Dropdown 2: Semua Kurasi Asal */}
          <div className="relative w-full sm:w-72 lg:w-80">
            <select
              value={selectedOrigin}
              onChange={(e) => onOriginChange && onOriginChange(e.target.value)}
              className="w-full appearance-none bg-[#FDF6E8] border-[2.5px] border-ungu-heading rounded-[18px] sm:rounded-[20px] px-5 sm:px-6 py-2 sm:py-2.5 pr-10 font-dm-sans font-black text-xs sm:text-[13px] text-ungu-heading focus:outline-none cursor-pointer shadow-[3.5px_4px_0_var(--color-ungu-heading)]"
              aria-label="Filter Asal Kurasi"
            >
              {origins.map((orig) => (
                <option key={orig.value} value={orig.value}>
                  {orig.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ungu-heading pointer-events-none" />
          </div>
        </div>

        {/* Sisi Kanan: Reusable Search Bar */}
        <div className="w-full sm:w-80 md:w-96 lg:w-[380px]">
          <SearchBar
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Cari musisi / band idola..."
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
