import { LuTicket } from "react-icons/lu";

const STEPS = ["1. Pilih Tiket", "2. Data Diri", "3. Pembayaran"];

// Sub-header alur pemesanan: langkah sebelum `activeStep` ditandai selesai.
// activeStep > jumlah langkah = semua selesai (pembayaran lunas).
export default function TransactionStepper({ badge = "STATUS PEMESANAN", title, activeStep }) {
  return (
    <div className="w-full bg-cream-tua border-b-[2.5px] border-ungu-heading py-4 sm:py-5 md:py-6 px-4 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-hijau text-cream-tua flex items-center justify-center shrink-0 border-2 border-ungu-heading/40 shadow-xs">
            <LuTicket className="w-5 h-5 sm:w-6 sm:h-6 text-cream-tua stroke-[2.2]" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-dm-sans font-black text-xs sm:text-[13px] tracking-[0.16em] text-ungu-heading/80 uppercase leading-none mb-1.5">
              {badge}
            </span>
            <span className="font-fraunces font-black text-xl sm:text-2xl md:text-[26px] text-ungu-heading leading-tight tracking-tight">
              {title}
            </span>
          </div>
        </div>

        {/* Indikator Alur Langkah */}
        <div className="inline-flex items-center gap-2.5 sm:gap-4 md:gap-5 px-4 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-full border-2 sm:border-[2.5px] border-ungu-heading bg-cream-terang shadow-[0_2px_0_var(--color-ungu-heading)] select-none">
          {STEPS.map((label, idx) => {
            const isCompleted = idx + 1 < activeStep;
            return (
              <div key={label} className="flex items-center gap-2.5 sm:gap-4 md:gap-5">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-[13px] font-black shrink-0 ${
                      isCompleted
                        ? "bg-dark-teal text-cream-terang"
                        : "bg-kuning-tua border-2 border-ungu-heading text-ungu-heading shadow-2xs"
                    }`}
                  >
                    {isCompleted ? "✓" : idx + 1}
                  </span>
                  <span
                    className={`font-dm-sans text-xs sm:text-sm md:text-[15px] text-ungu-heading whitespace-nowrap ${
                      isCompleted ? "font-bold" : "font-black"
                    }`}
                  >
                    {label}
                  </span>
                </div>

                {idx < STEPS.length - 1 && (
                  <span className="w-4 sm:w-7 md:w-9 h-[2px] bg-ungu-heading/30 shrink-0" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
