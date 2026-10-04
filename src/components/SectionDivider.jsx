/**
 * Pemisah section bergaya vintage: dua pita ungu yang tebal di pinggir
 * dan menipis ke tengah, dengan celah krem berbentuk lensa di antaranya.
 */
export default function SectionDivider({ className = "", bgClass = "bg-cream-tengah" }) {
  return (
    <div className={`w-full leading-none ${className}`} aria-hidden="true">
      <svg
        className={`block w-full h-3.5 sm:h-4 ${bgClass}`}
        viewBox="0 0 1200 14"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pita atas */}
        <path d="M0 0 H1200 V5 Q600 -1 0 5 Z" className="fill-ungu-heading" />
        {/* Pita bawah */}
        <path d="M0 14 H1200 V9 Q600 15 0 9 Z" className="fill-ungu-heading" />
      </svg>
    </div>
  );
}
