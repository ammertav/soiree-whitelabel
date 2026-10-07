import artCatMirror from "../assets/soiree-dansante-assets/objects/02-kucing-bercermin.png";
import artCatFlower from "../assets/soiree-dansante-assets/objects/03-tubuh-berbunga.png";
import artCatToast from "../assets/soiree-dansante-assets/objects/04-bersulang.png";
import artCatDoor from "../assets/soiree-dansante-assets/objects/06-tangga-dan-pintu.png";
import { eventPath, formatDateIndo, sortByStartTime } from "../utils";

// Artwork milestone dirotasi sesuai urutan event
const MILESTONE_ARTWORKS = [
  { src: artCatMirror, alt: "Ilustrasi Kucing Bercermin" },
  { src: artCatFlower, alt: "Ilustrasi Tubuh Berbunga" },
  { src: artCatToast, alt: "Ilustrasi Kucing Bersulang" },
  { src: artCatDoor, alt: "Ilustrasi Tangga dan Pintu Kucing" },
];

// Gaya milestone per status: event terdekat = active, sisanya = upcoming
const MILESTONE_STYLES = {
  active: {
    statusText: "AKTIF",
    statusBadgeColor: "bg-merah text-cream-terang",
    nodeBadgeColor: "bg-merah text-cream-terang",
    nodeCircleBg: "bg-kuning-tua",
    dateColor: "text-merah",
    buttonText: "LIHAT DETAIL & TIKET 🎟",
    isHighlighted: true,
  },
  upcoming: {
    statusText: "Akan Datang",
    statusBadgeColor: "bg-pink-custom text-cream-terang",
    nodeBadgeColor: "bg-pink-custom text-ungu-heading",
    nodeCircleBg: "bg-cream-terang",
    dateColor: "text-hijau",
    buttonText: "LIHAT DETAIL →",
    isHighlighted: false,
  },
};

const describeEvent = (event) => {
  const names = (event.lineups || []).map((lineup) => lineup.name);
  if (names.length === 0) return "Detail acara, penampil, dan tiket tersedia di halaman event.";
  const shown = names.slice(0, 3).join(", ");
  return names.length > 3 ? `Menampilkan ${shown}, dan ${names.length - 3} penampil lainnya.` : `Menampilkan ${shown}.`;
};

/**
 * Milestone timeline roadmap dari event aktif backend (/newest).
 * Urut dari tanggal terdekat; kartu & artwork bergantian kiri-kanan.
 */
export const toRoadmapMilestones = (events = []) =>
  sortByStartTime(events).map((event, index) => {
    const statusType = index === 0 ? "active" : "upcoming";
    const number = String(index + 1).padStart(2, "0");
    const artwork = MILESTONE_ARTWORKS[index % MILESTONE_ARTWORKS.length];
    const date = formatDateIndo(event.start_time, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    });

    return {
      id: event.id,
      position: index + 1,
      number,
      badgeLabel: statusType === "active" ? `${number} - AKTIF` : number,
      hasCheckmark: false,
      statusType,
      ...MILESTONE_STYLES[statusType],
      title: event.event,
      dateVenue: `${date} · ${event.location}${event.city ? `, ${event.city}` : ""}`,
      description: describeEvent(event),
      buttonLink: eventPath(event),
      artwork: artwork.src,
      artworkAlt: `${artwork.alt} - ${event.event}`,
      cardPosition: index % 2 === 0 ? "left" : "right",
    };
  });
