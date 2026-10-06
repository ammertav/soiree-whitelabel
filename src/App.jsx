import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Event = lazy(() => import("./pages/Event"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Transaction = lazy(() => import("./pages/Transaction"));
const CobaMaps = lazy(() => import("./pages/CobaMaps"));
const Pemesanan = lazy(() => import("./pages/Pemesanan"));
const Lineup = lazy(() => import("./pages/Lineup"));
const KatalogMerchandise = lazy(() => import("./pages/KatalogMerchandise"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Contact = lazy(() => import("./pages/Contact"));
const KonfirmasiTransaksi = lazy(() => import("./pages/KonfirmasiTransaksi"));
const Rundown = lazy(() => import("./pages/Rundown"));

function App() {
  return (
    <Suspense fallback={<div className="flex min-h-screen  bg-black text-[#FF0000] items-center justify-center font-headline uppercase tracking-widest animate-pulse">Initializing Interface...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/rundown" element={<Rundown />} />
        <Route path="/lineup" element={<Lineup />} />
        <Route path="/katalog-merchandise" element={<KatalogMerchandise />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/konfirmasi-transaksi" element={<KonfirmasiTransaksi />} />
        <Route path="/events" element={<Event />} />
        <Route path="/event/:id/:slug" element={<EventDetail />} />
        <Route path="/transaction/:transactionId/:no_order" element={<Transaction />} />
        <Route path="/cobamaps" element={<CobaMaps />} />
        <Route path="/pemesanan" element={<Pemesanan />} />
      </Routes>
    </Suspense>
  );
}

export default App;
