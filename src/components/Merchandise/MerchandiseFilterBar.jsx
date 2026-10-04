import { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaMagnifyingGlass } from "react-icons/fa6";

/**
 * Filter Bar Horizontal untuk Katalog Merchandise
 * Dilengkapi kategori pills yang dapat di-scroll horizontal secara halus di mobile & desktop,
 * input pencarian, dan dropdown pengurutan (sorting).
 */
export default function MerchandiseFilterBar({
  categories = [],
  selectedCategory = "all",
  onSelectCategory,
  searchQuery = "",
  onSearchChange,
  sortBy = "popular",
  onSortChange,
}) {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  return (
    <div className="w-full bg-hijau-butek border-y-2 border-ungu-heading py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8 transition-colors select-none">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3.5 lg:gap-6">
        
        {/* --- SISI KIRI: HORIZONTAL SCROLLABLE CATEGORY PILLS --- */}
        <div className="relative flex items-center w-full lg:w-auto min-w-0 max-w-full">
          {/* Scroll Button Left (Helper) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="flex items-center justify-center w-7 h-7 rounded-full bg-cream-terang hover:bg-kuning-tua border border-ungu-heading text-ungu-heading mr-1.5 shrink-0 shadow-xs cursor-pointer active:scale-95 transition-colors"
            title="Scroll kategori ke kiri"
            aria-label="Scroll filter kiri"
          >
            <FaChevronLeft className="w-2.5 h-2.5" />
          </button>

          {/* Container Pills dengan Horizontal Scroll & Hide Scrollbar */}
          <div
            ref={scrollContainerRef}
            onWheel={handleWheel}
            className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scroll-smooth py-1 w-full lg:w-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`shrink-0 inline-flex items-center gap-1 px-4 sm:px-5 py-2 rounded-full font-dm-sans font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer border-2 border-ungu-heading ${
                    isActive
                      ? "bg-kuning-tua text-ungu-heading shadow-[2.5px_2.5px_0_var(--color-ungu-heading)] -translate-y-0.5"
                      : "bg-cream-terang text-ungu-heading/90 hover:bg-cream-muda hover:-translate-y-0.5"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="opacity-75">({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Button Right (Helper) */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="flex items-center justify-center w-7 h-7 rounded-full bg-cream-terang hover:bg-kuning-tua border border-ungu-heading text-ungu-heading ml-1.5 shrink-0 shadow-xs cursor-pointer active:scale-95 transition-colors"
            title="Scroll kategori ke kanan"
            aria-label="Scroll filter kanan"
          >
            <FaChevronRight className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* --- SISI KANAN: SEARCH INPUT & SORT DROPDOWN --- */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0 justify-between lg:justify-end">
          {/* Search Box Input */}
          <div className="relative flex-1 sm:w-60 md:w-64 lg:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari cenderamata..."
              className="w-full pl-9 pr-4 py-2 sm:py-2.5 rounded-full bg-cream-terang border-2 border-ungu-heading text-ungu-heading placeholder:text-ungu-heading/55 font-dm-sans text-xs sm:text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-kuning-tua shadow-xs"
            />
            <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ungu-heading/70 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ungu-heading/60 hover:text-ungu-heading text-sm font-bold p-1 cursor-pointer"
              >
                &times;
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2 sm:py-2.5 rounded-full bg-cream-terang border-2 border-ungu-heading text-ungu-heading font-dm-sans font-bold text-xs sm:text-[13px] focus:outline-none focus:ring-2 focus:ring-kuning-tua shadow-xs cursor-pointer"
            >
              <option value="popular">Paling Populer</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="name-az">Nama A &ndash; Z</option>
            </select>
            {/* Custom Caret Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ungu-heading">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
