import { useState, useEffect } from "react";

// Target pembukaan festival Soirée Dansante: 16 April 2027 13:00 WIB
const FESTIVAL_TARGET_TIME = new Date("2027-04-16T13:00:00+07:00").getTime();

export default function RundownCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = Math.max(0, FESTIVAL_TARGET_TIME - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.max(0, FESTIVAL_TARGET_TIME - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownUnits = [
    { label: "HARI", value: timeLeft.days },
    { label: "JAM", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "MENIT", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "DETIK", value: String(timeLeft.seconds).padStart(2, "0") },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-2 sm:mb-2.5">
        <span className="font-dm-sans font-bold text-[10px] sm:text-xs tracking-wider uppercase text-ungu-heading/80">
          HITUNG MUNDUR MENUJU GERBANG DIBUKA
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-sm mx-auto">
        {countdownUnits.map((unit) => (
          <div
            key={unit.label}
            className="bg-white border-2 border-ungu-heading rounded-xl sm:rounded-2xl py-2 px-1 sm:py-2.5 sm:px-2 text-center shadow-[2px_2px_0_var(--color-ungu-heading)] select-none flex flex-col items-center justify-center"
          >
            <span className="font-fraunces font-black text-xl sm:text-2xl md:text-3xl text-ungu-heading leading-none mb-1">
              {unit.value}
            </span>
            <span className="font-dm-sans font-black text-[9px] sm:text-[10px] text-hijau tracking-wider uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
