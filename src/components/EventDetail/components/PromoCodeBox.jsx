export default function PromoCodeBox({
  promoInput,
  onPromoInputChange,
  onApplyPromo,
  feedback,
}) {
  return (
    <div className="bg-cream-terang border-2 border-ungu-heading rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0_var(--color-ungu-heading)] mb-6">
      <label htmlFor="promo-input" className="block font-dm-sans font-bold text-sm text-ungu-heading mb-2.5">
        Punya Kode Promo / Voucher Presale?
      </label>

      <form onSubmit={onApplyPromo} className="flex flex-col sm:flex-row items-stretch gap-2.5">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ungu-heading/60">
            <svg
              className="w-4 h-4 fill-none stroke-current"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z" />
              <circle cx="7.5" cy="7.5" r="1.5" />
            </svg>
          </span>
          <input
            id="promo-input"
            type="text"
            value={promoInput}
            onChange={(e) => onPromoInputChange(e.target.value)}
            placeholder="MASUKKAN KODE PROMO (MISAL: DANSA2027)"
            className="w-full bg-cream-terang border-2 border-ungu-heading rounded-xl pl-10 pr-3.5 py-2.5 font-dm-sans text-xs sm:text-sm font-bold uppercase text-ungu-heading placeholder:text-ungu-heading/45 focus:outline-none focus:ring-2 focus:ring-kuning-tua"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-kuning-tua hover:bg-kuning-muda text-ungu-heading font-dm-sans font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-ungu-heading shadow-[2px_2px_0_var(--color-ungu-heading)] active:translate-y-0.5 cursor-pointer transition-all shrink-0"
        >
          TERAPKAN
        </button>
      </form>

      {feedback && (
        <p className={`mt-2 font-dm-sans text-xs font-bold ${feedback.valid ? "text-hijau" : "text-merah"}`}>
          {feedback.message}
        </p>
      )}
    </div>
  );
}
