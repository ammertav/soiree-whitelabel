import { FaTrain } from "react-icons/fa6";
import { LuPlane, LuCar } from "react-icons/lu";

// Data kurasi panduan akses kedatangan transportasi
const TRANSPORT_GUIDES = [
  {
    id: "train",
    eyebrow: "KEDATANGAN KERETA API",
    title: "Stasiun Poncol & Tawang",
    description:
      "Dari Stasiun Semarang Poncol berjarak 6 km, atau Stasiun Tawang berjarak 8 km. Anda dapat menggunakan Trans Semarang Koridor IV atau taksi online (estimasi 15–20 menit).",
    footerText: "Halte Trans Semarang terdekat: Halte Puri Anjasmoro.",
    iconBg: "bg-kuning-tua",
    icon: <FaTrain className="w-5 h-5 text-ungu-heading" aria-hidden="true" />,
  },
  {
    id: "flight",
    eyebrow: "KEDATANGAN JALUR UDARA",
    title: "Bandara Ahmad Yani (SRG)",
    description:
      "Bandara Internasional Jenderal Ahmad Yani berjarak amat dekat, hanya sekitar 3.5 km dari venue. Waktu tempuh kendaraan berkisar 8–10 menit tanpa kemacetan.",
    footerText: "Tersedia taksi resmi bandara & titik jemput transportasi daring.",
    iconBg: "bg-pink-custom",
    icon: <LuPlane className="w-5 h-5 stroke-[2.3] text-ungu-heading" aria-hidden="true" />,
  },
  {
    id: "road",
    eyebrow: "KENDARAAN PRIBADI & TOL",
    title: "Akses Tol Krapyak",
    description:
      "Bagi pengunjung dari luar kota lewat tol Trans Jawa, ambil Exit Tol Krapyak, lanjut ke Jalan Siliwangi lalu belok ke Jl. Anjasmoro Raya. Parkir mobil & motor terpusat.",
    footerText: "Kapasitas parkir terkelola: 2.500 mobil & 6.000 sepeda motor.",
    iconBg: "bg-tosca-muda",
    icon: <LuCar className="w-5 h-5 stroke-[2.3] text-ungu-heading" aria-hidden="true" />,
  },
];

export default function TransportGuideCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
      {TRANSPORT_GUIDES.map((item) => (
        <div
          key={item.id}
          className="bg-hijau-tua border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-6 sm:p-7 shadow-[4px_5px_0_var(--color-ungu-heading)] text-cream-terang flex flex-col justify-between"
        >
          <div>
            {/* Ikon Bulat */}
            <div
              className={`w-11 h-11 rounded-full border-2 border-ungu-heading ${item.iconBg} flex items-center justify-center shadow-2xs mb-5 select-none`}
            >
              {item.icon}
            </div>

            {/* Eyebrow */}
            <span className="block font-dm-sans font-black text-[10px] sm:text-[11px] uppercase tracking-wider text-kuning-muda mb-2 select-none">
              {item.eyebrow}
            </span>

            {/* Judul Kartu */}
            <h3 className="font-fraunces font-black text-xl sm:text-2xl text-cream-terang leading-tight mb-3">
              {item.title}
            </h3>

            {/* Deskripsi */}
            <p className="font-dm-sans font-normal text-xs sm:text-[13.5px] text-cream-terang/85 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Garis Pemisah & Catatan Kaki */}
          <div className="border-t border-cream-terang/20 pt-4 mt-6">
            <p className="font-dm-sans text-xs sm:text-[12.5px] text-cream-terang/75 leading-snug">
              {item.footerText}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
