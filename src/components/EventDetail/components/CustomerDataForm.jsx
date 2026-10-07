import DynamicField from "./DynamicField";

const INPUT_CLASS =
  "w-full bg-cream-terang border-2 border-ungu-heading rounded-xl px-4 py-2.5 sm:py-3 font-dm-sans text-xs sm:text-sm text-ungu-heading placeholder:text-ungu-heading/40 focus:outline-none focus:ring-2 focus:ring-kuning-tua";

export default function CustomerDataForm({
  formData,
  onChange,
  errors = {},
  orderFields = [],
  orderAnswers = {},
  onOrderAnswerChange,
  hasTerms = false,
}) {
  return (
    <article className="bg-cream-terang border-2 border-ungu-heading rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[5px_5px_0_var(--color-ungu-heading)]">

      {/* Header Form */}
      <div>
        <h2 className="font-fraunces font-black text-2xl sm:text-[26px] text-ungu-heading leading-tight">
          Data Diri Pembeli
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
          <strong className="font-black text-ungu-heading">PENTING:</strong> Tiket elektronik (QR Code) resmi akan dikirim ke alamat email Anda setelah pembayaran berhasil. Pastikan tidak ada kesalahan ketik (typo) pada alamat email.
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
            className={INPUT_CLASS}
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
              className={INPUT_CLASS}
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
              className={INPUT_CLASS}
            />
            {errors.whatsapp && (
              <p className="font-dm-sans text-xs text-merah font-bold mt-1">{errors.whatsapp}</p>
            )}
          </div>
        </div>

        {/* Field tambahan per pesanan dari form builder organizer */}
        {orderFields.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {orderFields.map((field) => (
              <DynamicField
                key={field.field_key}
                field={field}
                inputId={`order-${field.field_key}`}
                value={orderAnswers[field.field_key]}
                onChange={(value) => onOrderAnswerChange(field.field_key, value)}
                error={errors[`order.${field.field_key}`]}
              />
            ))}
          </div>
        )}

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
            {hasTerms ? (
              <a href="#syarat-ketentuan" className="underline font-bold text-ungu-heading hover:text-kuning-tua">
                Syarat &amp; Ketentuan
              </a>
            ) : (
              <span className="font-bold text-ungu-heading">Syarat &amp; Ketentuan</span>
            )}{" "}
            event ini. Saya mengonfirmasi data yang dimasukkan sudah benar dan dapat dipertanggungjawabkan.
          </span>
        </label>
        {errors.agreedToTerms && (
          <p className="font-dm-sans text-xs text-merah font-bold mt-1.5 ml-7">{errors.agreedToTerms}</p>
        )}
      </div>

    </article>
  );
}
