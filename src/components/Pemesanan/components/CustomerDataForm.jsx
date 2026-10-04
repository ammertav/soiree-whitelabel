import { DOMISILI_OPTIONS } from "../../../data/pemesananData";

export default function CustomerDataForm({ formData, onChange, errors = {} }) {
  return (
    <article className="bg-cream-terang border-2 border-ungu-heading rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[5px_5px_0_var(--color-ungu-heading)]">
      
      {/* Header Form */}
      <div>
        <h2 className="font-fraunces font-black text-2xl sm:text-[26px] text-ungu-heading leading-tight">
          Data Diri Pembeli &amp; Pengunjung
        </h2>
        <p className="font-dm-sans text-xs sm:text-sm text-ungu-heading/75 mt-1">
          Pastikan data sesuai dengan kartu identitas resmi untuk verifikasi e-tiket saat penukaran wristband.
        </p>
      </div>

      {/* Garis Pembatas Header */}
      <div className="border-t border-ungu-heading/20 my-4" />

      {/* Box Catatan Penting */}
      <div className="bg-cream-terang border-2 border-ungu-heading rounded-xl p-3.5 sm:p-4 mb-5 flex items-start gap-3">
        <span className="text-ungu-heading shrink-0 mt-0.5">
          <svg
            className="w-4 h-4 fill-none stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </span>
        <p className="font-dm-sans text-xs sm:text-[13px] text-ungu-heading/90 leading-relaxed">
          <strong className="font-black text-ungu-heading">PENTING:</strong> Tiket elektronik (e-ticket / QR Code) resmi akan dikirim via WhatsApp &amp; Email. Pastikan tidak ada kesalahan ketik (typo) pada alamat email &amp; nomor WhatsApp Anda.
        </p>
      </div>

      {/* Grid Formulir */}
      <div className="space-y-4">
        
        {/* Field 1: Nama Lengkap */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="customer-fullname" className="font-dm-sans font-bold text-xs uppercase tracking-wider text-ungu-heading">
              NAMA LENGKAP <span className="text-merah">*</span>
            </label>
            <span className="font-dm-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-ungu-heading/60">
              SESUAI KTP / PASPOR
            </span>
          </div>
          <input
            id="customer-fullname"
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Contoh: Raden Satria Pratama"
            className="w-full bg-cream-terang border-2 border-ungu-heading rounded-xl px-4 py-2.5 sm:py-3 font-dm-sans text-xs sm:text-sm text-ungu-heading placeholder:text-ungu-heading/40 focus:outline-none focus:ring-2 focus:ring-kuning-tua"
          />
          {errors.fullName && (
            <p className="font-dm-sans text-xs text-merah font-bold mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Field 2 & 3: Email & No. WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="customer-email" className="block font-dm-sans font-bold text-xs uppercase tracking-wider text-ungu-heading mb-1.5">
              ALAMAT EMAIL <span className="text-merah">*</span>
            </label>
            <input
              id="customer-email"
              type="email"
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="nama@domain.com"
              className="w-full bg-cream-terang border-2 border-ungu-heading rounded-xl px-4 py-2.5 sm:py-3 font-dm-sans text-xs sm:text-sm text-ungu-heading placeholder:text-ungu-heading/40 focus:outline-none focus:ring-2 focus:ring-kuning-tua"
            />
            {errors.email && (
              <p className="font-dm-sans text-xs text-merah font-bold mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="customer-whatsapp" className="font-dm-sans font-bold text-xs uppercase tracking-wider text-ungu-heading">
                NO. WHATSAPP <span className="text-merah">*</span>
              </label>
              <span className="font-dm-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-hijau">
                AKTIF WHATSAPP
              </span>
            </div>
            <input
              id="customer-whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => onChange("whatsapp", e.target.value)}
              placeholder="081234567890"
              className="w-full bg-cream-terang border-2 border-ungu-heading rounded-xl px-4 py-2.5 sm:py-3 font-dm-sans text-xs sm:text-sm text-ungu-heading placeholder:text-ungu-heading/40 focus:outline-none focus:ring-2 focus:ring-kuning-tua"
            />
            {errors.whatsapp && (
              <p className="font-dm-sans text-xs text-merah font-bold mt-1">{errors.whatsapp}</p>
            )}
          </div>
        </div>

        {/* Field 4 & 5: Jenis Kelamin & Tanggal Lahir */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="block font-dm-sans font-bold text-xs uppercase tracking-wider text-ungu-heading mb-1.5">
              JENIS KELAMIN <span className="text-merah">*</span>
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onChange("gender", "LAKI-LAKI")}
                className={`py-2.5 sm:py-3 rounded-xl border-2 border-ungu-heading font-dm-sans text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  formData.gender === "LAKI-LAKI"
                    ? "bg-kuning-tua text-ungu-heading font-black shadow-xs"
                    : "bg-cream-terang text-ungu-heading font-bold hover:bg-cream-tua/50"
                }`}
              >
                LAKI-LAKI
              </button>
              <button
                type="button"
                onClick={() => onChange("gender", "PEREMPUAN")}
                className={`py-2.5 sm:py-3 rounded-xl border-2 border-ungu-heading font-dm-sans text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  formData.gender === "PEREMPUAN"
                    ? "bg-kuning-tua text-ungu-heading font-black shadow-xs"
                    : "bg-cream-terang text-ungu-heading font-bold hover:bg-cream-tua/50"
                }`}
              >
                PEREMPUAN
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="customer-birthdate" className="block font-dm-sans font-bold text-xs uppercase tracking-wider text-ungu-heading mb-1.5">
              TANGGAL LAHIR <span className="text-merah">*</span>
            </label>
            <input
              id="customer-birthdate"
              type="text"
              value={formData.birthDate}
              onChange={(e) => onChange("birthDate", e.target.value)}
              placeholder="mm/dd/yyyy"
              className="w-full bg-cream-terang border-2 border-ungu-heading rounded-xl px-4 py-2.5 sm:py-3 font-dm-sans text-xs sm:text-sm text-ungu-heading placeholder:text-ungu-heading/40 focus:outline-none focus:ring-2 focus:ring-kuning-tua"
            />
            {errors.birthDate && (
              <p className="font-dm-sans text-xs text-merah font-bold mt-1">{errors.birthDate}</p>
            )}
          </div>
        </div>

        {/* Field 6 & 7: NIK / No. Paspor & Asal Domisili */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="customer-nik" className="font-dm-sans font-bold text-xs uppercase tracking-wider text-ungu-heading">
                NIK / NO. PASPOR <span className="text-merah">*</span>
              </label>
              <span className="font-dm-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-ungu-heading/60">
                16 DIGIT KTP
              </span>
            </div>
            <input
              id="customer-nik"
              type="text"
              maxLength={16}
              value={formData.identityNumber}
              onChange={(e) => onChange("identityNumber", e.target.value)}
              placeholder="33740xxxxxxxxxxx"
              className="w-full bg-cream-terang border-2 border-ungu-heading rounded-xl px-4 py-2.5 sm:py-3 font-dm-sans text-xs sm:text-sm text-ungu-heading placeholder:text-ungu-heading/40 focus:outline-none focus:ring-2 focus:ring-kuning-tua"
            />
            {errors.identityNumber && (
              <p className="font-dm-sans text-xs text-merah font-bold mt-1">{errors.identityNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="customer-domicile" className="block font-dm-sans font-bold text-xs uppercase tracking-wider text-ungu-heading mb-1.5">
              ASAL PROVINSI / KOTA <span className="text-merah">*</span>
            </label>
            <div className="relative">
              <select
                id="customer-domicile"
                value={formData.domicile}
                onChange={(e) => onChange("domicile", e.target.value)}
                className="w-full bg-cream-terang border-2 border-ungu-heading rounded-xl px-4 py-2.5 sm:py-3 font-dm-sans text-xs sm:text-sm text-ungu-heading appearance-none focus:outline-none focus:ring-2 focus:ring-kuning-tua cursor-pointer pr-10"
              >
                <option value="">Pilih Domisili</option>
                {DOMISILI_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-ungu-heading text-xs">
                ▼
              </span>
            </div>
            {errors.domicile && (
              <p className="font-dm-sans text-xs text-merah font-bold mt-1">{errors.domicile}</p>
            )}
          </div>
        </div>

      </div>

      {/* Checkbox Persetujuan Syarat & Ketentuan */}
      <div className="border-t border-ungu-heading/20 pt-4 mt-5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) => onChange("agreedToTerms", e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-2 border-ungu-heading accent-ungu-heading cursor-pointer shrink-0"
          />
          <span className="font-dm-sans text-xs text-ungu-heading/85 leading-relaxed">
            Saya menyetujui{" "}
            <a href="#terms" className="underline font-bold text-ungu-heading hover:text-kuning-tua">
              Syarat &amp; Ketentuan
            </a>{" "}
            serta{" "}
            <a href="#privacy" className="underline font-bold text-ungu-heading hover:text-kuning-tua">
              Kebijakan Privasi
            </a>{" "}
            Soirée Dansante 2027. Saya mengonfirmasi data identitas yang dimasukkan sudah benar dan dapat dipertanggungjawabkan.
          </span>
        </label>
        {errors.agreedToTerms && (
          <p className="font-dm-sans text-xs text-merah font-bold mt-1.5 ml-7">{errors.agreedToTerms}</p>
        )}
      </div>

    </article>
  );
}
