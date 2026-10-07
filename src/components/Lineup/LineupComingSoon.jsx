import { LuMic, LuUsers, LuCalendar, LuMusic, LuTicket } from "react-icons/lu";
import catStageAsset from "../../assets/soiree-dansante-assets/objects/01-panggung-kepala-kucing.png";
import ComingSoonHero from "../common/ComingSoonHero";

export default function LineupComingSoon() {
  return (
    <ComingSoonHero
      id="lineup-coming-soon"
      ariaLabel="Pemberitahuan Line Up Penampil Soirée Dansante 2027"
      badgeIcon={LuMic}
      badgeText="LINE UP & PENAMPIL"
      titleMain="Barisan Penampil"
      titleAccent="Segera Diumumkan"
      description="60 band dari Semarang, Jawa Tengah, dan nasional sedang dikurasi untuk dua hari perayaan di PRPP Semarang. Daftar resmi penampil akan diumumkan secara bertahap."
      pills={[
        { icon: LuUsers, label: "60 Band" },
        { icon: LuCalendar, label: "2 Hari" },
        { icon: LuMusic, label: "4 Panggung" },
      ]}
      ctas={[{ to: "/roadmap", label: "AMANKAN TIKETMU", icon: LuTicket, primary: true }]}
      artwork={{ src: catStageAsset, alt: "Ilustrasi Panggung Kepala Kucing" }}
      cardNote="Pengumuman penampil resmi akan dirilis bertahap melalui Instagram Soirée Dansante."
    />
  );
}
