import { useState } from "react";
import { whatsappUrl } from "../../../utils";
import {
  LuMessageSquareText,
  LuMail,
  LuChevronDown,
  LuCircleCheck,
} from "react-icons/lu";

// Kategori opsi formulir pertanyaan
const INQUIRY_CATEGORIES = [
  "Pertanyaan Tiket & E-Voucher",
  "Penukaran Wristband & Jadwal Panggung",
  "Aksesibilitas & Fasilitas Ramah Inklusi",
  "Sponsorship, Tenant & Kemitraan",
  "Media, Pers & Peliputan Acara",
  "Lainnya / Pertanyaan Umum",
];

export default function ContactDirectForm() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    category: "",
    message: "",
    consent: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.consent) {
      return;
    }

    // Tidak ada backend untuk form kontak: pesan dikirim lewat WhatsApp panitia
    const message = [
      "Halo panitia Soirée Dansante, saya ingin bertanya:",
      "",
      `Nama: ${formData.name}`,
      `WhatsApp: ${formData.whatsapp || "-"}`,
      `Email: ${formData.email}`,
      `Kategori: ${formData.category || "-"}`,
      "",
      formData.message,
    ].join("\n");

    const url = whatsappUrl(message);
    if (!url) {
      setSubmitError("Kanal WhatsApp panitia belum tersedia. Silakan hubungi kami lewat email.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitError(null);
    setIsSubmitted(true);
    setFormData({
      name: "",
      whatsapp: "",
      email: "",
      category: "",
      message: "",
      consent: false,
    });
  };

  return (
    <div className="bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-6 sm:p-8 md:p-10 shadow-[5px_6px_0_var(--color-ungu-heading)]">
      {/* Header Formulir */}
      <div className="flex items-center gap-3 mb-2.5">
        <div
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-kuning-tua border-2 border-ungu-heading flex items-center justify-center text-ungu-heading shrink-0 shadow-2xs select-none"
          aria-hidden="true"
        >
          <LuMessageSquareText className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.3]" />
        </div>
        <h2 className="font-fraunces font-black text-2xl sm:text-[28px] md:text-3xl text-ungu-heading leading-tight tracking-tight">
          Kirim Pesan Langsung ke Panitia
        </h2>
      </div>

      <p className="font-dm-sans font-normal text-sm sm:text-[14.5px] text-gray-custom leading-relaxed mb-6 sm:mb-8">
        Isi formulir di bawah ini dengan lengkap. Tim pelayanan penonton kami akan merespons
        pertanyaan Anda sesegera mungkin.
      </p>

      {/* Notifikasi Berhasil Terkirim */}
      {isSubmitted && (
        <div
          role="alert"
          className="mb-6 p-4 sm:p-5 rounded-2xl bg-tosca-muda border-2 border-ungu-heading flex items-start gap-3 shadow-[3px_3px_0_var(--color-ungu-heading)]"
        >
          <LuCircleCheck className="w-5 h-5 text-hijau shrink-0 mt-0.5 stroke-[2.3]" />
          <div className="flex-1 font-dm-sans text-sm sm:text-[14.5px] text-ungu-heading">
            <p className="font-bold">WhatsApp Telah Dibuka</p>
            <p className="text-gray-custom mt-0.5">
              Pesan Anda sudah tersusun di WhatsApp. Tekan tombol kirim di aplikasi WhatsApp agar pesan sampai ke panitia.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="font-dm-sans font-black text-xs sm:text-sm text-ungu-heading hover:underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {submitError && (
        <div role="alert" className="mb-6 p-4 rounded-2xl bg-merah/10 border-2 border-merah font-dm-sans text-sm font-bold text-merah">
          {submitError}
        </div>
      )}

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Baris Nama Lengkap & Nomor WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-dm-sans font-black text-xs sm:text-[13px] text-ungu-heading uppercase tracking-wider mb-2"
            >
              NAMA LENGKAP *
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Raden Dananjaya"
              className="w-full bg-putih-butek border-2 border-ungu-heading rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-[15px] text-ungu-heading placeholder:text-gray-custom/50 focus:outline-none focus:ring-2 focus:ring-kuning-tua transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="contact-whatsapp"
              className="block font-dm-sans font-black text-xs sm:text-[13px] text-ungu-heading uppercase tracking-wider mb-2"
            >
              NOMOR WHATSAPP *
            </label>
            <input
              id="contact-whatsapp"
              name="whatsapp"
              type="tel"
              required
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+62 81x-xxxx-xxxx"
              className="w-full bg-putih-butek border-2 border-ungu-heading rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-[15px] text-ungu-heading placeholder:text-gray-custom/50 focus:outline-none focus:ring-2 focus:ring-kuning-tua transition-colors"
            />
          </div>
        </div>

        {/* Baris Alamat Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block font-dm-sans font-black text-xs sm:text-[13px] text-ungu-heading uppercase tracking-wider mb-2"
          >
            ALAMAT EMAIL *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="alamat.surel@contoh.id"
            className="w-full bg-putih-butek border-2 border-ungu-heading rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-[15px] text-ungu-heading placeholder:text-gray-custom/50 focus:outline-none focus:ring-2 focus:ring-kuning-tua transition-colors"
          />
          <p className="font-dm-sans italic text-xs sm:text-[13px] text-kuning-gelap mt-1.5">
            Tiketmu & respons resmi akan dikirim ke email ini. Hindari typo penulisan.
          </p>
        </div>

        {/* Baris Kategori Pertanyaan */}
        <div>
          <label
            htmlFor="contact-category"
            className="block font-dm-sans font-black text-xs sm:text-[13px] text-ungu-heading uppercase tracking-wider mb-2"
          >
            KATEGORI PERTANYAAN *
          </label>
          <div className="relative">
            <select
              id="contact-category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-putih-butek border-2 border-ungu-heading rounded-xl px-4 py-3 sm:py-3.5 pr-10 text-sm sm:text-[15px] text-ungu-heading appearance-none focus:outline-none focus:ring-2 focus:ring-kuning-tua transition-colors cursor-pointer"
            >
              <option value="" disabled>
                Pilih salah satu topik kebutuhan Anda
              </option>
              {INQUIRY_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <LuChevronDown
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ungu-heading pointer-events-none stroke-[2.3]"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Baris Pesan atau Pertanyaan */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-dm-sans font-black text-xs sm:text-[13px] text-ungu-heading uppercase tracking-wider mb-2"
          >
            PESAN ATAU PERTANYAAN ANDA *
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Tuliskan detail pertanyaan atau kendala yang dihadapi..."
            className="w-full bg-putih-butek border-2 border-ungu-heading rounded-2xl px-4 py-3 sm:py-3.5 text-sm sm:text-[15px] text-ungu-heading placeholder:text-gray-custom/50 focus:outline-none focus:ring-2 focus:ring-kuning-tua resize-none transition-colors"
          />
        </div>

        {/* Checkbox Persetujuan Data Pribadi */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 w-4.5 h-4.5 rounded border-2 border-ungu-heading text-ungu-heading accent-ungu-heading cursor-pointer shrink-0"
          />
          <label
            htmlFor="contact-consent"
            className="font-dm-sans font-medium text-xs sm:text-[13.5px] text-gray-custom leading-normal cursor-pointer select-none"
          >
            Saya menyetujui data pribadi digunakan oleh pihak panitia Soirée Dansante untuk keperluan
            tindak lanjut layanan dan pemecahan kendala festival.
          </label>
        </div>

        {/* Tombol Kirim Pesan */}
        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2.5 bg-kuning-tua hover:bg-kuning-muda active:translate-x-0.5 active:translate-y-0.5 text-ungu-heading border-2 border-ungu-heading rounded-full px-7 sm:px-8 py-3.5 sm:py-4 font-dm-sans font-black text-xs sm:text-sm tracking-wider uppercase shadow-[3px_4px_0_var(--color-ungu-heading)] active:shadow-[1px_1px_0_var(--color-ungu-heading)] transition-all cursor-pointer"
          >
            <LuMail className="w-4.5 h-4.5 stroke-[2.5]" aria-hidden="true" />
            <span>KIRIM VIA WHATSAPP</span>
          </button>
        </div>
      </form>
    </div>
  );
}
