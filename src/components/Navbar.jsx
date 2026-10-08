import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import soireeLogo from "../assets/images/navbar/soiree-logo.png";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ROADMAP", path: "/roadmap" },
    { name: "RUNDOWN", path: "/rundown" },
    { name: "LINEUP", path: "/lineup" },
    { name: "MERCHANDISE", path: "/katalog-merchandise" },
    { name: "GALLERY", path: "/gallery" },
    { name: "CONTACT US", path: "/contact" },
  ];

  // Klik link ke halaman yang sedang dibuka: path tidak berubah, jadi gulir ke atas manual
  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const checkIsActive = (linkPath) => {
    if (linkPath === "/") return location.pathname === "/";
    if (linkPath === "/katalog-merchandise") {
      return location.pathname.startsWith("/katalog-merchandise") || location.pathname.startsWith("/merchandise");
    }
    return location.pathname.startsWith(linkPath);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-hijau-butek border-b-[3px] border-ungu-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <Link to="/" onClick={() => handleNavClick("/")} className="flex items-center group py-1.5">
          <img
            src={soireeLogo}
            alt="Soirée Dansante"
            className="h-10 sm:h-12 md:h-13 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = checkIsActive(link.path);

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`font-dm-sans font-extrabold text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-cream-tua border-b-2 border-cream-tua pb-0.5"
                    : "text-cream-tua/75 hover:text-cream-tua hover:opacity-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA Button & Avatar (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center gap-3 md:gap-4">
          <Link
            to="/roadmap"
            onClick={() => handleNavClick("/roadmap")}
            className="font-dm-sans font-black text-xs md:text-sm uppercase tracking-wider bg-kuning-tua text-ungu-heading px-5 md:px-6 py-2.5 rounded-full border-2 border-ungu-heading hover:bg-kuning-muda hover:scale-[1.02] active:scale-95 transition-all shadow-[0_2px_0_var(--color-ungu-heading)]"
          >
            AMANKAN TIKETMU
          </Link>
        </div>

        {/* Mobile Hamburger Button (Matching Image 2: Yellow Rounded Square) */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-11 h-11 rounded-2xl bg-kuning-tua border-2 border-ungu-heading shadow-[0_2px_0_var(--color-ungu-heading)] flex flex-col items-center justify-center gap-1.5 p-2.5 active:translate-y-0.5 hover:bg-kuning-muda transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <MdClose className="text-2xl text-ungu-heading" />
            ) : (
              <>
                <span className="w-5 h-0.5 bg-ungu-heading rounded-full block" />
                <span className="w-5 h-0.5 bg-ungu-heading rounded-full block" />
                <span className="w-5 h-0.5 bg-ungu-heading rounded-full block" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-hijau-butek border-t border-ungu-heading px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`font-dm-sans font-bold text-sm tracking-wider py-1.5 transition-colors ${
                    isActive
                      ? "text-cream-tua border-b-2 border-cream-tua inline-block w-fit"
                      : "text-cream-tua/80 hover:text-cream-tua"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2">
            <Link
              to="/roadmap"
              onClick={() => handleNavClick("/roadmap")}
              className="block text-center font-dm-sans font-extrabold text-sm uppercase tracking-wider bg-kuning-tua text-ungu-heading px-6 py-3 rounded-full border-2 border-ungu-heading shadow-sm"
            >
              AMANKAN TIKETMU
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
