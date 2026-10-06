import ContactDirectForm from "./components/ContactDirectForm";
import ContactSecretariatCards from "./components/ContactSecretariatCards";
import SectionDivider from "../SectionDivider";

export default function ContactFormSection() {
  return (
    <section
      id="contact-form-section"
      className="w-full bg-putih-butek"
      aria-label="Formulir Pertanyaan dan Informasi Sekretariat Festival"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Kolom Kiri: Formulir Kontak Langsung */}
          <div className="lg:col-span-7">
            <ContactDirectForm />
          </div>

          {/* Kolom Kanan: Posko Penyelenggara & Kartu Ruang Aman */}
          <div className="lg:col-span-5">
            <ContactSecretariatCards />
          </div>
        </div>
      </div>

      {/* Pemisah checkerboard bawah section (edge-to-edge) */}
      <SectionDivider />
    </section>
  );
}
