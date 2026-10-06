import { LuInfo, LuClock, LuIdCard, LuFastForward, LuCircleCheck } from "react-icons/lu";
import ribbonArt from "../../assets/soiree-dansante-assets/objects/09-pita-papan-catur.png";

// Data konstan panduan penonton
const AUDIENCE_GUIDE_DATA = {
  header: {
    badge: "INFORMASI HARI-H & PENUKARAN GELANG",
    title: "Panduan Penting Penonton",
    pillBadge: "PETUNJUK RESMI PENONTON 2027",
  },
  cards: [
    {
      id: "jadwal-penukaran",
      title: "Jadwal Penukaran Wristband",
      description:
        "Hindari antrean panjang pada hari acara! Penukaran dilayani di Ticket Booth Area PRPP Grand Maerakaca:",
      icon: <LuClock className="w-5 h-5 stroke-[2.3]" aria-hidden="true" />,
      iconBg: "bg-kuning-tua text-ungu-heading",
      type: "schedule",
      items: [
        { label: "H-1 (15 April 2027):", value: "11:00 – 20:00 WIB" },
        { label: "Hari H (16–17 April 2027):", value: "Mulai 09:00 WIB" },
      ],
      note: "Disarankan menukar pada H-1 untuk kelancaran akses panggung.",
    },
    {
      id: "syarat-dokumen",
      title: "Syarat & Dokumen Wajib",
      description:
        "Tunjukkan dokumen fisik atau digital berikut kepada petugas penukaran tiket resmi:",
      icon: <LuIdCard className="w-5 h-5 stroke-[2.3]" aria-hidden="true" />,
      iconBg: "bg-pink-custom text-ungu-heading",
      type: "checklist",
      items: [
        {
          boldText: "E-Voucher QR Code:",
          normalText: "Berkas PDF atau tampilan layar HP.",
        },
        {
          boldText: "Kartu Identitas Asli:",
          normalText: "KTP / SIM / Paspor yang sesuai nama pemesan.",
        },
        {
          boldText: "Surat kuasa bermaterai",
          normalText: "jika penukaran diwakilkan orang lain.",
        },
      ],
      note: "Satu QR code hanya berlaku untuk 1 kali penukaran wristband.",
    },
    {
      id: "jalur-khusus",
      title: "Jalur Khusus (Fast-Track)",
      description:
        "Pemegang tiket 2-Day Pass memiliki hak istimewa antrean prioritas di pintu gerbang:",
      icon: <LuFastForward className="w-5 h-5 stroke-[2.3]" aria-hidden="true" />,
      iconBg: "bg-dark-teal text-cream-terang",
      type: "bullet",
      items: [
        { text: 'Antrean terpisah khusus "Presale Fast-Track" di Gate A.' },
        { text: "Akses masuk kembali arena (re-entry) maksimal pukul 18:00 WIB." },
        { text: "Wristband tahan air dan tidak boleh dirusak selama festival." },
      ],
      note: "Gelang yang rusak atau robek dinyatakan tidak berlaku.",
    },
  ],
};

function AudienceGuideCard({ card }) {
  const { icon, iconBg, title, description, type, items, note } = card;

  return (
    <div className="bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-6 sm:p-7 shadow-[5px_6px_0_var(--color-ungu-heading)] flex flex-col justify-between">
      <div>
        <div
          className={`w-11 h-11 rounded-2xl border-2 border-ungu-heading flex items-center justify-center ${iconBg} shadow-2xs`}
        >
          {icon}
        </div>

        <h3 className="font-fraunces font-black text-[22px] sm:text-2xl text-ungu-heading leading-tight mt-4 sm:mt-5 mb-2.5">
          {title}
        </h3>

        <p className="font-dm-sans text-sm sm:text-[15px] text-gray-custom leading-relaxed mb-4">
          {description}
        </p>

        <ul className="space-y-2.5 mb-6">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-sm sm:text-[15px] font-dm-sans"
            >
              {type === "schedule" && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-hijau shrink-0 mt-2" />
                  <span className="text-gray-custom">
                    <strong className="text-ungu-heading font-black">{item.label}</strong>{" "}
                    {item.value}
                  </span>
                </>
              )}

              {type === "checklist" && (
                <>
                  <LuCircleCheck
                    className="w-4.5 h-4.5 text-ungu-heading/75 shrink-0 mt-0.5 stroke-[2.2]"
                    aria-hidden="true"
                  />
                  <span className="text-gray-custom leading-snug">
                    <strong className="text-ungu-heading font-black">{item.boldText}</strong>{" "}
                    {item.normalText}
                  </span>
                </>
              )}

              {type === "bullet" && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-kuning-tua border border-ungu-heading/40 shrink-0 mt-2" />
                  <span className="text-gray-custom leading-snug">
                    {item.text}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-cream-tua/70 border border-ungu-heading/30 rounded-xl p-3 flex items-start gap-2">
        <span className="w-1 self-stretch rounded-full bg-ungu-heading/50 shrink-0" />
        <p className="font-dm-sans text-[13px] text-gray-custom leading-snug">
          {note}
        </p>
      </div>
    </div>
  );
}

export default function TransactionAudienceGuide() {
  const { header, cards } = AUDIENCE_GUIDE_DATA;

  return (
    <section
      id="audience-guide"
      className="w-full bg-putih-butek pt-8 sm:pt-10 md:pt-12 pb-14 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8"
      aria-label="Panduan Penting Penonton Soirée Dansante"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-hijau mb-1.5">
              <LuInfo className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" aria-hidden="true" />
              <span className="font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase">
                {header.badge}
              </span>
            </div>
            <h2 className="font-fraunces font-black text-[26px] sm:text-[32px] md:text-[38px] text-ungu-heading tracking-tight leading-tight">
              {header.title}
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
              {header.pillBadge}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {cards.map((card) => (
            <AudienceGuideCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
