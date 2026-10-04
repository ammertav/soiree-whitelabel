export const TICKETS_CATALOG = [
  {
    id: "jogja-showcase",
    title: "PENTAS SENJA JOGJA",
    badgeTop: "EVENT AKTIF",
    badgeBottom: "EVENT AKTIF",
    date: "27 Maret 2027 · PKKH UGM",
    time: "16:00 – 22:00 WIB",
    theme: "teal",
    price: 45000,
    originalPrice: null,
    promoBadge: "GRATIS DG 2-DAY PASS",
    promoBadgeColor: "bg-kuning-tua text-ungu-heading border-ungu-heading",
    statusBadge: "TERSEDIA",
    features: [
      "Akses Intimate Showcase 4 musisi indie Jogja-Semarang",
      "Temu kurator & prioritas klaim merchandise pra-festival",
    ],
    defaultQty: 1,
  },
  {
    id: "roadmap-bundle",
    title: "ROADMAP BUNDLE",
    badgeTop: "★ PAKET BUNDLING HEMAT",
    subtitle: "Jogja Showcase + Festival 2 Hari",
    badgeBottom: "PALING DIMINATI",
    theme: "yellow",
    price: 320000,
    originalPrice: 395000,
    promoBadge: "HEMAT RP 75.000",
    promoBadgeColor: "bg-merah/10 text-merah border-merah/40",
    statusBadge: null,
    features: [
      "Akses penuh Pentas Senja Jogja + Official 2-Day Pass Festival",
      "Gratis poster edisi terbatas & merchandise pack presale",
    ],
    defaultQty: 1,
  },
  {
    id: "festival-2day",
    title: "2-DAY PASS FESTIVAL",
    badgeTop: "FESTIVAL UTAMA",
    date: "16 & 17 April 2027 · Semarang",
    badgeBottom: "TIKET PRESALE 1",
    theme: "cream",
    price: 295000,
    originalPrice: 350000,
    promoBadge: "SISA SEDIKIT!",
    promoBadgeColor: "bg-merah text-cream-tua border-ungu-heading",
    statusBadge: null,
    features: [
      "Akses 2 hari penuh ke 60 musisi & 4 panggung di PRPP Semarang",
      "Fast-track lane penukaran gelang festival",
    ],
    defaultQty: 0,
  },
];

export const VALID_VOUCHERS = {
  DANSA2027: {
    code: "DANSA2027",
    discountAmount: 25000,
    minPurchase: 100000,
  },
  SOIREESPECIAL: {
    code: "SOIREESPECIAL",
    discountAmount: 50000,
    minPurchase: 300000,
  },
};

export const PAYMENT_METHODS = [
  "QRIS",
  "BCA",
  "Mandiri",
  "BNI",
  "GoPay",
  "Kartu Kredit",
];

export const MAX_TICKETS_PER_TRANSACTION = 4;

export const DOMISILI_OPTIONS = [
  "D.I. Yogyakarta",
  "Jawa Tengah (Semarang, Solo, Magelang, dll)",
  "DKI Jakarta",
  "Jawa Barat (Bandung, Bogor, Bekasi, dll)",
  "Jawa Timur (Surabaya, Malang, dll)",
  "Banten",
  "Bali & Nusa Tenggara",
  "Sumatera",
  "Kalimantan",
  "Sulawesi",
  "Luar Indonesia / WNA",
];
