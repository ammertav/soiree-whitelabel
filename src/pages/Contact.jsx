import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHero from "../components/Contact/ContactHero";
import ContactChannels from "../components/Contact/ContactChannels";
import ContactFormSection from "../components/Contact/ContactFormSection";
import ContactMapSection from "../components/Contact/ContactMapSection";
import ContactFaqSection from "../components/Contact/ContactFaqSection";

export default function Contact() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Hubungi Kami - Soirée Dansante",
    "description": "Pusat informasi dan bantuan penonton Soirée Dansante Semarang 2027. Hubungi penyelenggara seputar tiket, aksesibilitas panggung, kemitraan sponsor, dan penukaran wristband.",
    "url": "https://soireedansante.com/contact"
  };

  return (
    <>
      <Helmet>
        <title>Hubungi Kami - Soirée Dansante</title>
        <meta
          name="description"
          content="Ada pertanyaan seputar tiket, aksesibilitas panggung, kemitraan sponsor, peliputan pers, atau penukaran wristband? Kami siap mendengar setiap suara."
        />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-putih-butek text-ungu-heading selection:bg-kuning-tua selection:text-ungu-heading">
        <Navbar />

        <main className="flex-1">
          {/* Section 1: Hero Hubungi Penyelenggara */}
          <ContactHero />

          {/* Section 2: Kanal Kontak & Informasi Festival */}
          <ContactChannels />

          {/* Section 3: Formulir Pesan Langsung & Posko Penyelenggara */}
          <ContactFormSection />

          {/* Section 4: Denah Venue & Panduan Rute Kedatangan PRPP */}
          <ContactMapSection />

          {/* Section 5: Tanya Jawab Cepat (FAQ) Penonton */}
          <ContactFaqSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
