import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionDivider from "../components/SectionDivider";
import catMirror from "../assets/soiree-dansante-assets/objects/02-kucing-bercermin.png";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Halaman Tidak Ditemukan - Soirée Dansante</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-putih-butek text-ungu-heading selection:bg-kuning-tua selection:text-ungu-heading">
        <Navbar />

        <main className="flex-1 flex flex-col">
          <section className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
            <div className="max-w-lg w-full bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-6 sm:p-9 shadow-[5px_6px_0_var(--color-ungu-heading)] flex flex-col items-center text-center">
              <img
                src={catMirror}
                alt="Ilustrasi Kucing Bercermin"
                className="w-32 sm:w-40 h-auto object-contain select-none pointer-events-none"
              />
              <span className="mt-4 inline-block px-4 py-1 rounded-full bg-kuning-tua border-2 border-ungu-heading font-dm-sans font-black text-xs tracking-wider uppercase shadow-[2px_2px_0_var(--color-ungu-heading)]">
                404
              </span>
              <h1 className="mt-4 font-fraunces font-black text-3xl sm:text-4xl text-ungu-heading leading-tight">
                Panggung Ini Kosong
              </h1>
              <p className="mt-3 font-dm-sans text-sm sm:text-[15px] text-gray-custom leading-relaxed">
                Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-kuning-tua hover:bg-kuning-muda border-2 border-ungu-heading font-dm-sans font-black text-xs uppercase tracking-wider shadow-[3px_3px_0_var(--color-ungu-heading)] transition-all"
                >
                  Kembali ke Beranda
                </Link>
                <Link
                  to="/roadmap"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream-terang hover:bg-cream-tua border-2 border-ungu-heading font-dm-sans font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Lihat Roadmap Event
                </Link>
              </div>
            </div>
          </section>

          <SectionDivider />
        </main>

        <Footer />
      </div>
    </>
  );
}
