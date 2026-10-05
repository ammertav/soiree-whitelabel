import { Link } from "react-router-dom";
import logoNavbar from "../assets/images/navbar/logo-navbar.png";

export default function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://tiktok.com",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="4" />
          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: "Community",
      href: "#community",
      icon: <span className="font-dm-sans font-black text-sm">#</span>,
    },
    {
      name: "Group",
      href: "#group",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative w-full bg-hijau-butek text-cream-tua overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Content Row: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pt-12 pb-10 items-start">
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logoNavbar}
                alt="Soirée Dansante"
                className="w-10 h-10 object-contain shrink-0 group-hover:scale-105 transition-transform"
              />
              <span className="font-fraunces font-bold text-xl sm:text-2xl text-cream-tua tracking-tight">
                Soirée Dansante
              </span>
            </Link>

            <p className="font-fraunces italic font-medium text-lg sm:text-xl text-cream-tua mt-3 mb-4">
              “Setiap suara punya tempat.”
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-tua border-2 border-ungu-heading shadow-[2px_3px_0_var(--color-ungu-heading)]">
              {/* Outline calendar icon */}
              <svg
                className="w-3.5 h-3.5 text-ungu-heading shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="font-dm-sans font-black text-[10px] sm:text-xs text-ungu-heading uppercase tracking-wider">
                16–17 APRIL 2027 • PRPP SEMARANG
              </span>
            </div>
          </div>

          {/* Column 2: Follow Our Social Networks */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h4 className="font-dm-sans font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-cream-tua/90 mb-3.5">
              FOLLOW OUR SOCIAL NETWORKS
            </h4>

            {/* 5 Social Buttons */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-ungu-heading bg-cream-tua text-ungu-heading flex items-center justify-center shadow-[2px_2px_0_var(--color-ungu-heading)] hover:bg-cream-tengah hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <p className="font-dm-sans text-xs text-cream-tua/80 mt-3.5 leading-relaxed max-w-xs">
              Bergabunglah bersama ribuan kawan dansa di panggung kebanggaan Jawa Tengah.
            </p>
          </div>

          {/* Column 3: Pusat Bantuan & Legal */}
          <div className="md:col-span-3 flex flex-col items-start md:items-start">
            <h4 className="font-dm-sans font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-cream-tua/90 mb-3.5">
              PUSAT BANTUAN &amp; LEGAL
            </h4>

            <div className="flex flex-col gap-1.5 font-dm-sans text-xs sm:text-sm text-cream-tua/90 font-medium">
              <Link
                to="/faq"
                className="hover:text-kuning-tua transition-colors py-0.5"
              >
                FAQ &amp; Panduan Penonton
              </Link>
              <Link
                to="/terms"
                className="hover:text-kuning-tua transition-colors py-0.5"
              >
                Syarat &amp; Ketentuan
              </Link>
              <Link
                to="/privacy"
                className="hover:text-kuning-tua transition-colors py-0.5"
              >
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream-tua/20 pt-6 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-dm-sans text-xs text-cream-tua/75 text-center sm:text-left">
            © 2027 Soirée Dansante. Hak cipta dilindungi undang-undang.
          </p>

        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        type="button"
        aria-label="Bantuan Chat"
        onClick={() => window.open("https://wa.me/6282227781913", "_blank")}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border-2 border-ungu-heading bg-hijau text-cream-tua flex items-center justify-center shadow-[3px_4px_0_var(--color-ungu-heading)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        <svg
          className="w-5 h-5 text-cream-tua"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="13" x2="14" y2="13" />
        </svg>
      </button>
    </footer>
  );
}