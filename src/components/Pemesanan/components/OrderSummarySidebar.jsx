import { formatRupiah } from "../../../utils";
import { PAYMENT_METHODS } from "../../../data/pemesananData";

export default function OrderSummarySidebar({
  orderSummary,
  formattedTimer,
  onProceedToPayment,
}) {
  return (
    <aside className="lg:col-span-4 w-full lg:sticky lg:top-24">
      <div className="bg-cream-terang border-2 border-ungu-heading rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[5px_5px_0_var(--color-ungu-heading)]">
        
        {/* Header Ringkasan + Countdown Timer */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b-2 border-ungu-heading/20">
          <div className="flex items-center gap-2">
            <span className="text-base text-hijau">&#128196;</span>
            <h3 className="font-dm-sans font-black text-base sm:text-lg text-ungu-heading">
              Ringkasan Pesanan
            </h3>
          </div>

          {/* Pill Timer */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cream-tua border border-ungu-heading/40 text-xs font-mono font-bold text-merah shadow-2xs">
            <span>&#128293;</span>
            <span>{formattedTimer}</span>
          </div>
        </div>

        {/* List Tiket Terpilih */}
        <div className="mb-4">
          <span className="block font-dm-sans font-bold text-[11px] text-ungu-heading/60 uppercase tracking-wider mb-2">
            TIKET TERPILIH
          </span>

          {orderSummary.selectedItems.length === 0 ? (
            <p className="text-xs font-dm-sans text-ungu-heading/50 italic py-2">
              Belum ada tiket yang dipilih.
            </p>
          ) : (
            <div className="space-y-2">
              {orderSummary.selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-xs font-dm-sans">
                  <span className="text-ungu-heading/90 font-medium pr-2">
                    {item.qty}x {item.title === "PENTAS SENJA JOGJA" ? "Pentas Senja Jogja Pass" : item.title === "ROADMAP BUNDLE" ? "Roadmap Bundle (Jogja + Festival)" : "2-Day Pass Festival"}
                  </span>
                  <span className="font-bold text-ungu-heading shrink-0">
                    {formatRupiah(item.total)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pembatas Putus-putus */}
        <div className="border-t border-dashed border-ungu-heading/30 my-3.5" />

        {/* Rincian Biaya */}
        <div className="space-y-1.5 text-xs font-dm-sans mb-4">
          <div className="flex justify-between text-ungu-heading/85">
            <span>Subtotal Tiket</span>
            <span className="font-bold text-ungu-heading">{formatRupiah(orderSummary.subtotal)}</span>
          </div>

          {orderSummary.discount > 0 && (
            <div className="flex justify-between text-merah font-semibold">
              <span>Diskon Voucher</span>
              <span>-{formatRupiah(orderSummary.discount)}</span>
            </div>
          )}

          <div className="flex justify-between text-ungu-heading/85">
            <span>Pajak &amp; Biaya Layanan</span>
            <span className="font-black text-hijau">Termasuk (Rp 0)</span>
          </div>
        </div>

        {/* Total Tagihan */}
        <div className="border-t border-ungu-heading/20 pt-3.5 mb-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="block font-dm-sans font-bold text-[11px] text-ungu-heading/70 uppercase tracking-wider">
                TOTAL PEMBAYARAN
              </span>
              <span className="block font-dm-sans text-[10px] text-ungu-heading/60">
                Sudah bersih tanpa biaya tersembunyi
              </span>
            </div>

            <div className="text-right">
              <span className="font-fraunces font-black text-2xl sm:text-3xl lg:text-[34px] text-ungu-heading tracking-tight">
                {formatRupiah(orderSummary.totalPayment)}
              </span>
            </div>
          </div>
        </div>

        {/* Tombol Aksi Utama */}
        <button
          type="button"
          onClick={onProceedToPayment}
          disabled={orderSummary.totalTickets === 0}
          className="w-full py-3.5 rounded-full bg-kuning-tua hover:bg-kuning-muda disabled:opacity-50 disabled:cursor-not-allowed border-2 border-ungu-heading shadow-[3px_3px_0_var(--color-ungu-heading)] active:translate-y-0.5 text-ungu-heading font-dm-sans font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer mb-5"
        >
          <span>LANJUT KE PEMBAYARAN</span>
          <span className="text-base leading-none">&rarr;</span>
        </button>

        {/* Metode Pembayaran Resmi */}
        <div className="text-center mb-4">
          <span className="block font-dm-sans font-bold text-[10px] text-ungu-heading/60 uppercase tracking-wider mb-2">
            METODE PEMBAYARAN RESMI
          </span>
          
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-1.5">
            {PAYMENT_METHODS.filter((m) => m !== "Kartu Kredit").map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-0.5 rounded-md bg-cream-tua border border-ungu-heading/30 font-dm-sans font-bold text-[11px] text-ungu-heading"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex justify-center">
            <span className="px-3 py-0.5 rounded-md bg-cream-tua border border-ungu-heading/30 font-dm-sans font-bold text-[11px] text-ungu-heading">
              Kartu Kredit
            </span>
          </div>
        </div>

        {/* Keamanan & Garansi */}
        <div className="flex items-center justify-center gap-4 text-[11px] font-dm-sans text-ungu-heading/75 pt-3 border-t border-ungu-heading/15 mb-3.5">
          <span className="flex items-center gap-1">
            <span>&#128274;</span> 256-bit SSL
          </span>
          <span className="flex items-center gap-1">
            <span>&#128170;</span> Garansi Tiket Resmi
          </span>
        </div>

        {/* Bantuan CS */}
        <div className="bg-cream-tua/50 border border-ungu-heading/20 rounded-xl p-2.5 flex items-center justify-between text-xs font-dm-sans">
          <span className="text-ungu-heading/80 flex items-center gap-1.5 text-[11px]">
            <span>&#127911;</span> Butuh bantuan cepat?
          </span>
          <a
            href="#contact"
            className="font-bold text-hijau hover:underline text-[11px]"
          >
            Hubungi CS
          </a>
        </div>

      </div>
    </aside>
  );
}
