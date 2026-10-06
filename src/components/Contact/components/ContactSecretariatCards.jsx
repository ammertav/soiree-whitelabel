import {
  LuBuilding2,
  LuClock,
  LuShieldPlus,
  LuBriefcase,
} from "react-icons/lu";
import posterImage from "../../../assets/soiree-dansante-assets/key-visual/key-visual-master-768x1376.png";

export default function ContactSecretariatCards() {
  return (
    <div className="flex flex-col">
      {/* Kartu Informasi Posko & Helpdesk - Menggunakan warna hijau identik Section 1 */}
      <div className="bg-hijau border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-6 sm:p-8 shadow-[5px_6px_0_var(--color-ungu-heading)] text-cream-terang">
        {/* Badge Posko Penyelenggara */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kuning-tua text-ungu-heading border border-ungu-heading text-[11px] sm:text-xs font-dm-sans font-black tracking-wider uppercase mb-6 select-none"
        >
          <LuBriefcase className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          <span>POSKO PENYELENGGARA & MEDIA DESK</span>
        </div>

        {/* Sub-bagian: Alamat Sekretariat Festival */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 text-kuning-muda">
            <LuBuilding2 className="w-5 h-5 stroke-[2.5] shrink-0" aria-hidden="true" />
            <h3 className="font-dm-sans font-black text-sm sm:text-[15px] tracking-wider uppercase">
              ALAMAT SEKRETARIAT FESTIVAL
            </h3>
          </div>
          <div className="font-dm-sans text-sm sm:text-[14.5px] text-cream-terang/90 leading-relaxed space-y-1">
            <p>Gedung Bale Sindoro, Kompleks PRPP Grand Maerakaca</p>
            <p>Jl. Anjasmoro Raya, Tawangsari, Kec. Semarang Barat</p>
            <p>Kota Semarang, Jawa Tengah 50144</p>
          </div>
        </div>

        {/* Garis Pemisah */}
        <div className="border-t border-cream-terang/20 my-5 sm:my-6" />

        {/* Sub-bagian: Jam Pelayanan Penonton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 text-kuning-muda">
            <LuClock className="w-5 h-5 stroke-[2.5] shrink-0" aria-hidden="true" />
            <h3 className="font-dm-sans font-black text-sm sm:text-[15px] tracking-wider uppercase">
              JAM PELAYANAN PENONTON
            </h3>
          </div>

          <div className="space-y-2 font-dm-sans text-sm sm:text-[14px]">
            <div className="flex justify-between items-center text-cream-terang">
              <span className="font-medium text-cream-terang/90">Pra-Festival (Senin – Sabtu):</span>
              <span className="font-bold text-cream-terang">09:00 – 18:00 WIB</span>
            </div>
            <div className="flex justify-between items-center text-cream-terang">
              <span className="font-medium text-cream-terang/90">Minggu & Tanggal Merah:</span>
              <span className="font-bold text-cream-terang">Reservasi Janji Temu</span>
            </div>
          </div>

          {/* Kotak Penekanan On-Site Festival */}
          <div className="bg-black/25 border border-cream-terang/25 rounded-xl p-3.5 sm:p-4 mt-3 text-xs sm:text-[13.5px] text-cream-terang leading-relaxed">
            <p>
              <span className="text-pink-custom font-bold mr-1.5" aria-hidden="true">★</span>
              <span className="font-bold">On-Site Festival (16–17 April 2027):</span> Helpdesk Buka 24 Jam di Gerbang Masuk PRPP Maerakaca.
            </p>
          </div>
        </div>

        {/* Garis Pemisah */}
        <div className="border-t border-cream-terang/20 my-5 sm:my-6" />

        {/* Sub-bagian: Posko Medis & Lost & Found */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 text-pink-custom">
            <LuShieldPlus className="w-5 h-5 stroke-[2.5] shrink-0" aria-hidden="true" />
            <h3 className="font-dm-sans font-black text-sm sm:text-[15px] tracking-wider uppercase">
              POSKO MEDIS & LOST & FOUND
            </h3>
          </div>
          <p className="font-dm-sans text-sm sm:text-[14px] text-cream-terang/85 leading-relaxed">
            Posko Medis darurat serta loket penanganan Barang Tertinggal (Lost and Found) beroperasi tepat
            di sisi kanan Gerbang Cat Proscenium selama hari H festival.
          </p>
        </div>
      </div>

      {/* Kartu Bawah: Layanan Ramah Kawan */}
      <div className="bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-2xl p-4 sm:p-5 shadow-[4px_5px_0_var(--color-ungu-heading)] flex items-center gap-4 mt-5 sm:mt-6">
        <div className="w-16 sm:w-20 shrink-0 aspect-[3/4] rounded-lg border border-ungu-heading overflow-hidden bg-putih-butek shadow-2xs">
          <img
            src={posterImage}
            alt="Poster Resmi Soirée Dansante Semarang 2027"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <span className="block font-dm-sans font-black text-[11px] sm:text-xs uppercase tracking-wider text-hijau mb-0.5">
            LAYANAN RAMAH KAWAN
          </span>
          <h4 className="font-fraunces font-black text-lg sm:text-[22px] text-ungu-heading leading-tight">
            Datang Dengan Senang
          </h4>
          <p className="font-dm-sans text-xs sm:text-[13.5px] text-gray-custom leading-snug mt-1.5">
            Festival ini menjamin ruang aman, ramah inklusi, dan bebas diskriminasi untuk semua pengunjung.
          </p>
        </div>
      </div>
    </div>
  );
}
