import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MerchandiseHero from "../components/Merchandise/MerchandiseHero";
import MerchandiseBundleFeatured from "../components/Merchandise/MerchandiseBundleFeatured";
import MerchandiseCatalogSection from "../components/Merchandise/MerchandiseCatalogSection";
import MerchandiseFulfillmentGuide from "../components/Merchandise/MerchandiseFulfillmentGuide";

// Section disembunyikan sementara (konten pre-order/pengambilan di venue belum berlaku
// karena pembelian dialihkan ke e-commerce). Ubah ke true untuk menampilkan lagi.
const SHOW_BUNDLE_FEATURED = false;
const SHOW_FULFILLMENT_GUIDE = false;

export default function KatalogMerchandise() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Katalog Merchandise Resmi - Soirée Dansante Semarang 2027",
    "description": "Koleksi merchandise resmi Soirée Dansante Semarang 2027. Kaos, tote bag, enamel pin, dan aksesori edisi terbatas.",
    "url": "https://soireedansante.com/katalog-merchandise"
  };

  return (
    <>
      <Helmet>
        <title>Katalog Merchandise Resmi - Soirée Dansante</title>
        <meta
          name="description"
          content="Koleksi merchandise resmi Soirée Dansante Semarang 2027. Bawa pulang kenangan teatrikal dari PRPP Semarang. Kaos, tote bag, dan aksesori edisi terbatas."
        />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-cream-tua text-ungu-heading selection:bg-kuning-tua selection:text-ungu-heading">
        <Navbar />

        <main className="flex-1">
          {/* Section 1: Hero Header Cenderamata Resmi */}
          <MerchandiseHero />

          {/* Section 2: Paket Komplit: Persona Karnaval (Featured Bundle) */}
          {SHOW_BUNDLE_FEATURED && <MerchandiseBundleFeatured />}

          {/* Section 3: Katalog Produk, Filter Bar & Link Toko Resmi */}
          <MerchandiseCatalogSection />

          {/* Section 4: Panduan Pengambilan & Pengiriman */}
          {SHOW_FULFILLMENT_GUIDE && <MerchandiseFulfillmentGuide />}
        </main>

        <Footer />
      </div>
    </>
  );
}
