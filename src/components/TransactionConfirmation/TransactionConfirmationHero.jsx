import { LuTicket } from "react-icons/lu";
import artCatToast from "../../assets/soiree-dansante-assets/objects/04-bersulang.png";

// Data konstan konfirmasi transaksi
const CONFIRMATION_DATA = {
  statusHeader: {
    badge: "STATUS PEMESANAN",
    title: "Tiket Terkonfirmasi",
    steps: [
      { id: 1, label: "1. Pilih Tiket", isCompleted: true },
      { id: 2, label: "2. Data Diri", isCompleted: true },
      { id: 3, label: "3. Pembayaran Sukses", isCompleted: false },
    ],
  },
  card: {
    statusBadge: "STATUS: LUNAS / TERKONFIRMASI",
    titleLine1: "Transaksi Berhasil!",
    titleLine2: "Tiketmu Telah Diamankan.",
    descriptionLines: [
      "Sampai jumpa di gemerlap panggung Soirée Dansante 2027! Salinan e-tiket dan kode",
      "QR resmi telah dikirimkan langsung ke email Anda (raden.dananjaya@email.com)",
      "serta nomor WhatsApp yang terdaftar.",
    ],
    metaItems: [
      { label: "NOMOR PESANAN", value: "#SD2027-894218" },
      { label: "WAKTU TRANSAKSI", value: "24 Maret 2027, 14:32 WIB" },
      { label: "TOTAL TIKET", value: "2 Tiket Masuk" },
    ],
    catBadge: "SIAP BERDANSA!",
  },
};

export default function TransactionConfirmationHero() {
  const { statusHeader, card } = CONFIRMATION_DATA;

  return (
    <div className="w-full">
      {/* Sub-Header: Alur Pemesanan */}
      <div className="w-full bg-cream-tua border-b-[2.5px] border-ungu-heading py-4 sm:py-5 md:py-6 px-4 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-hijau text-cream-tua flex items-center justify-center shrink-0 border-2 border-ungu-heading/40 shadow-xs">
              <LuTicket className="w-5 h-5 sm:w-6 sm:h-6 text-cream-tua stroke-[2.2]" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-dm-sans font-black text-xs sm:text-[13px] tracking-[0.16em] text-ungu-heading/80 uppercase leading-none mb-1.5">
                {statusHeader.badge}
              </span>
              <span className="font-fraunces font-black text-xl sm:text-2xl md:text-[26px] text-ungu-heading leading-tight tracking-tight">
                {statusHeader.title}
              </span>
            </div>
          </div>

          {/* Indikator Alur Langkah */}
          <div className="inline-flex items-center gap-2.5 sm:gap-4 md:gap-5 px-4 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-full border-2 sm:border-[2.5px] border-ungu-heading bg-cream-terang shadow-[0_2px_0_var(--color-ungu-heading)] select-none">
            {statusHeader.steps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-2.5 sm:gap-4 md:gap-5">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-[13px] font-black shrink-0 ${
                      step.isCompleted
                        ? "bg-dark-teal text-cream-terang"
                        : "bg-kuning-tua border-2 border-ungu-heading text-ungu-heading shadow-2xs"
                    }`}
                  >
                    {step.isCompleted ? "\u2713" : idx + 1}
                  </span>
                  <span
                    className={`font-dm-sans text-xs sm:text-sm md:text-[15px] text-ungu-heading whitespace-nowrap ${
                      step.isCompleted ? "font-bold" : "font-black"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {idx < statusHeader.steps.length - 1 && (
                  <span className="w-4 sm:w-7 md:w-9 h-[2px] bg-ungu-heading/30 shrink-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

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
                <span>{card.statusBadge}</span>
              </div>

              <h1 className="font-fraunces tracking-tight leading-[1.1] mb-4 sm:mb-5">
                <span className="block font-black text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] text-hijau">
                  {card.titleLine1}
                </span>
                <span className="block italic font-black text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] text-ungu-heading mt-0.5 sm:mt-1">
                  {card.titleLine2}
                </span>
              </h1>

              <p className="font-dm-sans font-normal text-sm sm:text-[15px] text-gray-custom leading-relaxed mb-6 sm:mb-8 max-w-xl">
                {card.descriptionLines.map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx < card.descriptionLines.length - 1 && (
                      <>
                        {" "}
                        <br className="hidden md:inline" />
                      </>
                    )}
                  </span>
                ))}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-xl">
                {card.metaItems.map((item) => (
                  <div
                    key={item.label}
                    className="bg-cream-tua/60 border border-ungu-heading/50 rounded-xl px-3.5 py-2.5 flex flex-col justify-center"
                  >
                    <span className="font-dm-sans font-black text-[9px] sm:text-[10px] text-ungu-heading/70 tracking-wider uppercase mb-0.5">
                      {item.label}
                    </span>
                    <span className="font-dm-sans font-bold text-xs sm:text-[13px] text-ungu-heading whitespace-nowrap">
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
                    {card.catBadge}
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
