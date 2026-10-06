import { useState } from "react";
import { LuMessageSquareText, LuBookOpen } from "react-icons/lu";
import FaqAccordionItem from "./components/FaqAccordionItem";

// Data pertanyaan yang sering ditanyakan (FAQ) penonton
const FAQ_ITEMS = [
  {
    id: "open-gate",
    question: "Kapan open gate dibuka dan jadwal penukaran e-voucher wristband?",
    answer:
      "Open gate panggung pertunjukan dibuka serentak pukul 13:00 WIB pada kedua hari penyelenggaraan (16–17 April 2027). Loket penukaran e-voucher fisik menjadi wristband dibuka lebih awal H-1 (15 April) pukul 10:00 – 20:00 WIB, serta hari H mulai pukul 09:00 WIB di Ticket Booth PRPP.",
  },
  {
    id: "facilities",
    question: "Apakah ada fasilitas ramah difabel, ruang laktasi, dan mushola?",
    answer:
      'Tentu. Sesuai prinsip inklusivitas "Panggung Setiap Suara", kami menyediakan Viewing Deck ramah kursi roda di tiap stage utama, jalur ramp bebas undakan, toilet khusus difabel, ruang laktasi berpendingin udara di Hall Sindoro, serta 3 titik mushola berkapasitas besar lengkap dengan fasilitas wudhu terpisah.',
  },
  {
    id: "rules-belongings",
    question: "Apakah diperbolehkan membawa kamera profesional, makanan, atau botol minum?",
    answer:
      "Kamera DSLR/Mirrorless dengan lensa tele/lepas-pasang memerlukan Media Accreditation resmi. Anda diperkenankan membawa tumbler kosong pribadi; kami menyediakan water refill station gratis di berbagai sudut. Makanan dan minuman luar tidak diperkenankan demi kelancaran tenant UMKM festival.",
  },
  {
    id: "lost-ticket",
    question: "Siapa yang dapat saya hubungi jika tiket saya hilang atau belum masuk email?",
    answer:
      "Segera hubungi tim Ticketing Care lewat WhatsApp Hotline di +62 812–3456–7890 dengan melampirkan bukti transfer dan nomor identitas KTP/Paspor, atau datangi Helpdesk Resmi di Pintu Gerbang PRPP pada jam operasional.",
  },
];

export default function ContactFaqSection() {
  // Semua item terbuka secara default sesuai gambar referensi
  const [openItems, setOpenItems] = useState({
    "open-gate": true,
    facilities: true,
    "rules-belongings": true,
    "lost-ticket": true,
  });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="contact-faq-section"
      className="w-full bg-putih-butek pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-ungu-heading"
      aria-label="Tanya Jawab Cepat Hal Lazim yang Sering Ditanyakan Penonton"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          {/* Badge Tanya Jawab Cepat */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-ungu-heading bg-cream-terang text-ungu-heading select-none mb-4 sm:mb-5 shadow-2xs">
            <LuMessageSquareText className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
            <span className="font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase">
              TANYA JAWAB CEPAT
            </span>
          </div>

          {/* Judul Utama */}
          <h2 className="font-fraunces font-black text-3xl sm:text-4xl md:text-[52px] text-ungu-heading leading-[1.12] tracking-tight max-w-2xl mb-3.5 sm:mb-4">
            Hal Lazim yang Sering <br />
            Ditanyakan Penonton
          </h2>

          {/* Deskripsi */}
          <p className="font-dm-sans font-normal text-sm sm:text-base text-gray-custom max-w-xl leading-relaxed">
            Sebelum mengirim formulir, temukan jawaban seketika mengenai pertanyaan teknis
            kunjungan di bawah ini.
          </p>
        </div>

        {/* Daftar Kartu Accordion FAQ */}
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto">
          {FAQ_ITEMS.map((item) => (
            <FaqAccordionItem
              key={item.id}
              item={item}
              isOpen={!!openItems[item.id]}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>

        {/* Bagian Bawah: Ajakan Membaca FAQ Lengkap */}
        <div className="flex flex-col items-center text-center mt-8 sm:mt-12">
          <p className="font-dm-sans font-normal text-xs sm:text-sm text-gray-custom mb-3.5 sm:mb-4">
            Masih butuh jawaban mendalam mengenai tata tertib dan pengembalian dana?
          </p>

          <a
            href="#contact-channels"
            className="inline-flex items-center gap-2.5 bg-cream-terang hover:bg-white active:translate-x-0.5 active:translate-y-0.5 text-ungu-heading border-2 border-ungu-heading rounded-full px-6 sm:px-7 py-3 font-dm-sans font-black text-xs sm:text-[13px] tracking-wider uppercase shadow-[3px_3px_0_var(--color-ungu-heading)] active:shadow-[1px_1px_0_var(--color-ungu-heading)] transition-all cursor-pointer select-none"
          >
            <LuBookOpen className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            <span>BACA TANYA JAWAB (FAQ) LENGKAP</span>
          </a>
        </div>

        {/* Garis Batas Bawah Section */}
        <div className="border-t-2 sm:border-t-[2.5px] border-ungu-heading mt-16 sm:mt-20 md:mt-24" />
      </div>
    </section>
  );
}
