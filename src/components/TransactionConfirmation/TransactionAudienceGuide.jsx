import { LuInfo, LuScrollText } from "react-icons/lu";
import ribbonArt from "../../assets/soiree-dansante-assets/objects/09-pita-papan-catur.png";

// Panduan penonton: syarat & ketentuan event yang dibeli (event.syarat dari organizer)
export default function TransactionAudienceGuide({ event }) {
  if (!event?.syarat) return null;

  return (
    <section
      id="audience-guide"
      className="w-full bg-putih-butek pt-8 sm:pt-10 md:pt-12 pb-14 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8"
      aria-label="Panduan Penting Penonton"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-hijau mb-1.5">
              <LuInfo className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" aria-hidden="true" />
              <span className="font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase">
                INFORMASI HARI-H &amp; SYARAT MASUK
              </span>
            </div>
            <h2 className="font-fraunces font-black text-[26px] sm:text-[32px] md:text-[38px] text-ungu-heading tracking-tight leading-tight">
              Panduan Penting Penonton
            </h2>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 sm:px-4.5 py-2 rounded-full border-2 border-ungu-heading bg-cream-terang shadow-[2px_2.5px_0_var(--color-ungu-heading)] select-none shrink-0 self-start md:self-auto">
            <img
              src={ribbonArt}
              alt=""
              aria-hidden="true"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain select-none pointer-events-none"
            />
            <span className="font-dm-sans font-black text-xs sm:text-[13px] text-ungu-heading uppercase tracking-wider">
              {event.event}
            </span>
          </div>
        </div>

        <div className="bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-6 sm:p-7 shadow-[5px_6px_0_var(--color-ungu-heading)]">
          <div className="w-11 h-11 rounded-2xl border-2 border-ungu-heading flex items-center justify-center bg-kuning-tua text-ungu-heading shadow-2xs">
            <LuScrollText className="w-5 h-5 stroke-[2.3]" aria-hidden="true" />
          </div>

          <h3 className="font-fraunces font-black text-[22px] sm:text-2xl text-ungu-heading leading-tight mt-4 sm:mt-5 mb-2.5">
            Syarat &amp; Ketentuan
          </h3>

          <div
            className="font-dm-sans text-sm sm:text-[15px] text-gray-custom leading-relaxed space-y-2"
            dangerouslySetInnerHTML={{ __html: event.syarat }}
          />
        </div>
      </div>
    </section>
  );
}
