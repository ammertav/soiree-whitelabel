import { LuReceipt, LuMail, LuCheck } from "react-icons/lu";
import { formatDateIndo, formatDateTimeIndo, formatRupiah } from "../../utils";

const LEGAL_NOTE =
  "Tanda terima resmi ini juga berfungsi sebagai bukti sah kepemilikan tiket jika sewaktu-waktu dibutuhkan verifikasi identitas di lokasi.";

export default function TransactionPaymentProof({ transaction }) {
  const eventDate = formatDateIndo(transaction.event?.start_time, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });

  const invoiceDetails = [
    { label: "Status Bayar", value: "Lunas Terverifikasi", isStatus: true },
    { label: "Waktu Selesai", value: formatDateTimeIndo(transaction.midtrans_synced_at || transaction.updated_at), isStatus: false },
    { label: "Email Pemesan", value: transaction.email, isStatus: false },
    { label: "Nomor WhatsApp", value: transaction.phone || "-", isStatus: false },
  ];

  const purchasedItems = (transaction.tickets || []).map((ticket) => ({
    id: ticket.id,
    title: `${ticket.TransTick?.qty || 0}x ${ticket.type}`,
    subtitle: [transaction.event?.event, eventDate].filter(Boolean).join(" · "),
    price: formatRupiah(ticket.TransTick?.subtotal),
  }));

  return (
    <section
      id="transaction-payment-proof"
      className="w-full bg-putih-butek pt-2 pb-14 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8"
      aria-label="Rincian Bukti Pembayaran dan Item Pembelian"
    >
      <div className="max-w-6xl mx-auto bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-6 sm:p-9 lg:p-11 shadow-[5px_6px_0_var(--color-ungu-heading)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Kolom Faktur */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-ungu-heading/50 flex items-center justify-center shrink-0 text-ungu-heading bg-cream-tua/40 shadow-2xs">
                  <LuReceipt className="w-4 h-4 sm:w-5 sm:h-5 text-ungu-heading stroke-[2.2]" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-dm-sans font-black text-xs tracking-widest text-ungu-heading/75 uppercase leading-none mb-1">
                    RINGKASAN FAKTUR
                  </span>
                  <h2 className="font-fraunces font-black text-xl sm:text-2xl text-ungu-heading leading-tight tracking-tight">
                    Bukti Pembayaran
                  </h2>
                </div>
              </div>

              <div className="bg-cream-tua/50 border border-ungu-heading/40 rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6">
                <div className="space-y-3">
                  {invoiceDetails.map((detail) => (
                    <div
                      key={detail.label}
                      className="flex items-center justify-between gap-3 text-xs sm:text-[13px] font-dm-sans min-w-0"
                    >
                      <span className="text-gray-custom font-normal shrink-0">
                        {detail.label}
                      </span>
                      <span
                        className={`text-right break-all ${
                          detail.isStatus
                            ? "font-black text-hijau"
                            : "font-bold text-ungu-heading"
                        }`}
                      >
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-cream-tua/40 border border-ungu-heading/30 rounded-xl p-3.5 sm:p-4 flex items-start gap-2.5">
              <LuMail className="w-4 h-4 text-ungu-heading/70 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="font-dm-sans text-xs text-gray-custom leading-relaxed">
                {LEGAL_NOTE}
              </p>
            </div>
          </div>

          {/* Kolom Item Pembelian */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:border-l lg:border-ungu-heading/20 lg:pl-10 xl:pl-12">
            <div>
              <h3 className="font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase text-ungu-heading mb-4 sm:mb-5">
                RINCIAN ITEM PEMBELIAN
              </h3>

              <div className="space-y-4 mb-4">
                {purchasedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 pb-3.5 border-b border-ungu-heading/15"
                  >
                    <div>
                      <h4 className="font-dm-sans font-black text-sm sm:text-base text-ungu-heading leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-dm-sans text-xs text-gray-custom/80 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="font-dm-sans font-black text-sm sm:text-base text-ungu-heading shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-start justify-between gap-4 text-xs sm:text-[13px] font-dm-sans pb-5">
                <p className="text-gray-custom font-normal">Biaya Layanan</p>
                <span className="font-bold text-ungu-heading shrink-0">
                  {formatRupiah(transaction.total_service)}
                </span>
              </div>
            </div>

            <div className="bg-cream-tua/70 border-2 border-ungu-heading rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-2 shadow-xs">
              <div>
                <span className="block font-dm-sans font-black text-[10px] sm:text-[11px] tracking-wider uppercase text-ungu-heading/70 mb-0.5">
                  TOTAL PEMBAYARAN LUNAS
                </span>
                <span className="font-fraunces font-black text-2xl sm:text-3xl lg:text-[34px] text-ungu-heading tracking-tight leading-none">
                  {formatRupiah(transaction.total_amount)}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-kuning-tua border-2 border-ungu-heading shadow-xs select-none shrink-0">
                <span className="w-3.5 h-3.5 rounded-full border border-ungu-heading flex items-center justify-center text-[8px] font-black text-ungu-heading">
                  <LuCheck className="w-2.5 h-2.5 stroke-[3]" aria-hidden="true" />
                </span>
                <span className="font-dm-sans font-black text-[10px] sm:text-[11px] text-ungu-heading uppercase tracking-wider">
                  LUNAS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
