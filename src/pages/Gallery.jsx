import { Helmet } from "react-helmet-async";
import { LuCamera, LuImage, LuVideo, LuSparkles, LuTicket } from "react-icons/lu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComingSoonHero from "../components/common/ComingSoonHero";
import cloudHeadAsset from "../assets/soiree-dansante-assets/objects/07-kepala-berawan.png";

export default function Gallery() {
  return (
    <>
      <Helmet>
        <title>Gallery - Soirée Dansante Semarang 2027</title>
        <meta
          name="description"
          content="Galeri foto dan video rangkaian event Soirée Dansante Semarang 2027. Dokumentasi momen festival segera hadir."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-putih-butek text-ungu-heading selection:bg-kuning-tua selection:text-ungu-heading">
        <Navbar />

        <main className="flex-1 flex flex-col justify-center">
          <ComingSoonHero
            id="gallery-coming-soon"
            ariaLabel="Pemberitahuan Galeri Soirée Dansante 2027"
            badgeIcon={LuCamera}
            badgeText="GALERI FOTO & VIDEO"
            titleMain="Galeri Momen Dansa"
            titleAccent="Segera Hadir"
            description="Dokumentasi foto dan video dari setiap rangkaian event hingga puncak festival di PRPP Semarang akan dikumpulkan di sini."
            pills={[
              { icon: LuImage, label: "Foto Event" },
              { icon: LuVideo, label: "Video & Aftermovie" },
              { icon: LuSparkles, label: "Momen Festival" },
            ]}
            ctas={[{ to: "/roadmap", label: "AMANKAN TIKETMU", icon: LuTicket, primary: true }]}
            artwork={{ src: cloudHeadAsset, alt: "Ilustrasi Kepala Berawan" }}
            cardNote="Galeri akan diperbarui setelah setiap rangkaian event berlangsung."
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
