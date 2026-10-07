import { LuCalendar, LuMapPin, LuUsers } from "react-icons/lu";
import { formatClockRange, formatDateIndo, storageUrl } from "../../utils";

// Kartu ringkas event yang dibeli (kolom kanan halaman pembayaran)
export default function PaymentEventCard({ event }) {
  if (!event) return null;

  const poster = storageUrl(event.img);
  const dateLabel = formatDateIndo(event.start_time, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });

  const rows = [
    { icon: LuUsers, label: "PENYELENGGARA", value: event.organizer },
    { icon: LuCalendar, label: "WAKTU", value: `${dateLabel} · ${formatClockRange(event.start_time, event.end_time)}` },
    { icon: LuMapPin, label: "LOKASI", value: [event.location, event.city].filter(Boolean).join(", ") },
  ].filter((row) => row.value);

  return (
    <aside className="lg:col-span-5 w-full lg:sticky lg:top-24">
      <div className="bg-cream-terang border-2 sm:border-[2.5px] border-ungu-heading rounded-3xl p-5 sm:p-6 shadow-[5px_6px_0_var(--color-ungu-heading)]">
        {poster && (
          <img
            src={poster}
            alt={`Poster ${event.event}`}
            className="w-full h-48 sm:h-56 object-cover rounded-2xl border-2 border-ungu-heading mb-5"
          />
        )}

        <span className="font-dm-sans font-black text-[10px] sm:text-[11px] tracking-wider uppercase text-ungu-heading/70">
          EVENT YANG DIPESAN
        </span>
        <h2 className="font-fraunces font-black text-2xl sm:text-[28px] text-hijau leading-tight tracking-tight mt-1 mb-4">
          {event.event}
        </h2>

        <div className="space-y-3">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 pb-3 border-b border-ungu-heading/15 last:border-b-0 last:pb-0">
              <div className="w-8 h-8 rounded-full bg-kuning-tua border-2 border-ungu-heading flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-ungu-heading stroke-[2.3]" aria-hidden="true" />
              </div>
              <div>
                <span className="block font-dm-sans font-black text-[10px] tracking-wider uppercase text-ungu-heading/60">
                  {label}
                </span>
                <span className="block font-dm-sans font-bold text-xs sm:text-[13px] text-ungu-heading leading-snug">
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
