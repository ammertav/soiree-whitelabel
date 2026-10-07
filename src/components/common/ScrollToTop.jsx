import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router tidak mengatur posisi scroll: setiap pindah halaman, kembali ke atas.
// Jika URL memuat #anchor, gulir ke elemen tersebut (setelah halaman lazy selesai dirender).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    let attempts = 0;
    const timer = setInterval(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target || ++attempts >= 20) {
        clearInterval(timer);
        if (target) target.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }, 100);

    return () => clearInterval(timer);
  }, [pathname, hash]);

  return null;
}
