import checkboardDivider from "../assets/soiree-dansante-assets/divider/checkboard-divider.png";

/**
 * Pemisah section resmi festival Soirée Dansante:
 * Strip bermotif papan catur (checkboard-divider.png) yang berulang horizontal secara presisi.
 */
export default function SectionDivider({ className = "" }) {
  return (
    <div
      className={`w-full h-4 sm:h-[18px] bg-repeat-x bg-left-top select-none pointer-events-none leading-none ${className}`}
      style={{
        backgroundImage: `url(${checkboardDivider})`,
        backgroundSize: "auto 100%",
      }}
      aria-hidden="true"
    />
  );
}
