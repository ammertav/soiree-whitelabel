import { LuClock, LuCalendar, LuMapPin, LuMusic, LuTicket } from "react-icons/lu";
import pocketWatchAsset from "../../assets/soiree-dansante-assets/objects/05-gelas-dan-jam-saku.png";
import ComingSoonHero from "../common/ComingSoonHero";

export default function RundownHero() {
  return (
    <ComingSoonHero
      id="rundown-hero"
      ariaLabel="Pemberitahuan Jadwal dan Rundown Soirée Dansante 2027"
      badgeIcon={LuClock}
      badgeText="JADWAL PENAMPILAN & TIMETABLE"
      titleMain="Jadwal Jam Berdansa"
      titleAccent="Segera Hadir"
      description="Susunan menit-per-menit setiap panggung dan sesi kolaborasi lintas genre sedang dikurasi bersama musisi penampil. Dua hari perayaan di PRPP Semarang."
      pills={[
        { icon: LuCalendar, label: "16–17 April 2027" },
        { icon: LuMapPin, label: "PRPP Semarang" },
        { icon: LuMusic, label: "4 Panggung" },
      ]}
      ctas={[{ to: "/roadmap", label: "AMANKAN TIKETMU", icon: LuTicket, primary: true }]}
      artwork={{ src: pocketWatchAsset, alt: "Ilustrasi Gelas dan Jam Saku" }}
      cardNote="Jadwal panggung resmi akan dipublikasikan lengkap menjelang hari H festival."
    />
  );
}
