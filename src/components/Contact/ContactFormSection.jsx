import ContactDirectForm from "./components/ContactDirectForm";
import ContactSecretariatCards from "./components/ContactSecretariatCards";

export default function ContactFormSection() {
  return (
    <section
      id="contact-form-section"
      className="w-full bg-putih-butek pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8"
      aria-label="Formulir Pertanyaan dan Informasi Sekretariat Festival"
    >
      <div className="max-w-7xl mx-auto">
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

        {/* Garis batas bawah section */}
        <div className="border-t-2 sm:border-t-[2.5px] border-ungu-heading mt-16 sm:mt-20 md:mt-24" />
      </div>
    </section>
  );
}
