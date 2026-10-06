import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

/**
 * Reusable Search Bar Component
 * Bergaya vintage festival dengan pill border, ikon pencarian, dan reset button.
 */
export default function SearchBar({
  value = "",
  onChange,
  onSubmit,
  onClear,
  placeholder = "Cari musisi / band idola...",
  className = "",
  autoFocus = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  const handleClear = () => {
    if (onChange) onChange({ target: { value: "" } });
    if (onClear) onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center bg-cream-terang border-[2.5px] border-ungu-heading rounded-full pl-5 sm:pl-6 pr-2 py-2 sm:py-2.5 transition-all duration-200 shadow-[3.5px_4px_0_var(--color-ungu-heading)] focus-within:shadow-[4px_4.5px_0_var(--color-ungu-heading)] ${className}`}
      role="search"
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full bg-transparent text-sm sm:text-[15px] font-medium text-ungu-heading placeholder:text-gray-custom/75 focus:outline-none pr-3 select-text"
        aria-label={placeholder}
      />

      {/* Clear Button jika ada teks */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="text-gray-custom/60 hover:text-ungu-heading p-1.5 mr-1 text-sm transition-colors cursor-pointer"
          title="Hapus pencarian"
          aria-label="Hapus pencarian"
        >
          <FaXmark />
        </button>
      )}

      {/* Tombol Search Ikon Kaca Pembesar Kuning */}
      <button
        type="submit"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-kuning-tua hover:bg-kuning-muda active:scale-95 border-2 border-ungu-heading flex items-center justify-center text-ungu-heading shrink-0 transition-transform shadow-xs cursor-pointer"
        title="Cari"
        aria-label="Cari"
      >
        <FaMagnifyingGlass className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      </button>
    </form>
  );
}
