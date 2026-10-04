import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import {
  FaTag,
  FaShieldHalved,
  FaClock,
  FaCheck,
  FaReceipt,
  FaArrowRight,
  FaLock,
  FaHeadphones,
  FaStar,
  FaComments,
  FaMasksTheater,
  FaXmark
} from "react-icons/fa6";

export default function Pemesanan() {
  // Ticket Data (Default quantities match user screenshot: 0 Day 1, 1 Day 2, 1 2-Day Pass)
  const [tickets, setTickets] = useState([
    {
      id: "day1",
      title: "DAY 01 PASS",
      subtitle: "HARI PERTAMA",
      date: "Jumat, 16 April 2027",
      time: "14:00 - 23:30 WIB",
      price: 175000,
      badge: "TERSEDIA",
      features: [
        "Akses 4 panggung spektakuler",
        "30 penampilan musisi Day 1"
      ],
      stubBg: "bg-[#1E564F]",
      stubText: "text-white",
      tagBg: "bg-white text-[#1E564F]",
      titleColor: "text-white",
      subtextColor: "text-[#BFE1DC]",
      qty: 0
    },
    {
      id: "day2",
      title: "DAY 02 PASS",
      subtitle: "HARI KEDUA",
      date: "Sabtu, 17 April 2027",
      time: "13:00 - 23:59 WIB",
      price: 175000,
      badge: "TERSEDIA",
      features: [
        "Akses 4 panggung utama & pesta penutup",
        "30 musisi Day 2 + Grand Finale Jam"
      ],
      stubBg: "bg-[#E68A9D]",
      stubText: "text-[#2D1822]",
      tagBg: "bg-white text-[#8C161C]",
      titleColor: "text-[#2D1822]",
      subtextColor: "text-[#4A1E2B]",
      qty: 1
    },
    {
      id: "twoday",
      title: "2-DAY PASS",
      subtitle: "AKSES PENUH 2 HARI",
      date: "16 & 17 April 2027",
      time: "Akses 2 Hari Penuh",
      price: 295000,
      originalPrice: 350000,
      discountText: "HEMAT RP 55.000",
      badge: "SISA SEDIKIT!",
      extraTag: "NILAI TERBAIK",
      features: [
        "Akses bebas 2 hari penuh ke 60 musisi & 4 panggung",
        "Fast-track lane penukaran gelang festival"
      ],
      stubBg: "bg-[#DEA038]",
      stubText: "text-[#2D1822]",
      tagBg: "bg-[#2D1822] text-white",
      titleColor: "text-[#2D1822]",
      subtextColor: "text-[#4A2B15]",
      qty: 1
    }
  ]);

  // Voucher Promo State
  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Modal State for Checkout / Customer Data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "LAKI-LAKI",
    birthDate: "",
    nik: "",
    domisili: "",
    agree: true
  });

  // Countdown Timer State (Default initialized to 14:32 as in screenshot)
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 32);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const formatRp = (num) => {
    return "Rp " + Number(num).toLocaleString("id-ID");
  };

  // Quantity Management (Max 4 tickets total)
  const totalQty = tickets.reduce((sum, t) => sum + t.qty, 0);

  const handleQtyChange = (id, delta) => {
    const target = tickets.find((t) => t.id === id);
    if (!target) return;

    if (delta > 0 && totalQty >= 4) {
      Swal.fire({
        icon: "warning",
        title: "Batas Maksimal Tercapai",
        text: "Maksimal pembelian adalah 4 tiket per transaksi.",
        confirmButtonColor: "#DEA038",
        background: "#FFFDF8",
        color: "#2D1822"
      });
      return;
    }

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newQty = Math.max(0, t.qty + delta);
          return { ...t, qty: newQty };
        }
        return t;
      })
    );
  };

  // Subtotal Calculation
  const subtotalTickets = tickets.reduce((sum, t) => sum + t.qty * t.price, 0);
  const grandTotal = Math.max(0, subtotalTickets - discountAmount);

  // Apply Promo
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === "DANSA2027" || cleanCode === "SOIREEDANSA") {
      const discount = 25000;
      setDiscountAmount(discount);
      setAppliedPromo(cleanCode);
      Swal.fire({
        icon: "success",
        title: "Voucher Berhasil Digunakan!",
        text: `Potongan ${formatRp(discount)} telah diterapkan.`,
        confirmButtonColor: "#1E564F",
        background: "#FFFDF8",
        color: "#2D1822"
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Kode Tidak Valid",
        text: "Kode promo tidak ditemukan atau sudah habis kuotanya.",
        confirmButtonColor: "#851419",
        background: "#FFFDF8",
        color: "#2D1822"
      });
    }
  };

  // Proceed to Checkout: opens customer details modal
  const handleOpenCheckoutModal = () => {
    if (totalQty === 0) {
      Swal.fire({
        icon: "warning",
        title: "Pilih Minimal 1 Tiket",
        text: "Silakan pilih minimal satu kategori tiket sebelum melanjutkan.",
        confirmButtonColor: "#DEA038",
        background: "#FFFDF8",
        color: "#2D1822"
      });
      return;
    }
    setIsModalOpen(true);
  };

  // Final Submit from Modal
  const handleFinalSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      Swal.fire({
        icon: "info",
        title: "Lengkapi Data Diri",
        text: "Harap isi nama lengkap, alamat email, dan nomor WhatsApp aktif Anda.",
        confirmButtonColor: "#1E564F",
        background: "#FFFDF8",
        color: "#2D1822"
      });
      return;
    }

    if (!formData.agree) {
      Swal.fire({
        icon: "warning",
        title: "Persetujuan Diperlukan",
        text: "Harap centang persetujuan syarat dan ketentuan.",
        confirmButtonColor: "#DEA038",
        background: "#FFFDF8",
        color: "#2D1822"
      });
      return;
    }

    setIsModalOpen(false);

    Swal.fire({
      icon: "success",
      title: "Pesanan Terkonfirmasi!",
      html: `
        <div style="text-align:left; font-size:13px; line-height:1.6; color:#2D1822;">
          <p><strong>Nama:</strong> ${formData.fullName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>WhatsApp:</strong> ${formData.phone}</p>
          <p><strong>Total Pembayaran:</strong> <span style="font-size:16px; font-weight:800; color:#1E564F;">${formatRp(grandTotal)}</span></p>
          <hr style="margin:10px 0; border:none; border-top:1px dashed #D2C7B6;"/>
          <p style="font-size:11px; color:#6B5B52;">Instruksi pembayaran resmi dan tiket elektronik akan dikirimkan ke WhatsApp Anda.</p>
        </div>
      `,
      confirmButtonText: "Buka Halaman Pembayaran",
      confirmButtonColor: "#DEA038",
      background: "#FFFDF8",
      color: "#2D1822"
    });
  };

  return (
    <>
      <Helmet>
        <title>Pemesanan Tiket Festival | Soirée Dansante Semarang 2027</title>
        <meta
          name="description"
          content="Amankan tiket resmi Soirée Dansante Semarang 2027 di PRPP Grand Maerakaca. Day 1, Day 2, dan 2-Day Pass."
        />
      </Helmet>

      {/* Main Page Container with Warm Cream Background (#F4E7CF) */}
      <div className="min-h-screen bg-[#F4E7CF] text-[#2D1822] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#DEA038] selection:text-[#2D1822]">
        
        {/* --- 1. NAVBAR / HEADER --- */}
        <header className="bg-[#244244] border-b border-black/20 text-white sticky top-0 z-50 px-4 sm:px-8 py-3 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-[#DEA038] border-2 border-[#1f3739] flex items-center justify-center text-[#2D1822] shadow">
                <FaMasksTheater className="text-sm" />
              </div>
              <div>
                <span className="font-['Fraunces',serif] font-bold text-base sm:text-lg text-[#FAF5EE] tracking-tight block leading-tight">
                  Soirée Dansante
                </span>
                <span className="text-[9px] font-extrabold tracking-widest text-[#DEA038] uppercase block">
                  Semarang 2027
                </span>
              </div>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center gap-6 font-bold text-xs tracking-wider uppercase text-white/80">
              <Link to="/" className="hover:text-[#DEA038] transition">HOME</Link>
              <Link to="/pemesanan" className="text-[#DEA038] border-b-2 border-[#DEA038] pb-0.5">TICKET</Link>
              <Link to="/cobamaps" className="hover:text-[#DEA038] transition">VENUE MAP</Link>
              <Link to="/cobamaps" className="hover:text-[#DEA038] transition">LINEUP</Link>
            </nav>

            {/* Right Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenCheckoutModal}
                className="bg-[#DEA038] hover:bg-[#D4952D] border-2 border-[#2D1822] rounded-full text-[#2D1822] font-black text-[11px] uppercase tracking-wider px-4 py-1.5 shadow-sm transition active:scale-95 cursor-pointer"
              >
                CHECKOUT ({totalQty})
              </button>
            </div>

          </div>
        </header>

        {/* --- 2. MAIN TWO-COLUMN CONTENT --- */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ========================================================= */}
            {/* LEFT COLUMN: PROMO + TICKET CATEGORIES + TRANSPARENCY (8 cols) */}
            {/* ========================================================= */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* A. PROMO / VOUCHER CODE BOX */}
              <div className="bg-[#FFFDF8] border-2 border-[#2D1822] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#2D1822] space-y-3">
                <h3 className="font-bold text-sm sm:text-base text-[#2D1822]">
                  Punya Kode Promo / Voucher Presale?
                </h3>
                <form onSubmit={handleApplyPromo} className="flex flex-col sm:flex-row items-center gap-2.5">
                  <div className="relative w-full">
                    <FaTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#968677]" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="MASUKKAN KODE PROMO (MISAL: DANSA2027)"
                      className="w-full bg-[#FAF4E8] border-2 border-[#2D1822] rounded-xl py-2.5 pl-10 pr-3 text-xs font-bold text-[#2D1822] placeholder:text-[#968677] uppercase outline-none focus:border-[#DEA038] transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 bg-[#DEA038] hover:bg-[#D4952D] border-2 border-[#2D1822] text-[#2D1822] font-black text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-[2px_2px_0px_#2D1822] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition cursor-pointer"
                  >
                    TERAPKAN
                  </button>
                </form>
                {appliedPromo && (
                  <p className="text-xs text-[#1E564F] font-bold">
                    ✓ Kode <strong>{appliedPromo}</strong> aktif! Potongan Rp 25.000 berhasil diterapkan.
                  </p>
                )}
              </div>

              {/* B. SECTION HEADER: KATEGORI TIKET MASUK */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h2 className="font-['Fraunces',serif] font-bold text-xl sm:text-2xl text-[#2D1822] tracking-tight">
                    Kategori Tiket Masuk
                  </h2>
                  <p className="text-xs text-[#6B5B52] mt-0.5">
                    Pilih tiket yang sesuai dengan hari kehadiranmu.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-[#2D1822] bg-[#FAF4E8] text-[#2D1822] text-[10px] font-black uppercase shadow-[2px_2px_0px_#2D1822]">
                  <FaShieldHalved className="text-xs text-[#1E564F]" />
                  <span>MAKS. 4 TIKET</span>
                </div>
              </div>

              {/* C. TICKET CARD 1: DAY 01 PASS */}
              <div className="relative bg-[#FFFDF8] border-[2.5px] border-[#2D1822] rounded-2xl shadow-[5px_5px_0px_#2D1822] flex flex-col sm:flex-row items-stretch">
                {/* Semicircle ticket punch cutouts on desktop divider */}
                <div className="hidden sm:block absolute -top-[2px] left-[215px] -translate-x-1/2 w-6 h-3.5 bg-[#F4E7CF] border-b-[2.5px] border-x-[2.5px] border-[#2D1822] rounded-b-full z-20 pointer-events-none" />
                <div className="hidden sm:block absolute -bottom-[2px] left-[215px] -translate-x-1/2 w-6 h-3.5 bg-[#F4E7CF] border-t-[2.5px] border-x-[2.5px] border-[#2D1822] rounded-t-full z-20 pointer-events-none" />

                {/* Left Ticket Stub (Dark Pine Teal) */}
                <div className="w-full sm:w-[215px] shrink-0 p-4 sm:p-5 flex flex-col justify-between bg-[#1B5E56] text-white border-b-2 sm:border-b-0 sm:border-r-2 sm:border-dashed border-[#2D1822] rounded-t-[13px] sm:rounded-l-[13px] sm:rounded-tr-none space-y-2.5 relative z-10">
                  <span className="inline-block bg-[#FFFDF8] text-[#2D1822] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full w-max">
                    HARI PERTAMA
                  </span>
                  <div className="py-0.5">
                    <h3 className="font-['Fraunces',serif] font-black text-xl sm:text-2xl text-[#FAF3E0] uppercase tracking-tight leading-none whitespace-nowrap">
                      DAY 01 PASS
                    </h3>
                    <p className="text-xs text-[#B6DCD6] font-medium mt-1">
                      Jumat, 16 April 2027
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#B6DCD6] font-medium">
                    <FaClock className="text-xs" />
                    <span>14:00 - 23:30 WIB</span>
                  </div>
                </div>

                {/* Middle & Right Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-[#FFFDF8] rounded-b-[13px] sm:rounded-r-[13px] sm:rounded-bl-none min-w-0">
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-2 flex-nowrap">
                      <span className="font-['Fraunces',serif] font-black text-2xl sm:text-[26px] text-[#2D1822] tracking-tight leading-none whitespace-nowrap">
                        Rp 175.000
                      </span>
                      <span className="bg-[#E1ECE8] text-[#1E5E58] border border-[#A8CBC2] text-[10px] sm:text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider whitespace-nowrap">
                        TERSEDIA
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-[13px] text-[#2D1822] font-medium">
                      <li className="flex items-center gap-2">
                        <FaCheck className="text-xs text-[#1E5E58] shrink-0" />
                        <span>Akses 4 panggung spektakuler</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheck className="text-xs text-[#1E5E58] shrink-0" />
                        <span>30 penampilan musisi Day 1</span>
                      </li>
                    </ul>
                  </div>

                  {/* Quantity Counter Pill */}
                  <div className="w-[115px] sm:w-[125px] px-4 py-2 border-[2.5px] border-[#2D1822] rounded-full bg-[#FFFDF8] shadow-[3px_3px_0px_#2D1822] flex items-center justify-between shrink-0">
                    <button
                      onClick={() => handleQtyChange("day1", -1)}
                      className="text-[#2D1822] font-black text-base select-none cursor-pointer hover:scale-125 active:scale-95 transition leading-none"
                      aria-label="Kurangi tiket"
                    >
                      −
                    </button>
                    <span className="font-bold text-sm sm:text-base text-[#2D1822] select-none font-mono">
                      {tickets[0].qty}
                    </span>
                    <button
                      onClick={() => handleQtyChange("day1", 1)}
                      className="text-[#2D1822] font-black text-base select-none cursor-pointer hover:scale-125 active:scale-95 transition leading-none"
                      aria-label="Tambah tiket"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* D. TICKET CARD 2: DAY 02 PASS */}
              <div className="relative bg-[#FFFDF8] border-[2.5px] border-[#2D1822] rounded-2xl shadow-[5px_5px_0px_#2D1822] flex flex-col sm:flex-row items-stretch">
                {/* Semicircle ticket punch cutouts on desktop divider */}
                <div className="hidden sm:block absolute -top-[2px] left-[215px] -translate-x-1/2 w-6 h-3.5 bg-[#F4E7CF] border-b-[2.5px] border-x-[2.5px] border-[#2D1822] rounded-b-full z-20 pointer-events-none" />
                <div className="hidden sm:block absolute -bottom-[2px] left-[215px] -translate-x-1/2 w-6 h-3.5 bg-[#F4E7CF] border-t-[2.5px] border-x-[2.5px] border-[#2D1822] rounded-t-full z-20 pointer-events-none" />

                {/* Left Ticket Stub (Dusty Rose Mauve) */}
                <div className="w-full sm:w-[215px] shrink-0 p-4 sm:p-5 flex flex-col justify-between bg-[#E68A9D] text-[#2D1822] border-b-2 sm:border-b-0 sm:border-r-2 sm:border-dashed border-[#2D1822] rounded-t-[13px] sm:rounded-l-[13px] sm:rounded-tr-none space-y-2.5 relative z-10">
                  <span className="inline-block bg-[#FFFDF8] text-[#2D1822] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full w-max">
                    HARI KEDUA
                  </span>
                  <div className="py-0.5">
                    <h3 className="font-['Fraunces',serif] font-black text-xl sm:text-2xl text-[#2D1822] uppercase tracking-tight leading-none whitespace-nowrap">
                      DAY 02 PASS
                    </h3>
                    <p className="text-xs text-[#4A1E2B] font-medium mt-1">
                      Sabtu, 17 April 2027
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#4A1E2B] font-medium">
                    <FaClock className="text-xs" />
                    <span>13:00 - 23:59 WIB</span>
                  </div>
                </div>

                {/* Middle & Right Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-[#FFFDF8] rounded-b-[13px] sm:rounded-r-[13px] sm:rounded-bl-none min-w-0">
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-2 flex-nowrap">
                      <span className="font-['Fraunces',serif] font-black text-2xl sm:text-[26px] text-[#2D1822] tracking-tight leading-none whitespace-nowrap">
                        Rp 175.000
                      </span>
                      <span className="bg-[#E1ECE8] text-[#1E5E58] border border-[#A8CBC2] text-[10px] sm:text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider whitespace-nowrap">
                        TERSEDIA
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-[13px] text-[#2D1822] font-medium">
                      <li className="flex items-center gap-2">
                        <FaCheck className="text-xs text-[#1E5E58] shrink-0" />
                        <span>Akses 4 panggung utama & pesta penutup</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheck className="text-xs text-[#1E5E58] shrink-0" />
                        <span>30 musisi Day 2 + Grand Finale Jam</span>
                      </li>
                    </ul>
                  </div>

                  {/* Quantity Counter Pill */}
                  <div className="w-[115px] sm:w-[125px] px-4 py-2 border-[2.5px] border-[#2D1822] rounded-full bg-[#FFFDF8] shadow-[3px_3px_0px_#2D1822] flex items-center justify-between shrink-0">
                    <button
                      onClick={() => handleQtyChange("day2", -1)}
                      className="text-[#2D1822] font-black text-lg select-none cursor-pointer hover:scale-125 active:scale-95 transition leading-none"
                      aria-label="Kurangi tiket"
                    >
                      −
                    </button>
                    <span className="font-bold text-sm sm:text-base text-[#2D1822] select-none font-mono">
                      {tickets[1].qty}
                    </span>
                    <button
                      onClick={() => handleQtyChange("day2", 1)}
                      className="text-[#2D1822] font-black text-lg select-none cursor-pointer hover:scale-125 active:scale-95 transition leading-none"
                      aria-label="Tambah tiket"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* E. TICKET CARD 3: 2-DAY PASS (AKSES PENUH 2 HARI) */}
              <div className="relative bg-[#FFFDF8] border-[2.5px] border-[#2D1822] rounded-2xl shadow-[5px_5px_0px_#2D1822] flex flex-col sm:flex-row items-stretch">
                {/* Semicircle ticket punch cutouts on desktop divider */}
                <div className="hidden sm:block absolute -top-[2px] left-[215px] -translate-x-1/2 w-6 h-3.5 bg-[#F4E7CF] border-b-[2.5px] border-x-[2.5px] border-[#2D1822] rounded-b-full z-20 pointer-events-none" />
                <div className="hidden sm:block absolute -bottom-[2px] left-[215px] -translate-x-1/2 w-6 h-3.5 bg-[#F4E7CF] border-t-[2.5px] border-x-[2.5px] border-[#2D1822] rounded-t-full z-20 pointer-events-none" />

                {/* Left Ticket Stub (Golden Mustard Amber) */}
                <div className="w-full sm:w-[215px] shrink-0 p-4 sm:p-5 flex flex-col justify-between bg-[#DEA038] text-[#2D1822] border-b-2 sm:border-b-0 sm:border-r-2 sm:border-dashed border-[#2D1822] rounded-t-[13px] sm:rounded-l-[13px] sm:rounded-tr-none space-y-2.5 relative z-10">
                  <span className="inline-block bg-[#2D1822] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full w-max">
                    AKSES PENUH 2 HARI
                  </span>
                  <div className="py-0.5">
                    <h3 className="font-['Fraunces',serif] font-black text-xl sm:text-2xl text-[#2D1822] uppercase tracking-tight leading-none whitespace-nowrap">
                      2-DAY PASS
                    </h3>
                    <p className="text-xs text-[#4A2B15] font-semibold mt-1">
                      16 & 17 April 2027
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#4A2B15]">
                    <FaStar className="text-xs" />
                    <span>NILAI TERBAIK</span>
                  </div>
                </div>

                {/* Middle & Right Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-[#FFFDF8] rounded-b-[13px] sm:rounded-r-[13px] sm:rounded-bl-none min-w-0">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-['Fraunces',serif] font-black text-2xl sm:text-[26px] text-[#2D1822] tracking-tight leading-none whitespace-nowrap">
                        Rp 295.000
                      </span>
                      <span className="line-through text-xs text-[#8A7E76] font-semibold whitespace-nowrap">
                        Rp 350.000
                      </span>
                      <span className="bg-[#FDE8E8] text-[#C53030] border border-[#F8B4B4] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md whitespace-nowrap">
                        HEMAT RP 55.000
                      </span>
                    </div>
                    <div>
                      <span className="inline-block bg-[#851419] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
                        SISA SEDIKIT!
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-[13px] text-[#2D1822] font-medium pt-0.5">
                      <li className="flex items-center gap-2">
                        <FaCheck className="text-xs text-[#1E5E58] shrink-0" />
                        <span>Akses bebas 2 hari penuh ke 60 musisi & 4 panggung</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheck className="text-xs text-[#1E5E58] shrink-0" />
                        <span>Fast-track lane penukaran gelang festival</span>
                      </li>
                    </ul>
                  </div>

                  {/* Quantity Counter Pill */}
                  <div className="w-[115px] sm:w-[125px] px-4 py-2 border-[2.5px] border-[#2D1822] rounded-full bg-[#FFFDF8] shadow-[3px_3px_0px_#2D1822] flex items-center justify-between shrink-0">
                    <button
                      onClick={() => handleQtyChange("twoday", -1)}
                      className="text-[#2D1822] font-black text-lg select-none cursor-pointer hover:scale-125 active:scale-95 transition leading-none"
                      aria-label="Kurangi tiket"
                    >
                      −
                    </button>
                    <span className="font-bold text-sm sm:text-base text-[#2D1822] select-none font-mono">
                      {tickets[2].qty}
                    </span>
                    <button
                      onClick={() => handleQtyChange("twoday", 1)}
                      className="text-[#2D1822] font-black text-lg select-none cursor-pointer hover:scale-125 active:scale-95 transition leading-none"
                      aria-label="Tambah tiket"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* F. TRANSPARENCY NOTICE BANNER */}
              <div className="bg-[#FAF5E8] border-2 border-[#2D1822] rounded-xl p-3 sm:p-3.5 flex items-center gap-3 shadow-[3px_3px_0px_#2D1822] text-xs text-[#2D1822]">
                <FaShieldHalved className="text-base text-[#1E564F] shrink-0" />
                <p className="leading-relaxed">
                  <strong>Transparansi Penuh:</strong> Pajak hiburan & biaya platform/admin sudah termasuk di harga tiket. Maksimal 4 tiket per transaksi.
                </p>
              </div>

            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: STICKY ORDER SUMMARY (4 cols - slightly reduced) */}
            {/* ========================================================= */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-20 bg-[#FFFDF8] border-2 border-[#2D1822] rounded-2xl p-4 sm:p-5 shadow-[5px_5px_0px_#2D1822] space-y-3.5">
                
                {/* Header with Timer Badge */}
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2 text-[#2D1822]">
                    <FaReceipt className="text-base text-[#1E564F]" />
                    <h3 className="font-bold text-sm sm:text-base">
                      Ringkasan Pesanan
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#2D1822] bg-[#FAF4E8] text-xs font-mono font-bold text-[#8C161C]">
                    <FaClock className="text-xs" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </div>

                {/* Selected Tickets Breakdown */}
                <div className="space-y-1.5 pt-1 text-xs">
                  <span className="font-extrabold uppercase text-[10px] text-[#8A7E76] tracking-wider block mb-1">
                    TIKET TERPILIH
                  </span>
                  
                  {tickets.filter((t) => t.qty > 0).length === 0 ? (
                    <p className="text-xs text-[#8A7E76] italic py-1">
                      Belum ada tiket yang dipilih.
                    </p>
                  ) : (
                    tickets
                      .filter((t) => t.qty > 0)
                      .map((ticket) => (
                        <div key={ticket.id} className="flex justify-between items-center text-[#2D1822] font-semibold text-xs">
                          <span>
                            {ticket.qty}x {ticket.id === "day1" ? "Day 01 Pass" : ticket.id === "day2" ? "Day 02 Pass" : "2-Day Pass (Terbaik)"}
                          </span>
                          <span className="font-bold font-mono">
                            {formatRp(ticket.price * ticket.qty)}
                          </span>
                        </div>
                      ))
                  )}

                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-[#1E564F] font-bold pt-1 text-xs">
                      <span>Diskon Promo ({appliedPromo})</span>
                      <span className="font-mono">-{formatRp(discountAmount)}</span>
                    </div>
                  )}
                </div>

                {/* Subtotal & Fees */}
                <div className="space-y-1 pt-2.5 border-t-2 border-dashed border-[#D2C7B6] text-xs text-[#52443C]">
                  <div className="flex justify-between">
                    <span>Subtotal Tiket</span>
                    <span className="font-bold text-[#2D1822] font-mono">{formatRp(subtotalTickets)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak & Biaya Layanan</span>
                    <span className="font-bold text-[#1E564F]">Termasuk (Rp 0)</span>
                  </div>
                </div>

                {/* Big Total Price Display */}
                <div className="pt-1.5 flex items-end justify-between">
                  <div>
                    <span className="font-extrabold text-[10px] text-[#8A7E76] uppercase tracking-wider block">
                      TOTAL PEMBAYARAN
                    </span>
                    <span className="text-[10px] text-[#8A7E76] block leading-tight mt-0.5">
                      Sudah bersih tanpa<br />biaya tersembunyi
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-['Fraunces',serif] font-bold text-xl text-[#2D1822] block leading-tight">
                      Rp
                    </span>
                    <span className="font-['Fraunces',serif] font-black text-3xl sm:text-4xl text-[#2D1822] leading-none tracking-tight block">
                      {Number(grandTotal).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Big Action CTA Button */}
                <button
                  onClick={handleOpenCheckoutModal}
                  className="w-full py-3 px-4 rounded-full bg-[#DEA038] hover:bg-[#D4952D] border-2 border-[#2D1822] text-[#2D1822] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[3px_3px_0px_#2D1822] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition cursor-pointer"
                >
                  <span>LANJUT KE PEMBAYARAN</span>
                  <span className="w-5 h-5 rounded-full bg-[#2D1822] text-[#DEA038] flex items-center justify-center text-[10px]">
                    ➔
                  </span>
                </button>

                {/* Payment Methods Badges */}
                <div className="pt-0.5 text-center space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8A7E76] block">
                    METODE PEMBAYARAN RESMI
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-1 text-[10px] font-bold text-[#2D1822]">
                    <span className="px-2 py-0.5 bg-[#FAF4E8] border border-[#D2C7B6] rounded">QRIS</span>
                    <span className="px-2 py-0.5 bg-[#FAF4E8] border border-[#D2C7B6] rounded">BCA</span>
                    <span className="px-2 py-0.5 bg-[#FAF4E8] border border-[#D2C7B6] rounded">Mandiri</span>
                    <span className="px-2 py-0.5 bg-[#FAF4E8] border border-[#D2C7B6] rounded">BNI</span>
                    <span className="px-2 py-0.5 bg-[#FAF4E8] border border-[#D2C7B6] rounded">GoPay</span>
                  </div>
                  <div className="flex justify-center">
                    <span className="px-2.5 py-0.5 bg-[#FAF4E8] border border-[#D2C7B6] rounded text-[10px] font-bold text-[#2D1822]">
                      Kartu Kredit
                    </span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-3 pt-0.5 text-[10px] text-[#6B5B52] font-semibold">
                  <span className="flex items-center gap-1">
                    <FaLock className="text-[10px] text-[#1E564F]" />
                    <span>256-bit SSL</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaShieldHalved className="text-[10px] text-[#1E564F]" />
                    <span>Garansi Tiket Resmi</span>
                  </span>
                </div>

                {/* Help Box */}
                <div className="bg-[#FAF5E8] border border-[#DCD3C4] rounded-xl px-3 py-1.5 flex items-center justify-between text-xs text-[#2D1822]">
                  <span className="flex items-center gap-1.5 text-[#52443C] text-[11px]">
                    <FaHeadphones className="text-xs text-[#1E564F]" />
                    <span>Butuh bantuan cepat?</span>
                  </span>
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Admin%20Soiree%20Dansante,%20saya%20butuh%20bantuan%20pemesanan%20tiket"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline text-[#1E564F] hover:text-[#DEA038] transition text-[11px]"
                  >
                    Hubungi CS
                  </a>
                </div>

              </div>
            </div>

          </div>
        </main>

        {/* --- 3. CHECKOUT CUSTOMER DATA MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#FFFDF8] border-2 border-[#2D1822] rounded-2xl w-full max-w-xl shadow-[8px_8px_0px_#2D1822] max-h-[90vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="p-5 border-b-2 border-[#2D1822] flex items-center justify-between bg-[#FAF4E8] rounded-t-[14px]">
                <div>
                  <h3 className="font-['Fraunces',serif] font-bold text-xl text-[#2D1822]">
                    Data Diri Pemesan Tiket
                  </h3>
                  <p className="text-xs text-[#6B5B52]">
                    E-tiket resmi akan dikirim langsung ke WhatsApp & Email Anda.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full border-2 border-[#2D1822] bg-white flex items-center justify-center text-sm font-bold hover:bg-[#FDE8E8] transition cursor-pointer"
                >
                  <FaXmark />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleFinalSubmit} className="p-5 space-y-4">
                {/* Full Name */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-black uppercase text-[#2D1822] tracking-wider">
                      Nama Lengkap <span className="text-red-600">*</span>
                    </label>
                    <span className="text-[10px] text-[#8A7E76] font-bold uppercase">
                      SESUAI KTP / PASPOR
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Contoh: Raden Satria Pratama"
                    className="w-full bg-[#FAF4E8] border-2 border-[#2D1822] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#2D1822] placeholder:text-[#968677] outline-none focus:border-[#DEA038] transition"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-[#2D1822] tracking-wider mb-1">
                      Alamat Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nama@domain.com"
                      className="w-full bg-[#FAF4E8] border-2 border-[#2D1822] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#2D1822] placeholder:text-[#968677] outline-none focus:border-[#DEA038] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-[#2D1822] tracking-wider mb-1">
                      No. WhatsApp <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="081234567890"
                      className="w-full bg-[#FAF4E8] border-2 border-[#2D1822] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#2D1822] placeholder:text-[#968677] outline-none focus:border-[#DEA038] transition"
                    />
                  </div>
                </div>

                {/* Gender & Birth Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-[#2D1822] tracking-wider mb-1">
                      Jenis Kelamin <span className="text-red-600">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: "LAKI-LAKI" })}
                        className={`py-2 text-xs font-black uppercase tracking-wider rounded-xl border-2 transition ${
                          formData.gender === "LAKI-LAKI"
                            ? "bg-[#DEA038] border-[#2D1822] text-[#2D1822] shadow-[2px_2px_0px_#2D1822]"
                            : "bg-[#FAF4E8] border-[#2D1822]/60 text-[#6B5B52]"
                        }`}
                      >
                        LAKI-LAKI
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: "PEREMPUAN" })}
                        className={`py-2 text-xs font-black uppercase tracking-wider rounded-xl border-2 transition ${
                          formData.gender === "PEREMPUAN"
                            ? "bg-[#DEA038] border-[#2D1822] text-[#2D1822] shadow-[2px_2px_0px_#2D1822]"
                            : "bg-[#FAF4E8] border-[#2D1822]/60 text-[#6B5B52]"
                        }`}
                      >
                        PEREMPUAN
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-[#2D1822] tracking-wider mb-1">
                      Tanggal Lahir <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full bg-[#FAF4E8] border-2 border-[#2D1822] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#2D1822] outline-none focus:border-[#DEA038] transition"
                    />
                  </div>
                </div>

                {/* NIK & Domisili */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-[#2D1822] tracking-wider mb-1">
                      NIK KTP (16 Digit)
                    </label>
                    <input
                      type="text"
                      value={formData.nik}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                      placeholder="33740xxxxxxxxxxx"
                      className="w-full bg-[#FAF4E8] border-2 border-[#2D1822] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#2D1822] placeholder:text-[#968677] outline-none focus:border-[#DEA038] transition font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-[#2D1822] tracking-wider mb-1">
                      Asal Kota / Domisili
                    </label>
                    <select
                      value={formData.domisili}
                      onChange={(e) => setFormData({ ...formData, domisili: e.target.value })}
                      className="w-full bg-[#FAF4E8] border-2 border-[#2D1822] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#2D1822] outline-none focus:border-[#DEA038] transition cursor-pointer"
                    >
                      <option value="">Pilih Domisili</option>
                      <option value="Kota Semarang">Kota Semarang</option>
                      <option value="Kab. Semarang / Salatiga">Kab. Semarang / Salatiga</option>
                      <option value="Solo / Surakarta">Solo / Surakarta</option>
                      <option value="D.I. Yogyakarta">D.I. Yogyakarta</option>
                      <option value="DKI Jakarta & Sekitarnya">DKI Jakarta & Sekitarnya</option>
                      <option value="Surabaya / Jawa Timur">Surabaya / Jawa Timur</option>
                      <option value="Bandung / Jawa Barat">Bandung / Jawa Barat</option>
                      <option value="Luar Pulau Jawa">Luar Pulau Jawa</option>
                    </select>
                  </div>
                </div>

                {/* Agreement */}
                <div className="pt-2 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="modalTerms"
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-[#2D1822] accent-[#1E564F] cursor-pointer shrink-0"
                  />
                  <label htmlFor="modalTerms" className="text-[11px] text-[#52443C] leading-relaxed cursor-pointer select-none">
                    Saya menyetujui syarat & ketentuan pemesanan tiket resmi Soirée Dansante 2027 dan mengonfirmasi data identitas sudah valid.
                  </label>
                </div>

                {/* Modal Footer CTA */}
                <div className="pt-3 border-t border-[#D2C7B6] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-[#8A7E76] font-bold uppercase block">
                      TOTAL BAYAR
                    </span>
                    <span className="font-['Fraunces',serif] font-black text-xl text-[#2D1822]">
                      {formatRp(grandTotal)}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#DEA038] hover:bg-[#D4952D] border-2 border-[#2D1822] text-[#2D1822] font-black text-xs uppercase tracking-wider py-3 px-6 rounded-full shadow-[2px_2px_0px_#2D1822] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition cursor-pointer"
                  >
                    KONFIRMASI & BAYAR SEKARANG
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </>
  );
}
