import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "./components/common/ScrollToTop";
import SpotifyMiniPlayer from "./components/common/SpotifyMiniPlayer";

const Home = lazy(() => import("./pages/Home"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Transaction = lazy(() => import("./pages/Transaction"));
const CobaMaps = lazy(() => import("./pages/CobaMaps"));
const Lineup = lazy(() => import("./pages/Lineup"));
const KatalogMerchandise = lazy(() => import("./pages/KatalogMerchandise"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Contact = lazy(() => import("./pages/Contact"));
const TransactionConfirmation = lazy(() => import("./pages/TransactionConfirmation"));
const Rundown = lazy(() => import("./pages/Rundown"));
const Gallery = lazy(() => import("./pages/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Tampilan sementara saat halaman (lazy) sedang dimuat
function PageLoader() {
  return (
    <div className="flex flex-col min-h-screen bg-hijau-butek items-center justify-center gap-3 px-4 text-center">
      <span className="font-fraunces font-black text-4xl sm:text-5xl text-kuning-tua tracking-tight [text-shadow:3px_3px_0_var(--color-ungu-heading)]">
        Soirée Dansante
      </span>
      <span className="font-dm-sans font-bold text-xs sm:text-sm tracking-[0.2em] uppercase text-cream-tua animate-pulse">
        Memuat panggung...
      </span>
    </div>
  );
}

function App() {
  return (
    <>
    <ScrollToTop />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/rundown" element={<Rundown />} />
        <Route path="/lineup" element={<Lineup />} />
        <Route path="/katalog-merchandise" element={<KatalogMerchandise />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Navigate to="/roadmap" replace />} />
        <Route path="/event/:id/:slug" element={<EventDetail />} />
        <Route path="/transaction/:transactionId/:no_order" element={<Transaction />} />
        <Route path="/transaction/:transactionId/:no_order/confirmation" element={<TransactionConfirmation />} />
        <Route path="/cobamaps" element={<CobaMaps />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <SpotifyMiniPlayer />
    </>
  );
}

export default App;
