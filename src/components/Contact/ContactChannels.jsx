import { LuMessageSquareText, LuMail, LuCamera, LuArrowRight, LuLandmark } from "react-icons/lu";
import { TbBuildingStadium } from "react-icons/tb";
import { whatsappDisplayNumber, whatsappUrl } from "../../utils";
import { INSTAGRAM } from "../../data/socialLinks";

// Data kurasi kanal kontak dan informasi festival
const CONTACT_CHANNELS = [
  {
    id: "whatsapp",
    eyebrow: "FAST RESPONSE CS",
    title: "WhatsApp Hotline",
    primaryValue: whatsappDisplayNumber() || "Segera diumumkan",
    iconBg: "bg-kuning-tua",
    icon: <LuMessageSquareText className="w-5 h-5 stroke-[2.3]" aria-hidden="true" />,
    footerText: "Aktif 09:00 – 21:00 WIB",
    footerType: "arrow",
    href: whatsappUrl() || undefined,
    isExternal: true,
  },
  {
    id: "email",
    eyebrow: "SURAT MENYURAT",
    title: "Email Resmi",
    primaryValue: "halo@soireedansante.id",
    secondaryValue: "sponsorship@soireedansante.id",
    iconBg: "bg-pink-custom",
    icon: <LuMail className="w-5 h-5 stroke-[2.3]" aria-hidden="true" />,
    footerText: "Balasan maks 1x24 jam",
    footerType: "arrow",
    href: "mailto:halo@soireedansante.id",
    isExternal: false,
  },
  {
    id: "instagram",
    eyebrow: "KANAL VISUAL & CERITA",
    title: "Instagram Media",
    primaryValue: INSTAGRAM.handle,
    iconBg: "bg-kuning-muda",
    icon: <LuCamera className="w-5 h-5 stroke-[2.3]" aria-hidden="true" />,
    footerText: "Update Harian & DM Darurat",
    footerType: "arrow",
    href: INSTAGRAM.url,
    isExternal: true,
  },
  {
    id: "venue",
    eyebrow: "WAKTU & ARENA",
    title: "16–17 April 2027",
    primaryValue: "PRPP Grand Maerakaca",
    secondaryValue: "Kota Semarang, Jawa Tengah",
    iconBg: "bg-tosca-muda",
    icon: <TbBuildingStadium className="w-5 h-5 stroke-[2.3]" aria-hidden="true" />,
    footerText: "2 HARI NON-STOP",
    footerType: "landmark",
    href: "https://maps.google.com/?q=PRPP+Semarang",
    isExternal: true,
  },
];

function ContactChannelCard({ channel }) {
  const {
    eyebrow,
    title,
    primaryValue,
    secondaryValue,
    iconBg,
    icon,
    footerText,
    footerType,
    href,
    isExternal,
  } = channel;

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-6 sm:p-7 shadow-[5px_6px_0_var(--color-ungu-heading)] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_7.5px_0_var(--color-ungu-heading)] text-left"
    >
      <div>
        {/* Ikon Bulat */}
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-ungu-heading ${iconBg} text-ungu-heading flex items-center justify-center shadow-2xs mb-5 sm:mb-6 select-none`}
        >
          {icon}
        </div>

        {/* Eyebrow Label */}
        <span className="block font-dm-sans font-black text-[11px] sm:text-xs tracking-[0.14em] uppercase text-hijau mb-2 select-none">
          {eyebrow}
        </span>

        {/* Judul Utama */}
        <h3 className="font-fraunces font-black text-2xl sm:text-[26px] text-ungu-heading leading-tight tracking-tight mb-2.5">
          {title}
        </h3>

        {/* Nilai Utama & Sekunder */}
        <div className="space-y-0.5">
          <p
            className={`font-dm-sans text-ungu-heading leading-snug ${
              secondaryValue
                ? "font-bold text-sm sm:text-[15px]"
                : "font-black text-base sm:text-[17px]"
            }`}
          >
            {primaryValue}
          </p>
          {secondaryValue && (
            <p className="font-dm-sans font-normal text-xs sm:text-[13px] text-gray-custom leading-normal">
              {secondaryValue}
            </p>
          )}
        </div>
      </div>

      {/* Bagian Bawah: Divider & Info Footer */}
      <div className="border-t border-ungu-heading/20 pt-4 mt-6 sm:mt-8 flex items-center justify-between text-xs sm:text-[13px] font-dm-sans select-none">
        {footerType === "landmark" ? (
          <>
            <span className="font-black text-xs sm:text-[12px] text-hijau uppercase tracking-wider">
              {footerText}
            </span>
            <LuLandmark className="w-4 h-4 text-hijau stroke-[2.3]" aria-hidden="true" />
          </>
        ) : (
          <>
            <span className="font-normal text-gray-custom">
              {footerText}
            </span>
            <LuArrowRight className="w-4 h-4 text-ungu-heading stroke-[2.3] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </div>
    </a>
  );
}

export default function ContactChannels() {
  return (
    <section
      id="contact-channels"
      className="w-full bg-putih-butek pt-2 sm:pt-4 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8"
      aria-label="Kanal Kontak dan Informasi Festival"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch">
          {CONTACT_CHANNELS.map((channel) => (
            <ContactChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    </section>
  );
}
