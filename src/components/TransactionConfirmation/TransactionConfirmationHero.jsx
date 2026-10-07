import artCatToast from "../../assets/soiree-dansante-assets/objects/04-bersulang.png";
import TransactionStepper from "../Transaction/TransactionStepper";
import { countTransactionTickets, formatDateTimeIndo } from "../../utils";

export default function TransactionConfirmationHero({ transaction }) {
  const metaItems = [
    { label: "NOMOR PESANAN", value: `#${transaction.no_order}` },
    { label: "WAKTU TRANSAKSI", value: formatDateTimeIndo(transaction.midtrans_synced_at || transaction.updated_at) },
    { label: "TOTAL TIKET", value: `${countTransactionTickets(transaction)} Tiket Masuk` },
  ];

  return (
    <div className="w-full">
      {/* Sub-Header: Alur Pemesanan (semua langkah selesai) */}
      <TransactionStepper title="Tiket Terkonfirmasi" activeStep={4} />

      {/* Hero Card Konfirmasi Transaksi */}
      <section
        id="transaction-hero"
        className="w-full bg-putih-butek py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8"
        aria-label="Konfirmasi Transaksi Berhasil"
      >
        <div className="max-w-6xl mx-auto bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-6 sm:p-9 lg:p-11 shadow-[5px_6px_0_var(--color-ungu-heading)]">
          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-10">
            <div className="flex-1 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-teal text-tosca-muda text-[10px] sm:text-[11px] font-dm-sans font-black uppercase tracking-wider mb-4 select-none">
                <span className="w-3.5 h-3.5 rounded-full border border-tosca-muda flex items-center justify-center text-[8px] font-bold">
                  &#10003;
                </span>
                <span>STATUS: LUNAS / TERKONFIRMASI</span>
              </div>

              <h1 className="font-fraunces tracking-tight leading-[1.1] mb-4 sm:mb-5">
                <span className="block font-black text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] text-hijau">
                  Transaksi Berhasil!
                </span>
                <span className="block italic font-black text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] text-ungu-heading mt-0.5 sm:mt-1">
                  Tiketmu Telah Diamankan.
                </span>
              </h1>

              <p className="font-dm-sans font-normal text-sm sm:text-[15px] text-gray-custom leading-relaxed mb-6 sm:mb-8 max-w-xl">
                Sampai jumpa di {transaction.event?.event || "Soirée Dansante"}! E-tiket beserta kode QR resmi
                telah dikirimkan ke email Anda (<strong className="text-ungu-heading">{transaction.email}</strong>).
                Jika belum masuk dalam beberapa menit, periksa folder spam.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-xl">
                {metaItems.map((item) => (
                  <div
                    key={item.label}
                    className="bg-cream-tua/60 border border-ungu-heading/50 rounded-xl px-3.5 py-2.5 flex flex-col justify-center min-w-0"
                  >
                    <span className="font-dm-sans font-black text-[9px] sm:text-[10px] text-ungu-heading/70 tracking-wider uppercase mb-0.5">
                      {item.label}
                    </span>
                    <span className="font-dm-sans font-bold text-xs sm:text-[13px] text-ungu-heading break-all">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ilustrasi Maskot */}
            <div className="relative shrink-0 flex items-center justify-center mt-2 lg:mt-0">
              <div className="absolute -top-2 sm:-top-3 right-0 sm:-right-2 z-20 rotate-[6deg]">
                <div className="relative px-3 sm:px-3.5 py-1 bg-pink-custom text-ungu-heading border-2 border-ungu-heading rounded-full shadow-[2px_2.5px_0_var(--color-ungu-heading)] flex items-center gap-1 select-none">
                  <span className="font-dm-sans font-black text-[10px] sm:text-[11px] uppercase tracking-wider">
                    SIAP BERDANSA!
                  </span>
                  <span
                    className="absolute -bottom-1.5 left-3.5 w-2.5 h-2.5 bg-pink-custom border-b-2 border-l-2 border-ungu-heading rotate-[-45deg]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 rounded-full bg-kuning-tua border-[2.5px] border-ungu-heading relative overflow-hidden flex items-end justify-center select-none shadow-xs">
                <img
                  src={artCatToast}
                  alt="Ilustrasi Kucing Bersulang Soirée Dansante"
                  className="w-[88%] h-auto object-contain translate-y-1 select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
