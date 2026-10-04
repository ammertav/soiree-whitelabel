import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdCalendarToday, MdAccessTime, MdLocationOn, MdPerson, MdInfoOutline, MdTimer } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../api";
import SharingGroupCTA, { SHARING_GROUP_URL } from "../components/SharingGroupCTA";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// Dynamic form field rendering
function DynamicField({ field, value, onChange }) {
  const base = "w-full bg-[#1A1A1A] border border-white/20 rounded-none px-4 py-3 text-white focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] outline-none transition-colors";
  const label = (
    <label className="font-label text-xs tracking-widest uppercase text-white/70 block mb-2">
      {field.label} {field.is_required && <span className="text-[#FF0000]">*</span>}
    </label>
  );

  if (field.type === "select")
    return (
      <div className="space-y-2">
        {label}
        <select
          className={base}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">-- Select --</option>
          {(Array.isArray(field.options) ? field.options : []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );

  if (field.type === "textarea")
    return (
      <div className="md:col-span-2 space-y-2">
        {label}
        <textarea
          rows={3}
          className={base}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );

  if (field.type === "checkbox")
    return (
      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 accent-[#FF0000] bg-[#1A1A1A] border-white/20"
        />
        <span className="font-label text-sm uppercase tracking-wider text-white/80">{field.label}</span>
      </div>
    );

  return (
    <div className="space-y-2">
      {label}
      <input
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        className={base}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function EventDetail() {
  const { id, slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [event, setEvent] = useState(null);
  const [quantities, setQuantities] = useState({});

  // Checkout states
  const [isLoading, setIsLoading] = useState(false);
  const [guestDetails, setGuestDetails] = useState({
    name: "",
    email: "",
    phone: "",
    nik: "",
  });
  const [notes, setNotes] = useState("");
  const [ticketAnswers, setTicketAnswers] = useState({});
  const [orderAnswers, setOrderAnswers] = useState({});
  const [termsChecked, setTermsChecked] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/event/${id}/${slug}`);
        setEvent(
          data?.event
            ? { ...data.event, time: data.time, date: data.date }
            : null
        );
      } catch (error) {
        console.error("Failed to load event details", error);
      }
    };
    fetchEvent();
  }, [id, slug]);

  const updateTicket = (index, change) => {
    setQuantities(prev => {
      const current = prev[index] || 0;
      const newCount = current + change;
      return {
        ...prev,
        [index]: newCount >= 0 ? newCount : 0
      };
    });
  };

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);

  const subtotal = event?.tickets?.reduce((sum, ticket, index) => {
    return sum + (ticket.price * (quantities[index] || 0));
  }, 0) || 0;

  const grandTotal = subtotal;

  const terms = event?.terms || [];
  const perTicketFields = event?.form_fields?.filter((f) => f.scope === "per_ticket") || [];
  const perOrderFields = event?.form_fields?.filter((f) => f.scope === "per_order") || [];

  const updateTicketAnswer = useCallback((slotKey, fieldKey, value) => {
    setTicketAnswers((prev) => ({
      ...prev,
      [slotKey]: { ...prev[slotKey], [fieldKey]: value },
    }));
  }, []);

  const handleCheckout = async (e) => {
    if (e) e.preventDefault();

    if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Details",
        text: "Please provide Name, Email, and Phone Number.",
        background: "#000000",
        color: "#ffffff"
      });
      return;
    }

    const result = await Swal.fire({
      title: "CONFIRM BOOKING",
      html: `<p>Are you sure you want to book ${totalTickets} ticket(s) for a total of <strong class="text-[#FF0000]">IDR ${grandTotal.toLocaleString('id-ID')}</strong>?</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#C41A20",
      cancelButtonColor: "#333",
      confirmButtonText: "YES, PROCEED",
      cancelButtonText: "CANCEL",
      background: "#000000",
      color: "#ffffff",
      customClass: {
        title: "font-headline uppercase tracking-widest",
        confirmButton: "font-label uppercase rounded-none tracking-widest",
        cancelButton: "font-label uppercase rounded-none tracking-widest"
      }
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);
    try {
      const selectedTickets = event.tickets.map((ticket, index) => ({
        ticket_id: ticket.id,
        qty: quantities[index] || 0,
      })).filter(t => t.qty > 0);

      let formAnswersPayload = null;
      if (perTicketFields.length > 0 || perOrderFields.length > 0) {
        const checkRequired = (fields, answers) => {
          for (const f of fields) {
            if (f.is_required && f.type !== "checkbox") {
              const v = answers?.[f.field_key];
              if (v === undefined || v === null || String(v).trim() === "") return f.label;
            }
          }
          return null;
        };

        const ticketsAnswers = [];
        let missingLabel = null;

        event.tickets.forEach((ticket, index) => {
          const qty = quantities[index] || 0;
          for (let i = 0; i < qty; i++) {
            const answers = ticketAnswers[`${index}-${i}`] || {};
            if (!missingLabel && perTicketFields.length > 0) {
              missingLabel = checkRequired(perTicketFields, answers);
            }
            ticketsAnswers.push({ ticket_id: ticket.id, answers });
          }
        });

        if (!missingLabel && perOrderFields.length > 0) {
          missingLabel = checkRequired(perOrderFields, orderAnswers);
        }

        if (missingLabel) {
          Swal.fire({
            icon: "warning",
            title: `Required Field Missing`,
            text: `"${missingLabel}" must be filled out.`,
            background: "#000000",
            color: "#ffffff"
          });
          setIsLoading(false);
          return;
        }

        formAnswersPayload = { order: orderAnswers, tickets: ticketsAnswers };
      }

      const missingTerm = terms.find((t) => t.is_required && !termsChecked[t.term_key]);
      if (missingTerm) {
        Swal.fire({
          icon: "warning",
          title: "Action Required",
          text: `Please agree to: ${missingTerm.label}`,
          background: "#000000",
          color: "#ffffff"
        });
        setIsLoading(false);
        return;
      }

      const payload = {
        event_id: event.id,
        tickets: selectedTickets,
        notes,
        ...guestDetails,
        form_answers: formAnswersPayload,
        terms_accepted: terms
          .filter((t) => termsChecked[t.term_key])
          .map((t) => t.term_key),
      };

      const response = await api.post("/posttransaction", payload);
      const { transaction } = response.data;
      navigate(`/transaction/${transaction.id}/${transaction.no_order}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: error?.response?.data?.error || "Please try again.",
        background: "#000000",
        color: "#ffffff"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) {
    return (
      <main className="flex flex-col min-h-screen bg-black text-white items-center justify-center font-headline text-2xl uppercase">
        Loading Drop...
      </main>
    );
  }

  const eventName = event.event;
  const posters = [event.img, event.img2, event.img3].filter(Boolean);
  if (posters.length === 0) {
    posters.push(null);
  }

  const isEventActive = event.status === "Approve" || event.status === "ON SALE";

  // Reservasi table via WhatsApp: nomor bisnis dari env, pesan berisi detail utama event
  const waNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, "").replace(/^0/, "62");
  const eventDateLabel = event.date
    ? new Date(`${event.date}T00:00:00`).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "-";
  const reservationMessage = [
    "Halo Keenan Society, saya ingin reservasi table untuk event berikut:",
    "",
    `*${eventName}*`,
    `Tanggal: ${eventDateLabel}`,
    `Jam: ${event.time || "-"}`,
    `Venue: ${event.location || "-"}${event.city ? `, ${event.city}` : ""}`,
    `Link: ${window.location.href}`,
  ].join("\n");
  const reservationUrl = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(reservationMessage)}`
    : null;

  const plainTextDescription = event.description?.replace(/<[^>]+>/g, '').substring(0, 160) || `Buy tickets for ${eventName} at KEENAN SOCIETY.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": eventName,
    "description": plainTextDescription,
    "image": `https://keenan-society.com/keenan-logo.webp`,
    "startDate": event.date,
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.city || ""
      }
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://keenan-society.com/event/${id}/${slug}`,
      "priceCurrency": "IDR",
      "lowPrice": event.tickets?.length ? Math.min(...event.tickets.map(t => t.price)) : 0,
      "availability": isEventActive ? "https://schema.org/InStock" : "https://schema.org/SoldOut"
    }
  };

  return (
    <>
      <Helmet>
        <title>KEENAN SOCIETY: {eventName} - Event Details</title>
        <meta name="description" content={plainTextDescription} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <style>{`
          .glass-card {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .red-glow {
            box-shadow: 0 0 30px rgba(255, 0, 0, 0.15);
          }
          .btn-glow {
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
            transition: all 0.3s ease;
          }
          .btn-glow:hover {
            box-shadow: 0 0 25px rgba(255, 0, 0, 0.6);
            transform: scale(0.98);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </Helmet>

      <main className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />

        <div className="flex-grow pt-[72px]">

          {/* Hero Section */}
          <section className="relative w-full h-[70vh] min-h-[500px] flex items-end pb-16">
            <div className="absolute inset-0 z-0">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={posters.length > 1}
                allowTouchMove={posters.length > 1}
                className="w-full h-full"
              >
                {posters.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="w-full h-full object-cover"
                      alt={`${eventName} ${index + 1}`}
                      src={`https://picsum.photos/seed/${event.id || 1}${index}/1200/800`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-[#FF0000]/10 mix-blend-overlay z-10 pointer-events-none"></div>
            </div>

            <div className="w-full px-6 relative z-20">
              <div className="max-w-7xl mx-auto flex flex-col gap-6 w-full">
                <h1 className="font-headline text-5xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase">
                  KEENAN SOCIETY:<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#C41A20] drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
                    {eventName}
                  </span>
                </h1>

                <div className="flex flex-col sm:flex-row gap-6 text-white/80 font-body text-sm">
                  <div className="flex items-center gap-2">
                    <MdCalendarToday className="text-[#FF0000] text-xl" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdAccessTime className="text-[#FF0000] text-xl" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MdLocationOn className="text-[#FF0000] text-xl shrink-0 mt-0.5" />
                    <span>{event.location} {event.city && `, ${event.city}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="w-full px-6 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">

                {/* Left Column: Content */}
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-16">

                  {/* About */}
                  <div className="space-y-6">
                    <h2 className="font-headline text-2xl font-bold tracking-tighter uppercase border-l-4 border-[#FF0000] pl-4">
                      About The Drop
                    </h2>
                    <div
                      className="text-white/70 font-body space-y-4 leading-relaxed event-description"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                  </div>


                  {/* Terms */}
                  {event.syarat && (
                    <div className="space-y-6">
                      <h2 className="font-headline text-2xl font-bold tracking-tighter uppercase border-l-4 border-[#FF0000] pl-4">
                        Terms & Conditions
                      </h2>
                      <div
                        className="text-white/70 font-body space-y-4 leading-relaxed event-terms"
                        dangerouslySetInnerHTML={{ __html: event.syarat }}
                      />
                    </div>
                  )}

                  {/* --- Lineups ---
                  {event.lineups && event.lineups.length > 0 && (
                    <div className="space-y-6">
                      <h2 className="font-headline text-2xl font-bold tracking-tighter uppercase border-l-4 border-[#FF0000] pl-4">
                        The Lineup
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {event.lineups.map(dj => (
                          <div key={dj.id} className="group relative overflow-hidden rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-500 transition-colors duration-500">
                            <div className="aspect-[4/3] overflow-hidden">
                              <img 
                                src={dj.image ? `http://localhost:8000/storage/${dj.image}` : "https://placehold.co/400x400"} 
                                alt={dj.name}
                                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-6">
                              <h4 className="font-headline font-black text-2xl uppercase tracking-tight text-white group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] transition-all">
                                {dj.name}
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  */}

                  {/* --- SINGLE PAGE CHECKOUT FORM (Only visible if tickets selected) --- */}
                  <form id="checkout-form" onSubmit={handleCheckout} className="mt-12 space-y-12 animate-[fadeIn_0.5s_ease-in_forwards]">

                    {/* Contact Information */}
                    <section className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-[#C41A20]/30 pb-2">
                        <MdPerson className="text-[#FF0000] text-2xl" />
                        <h2 className="font-headline font-bold text-xl tracking-tight uppercase">Buyer Information</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-label text-xs tracking-widest uppercase text-white/70">Full Name <span className="text-[#FF0000]">*</span></label>
                          <input
                            required
                            className="w-full bg-[#1A1A1A] border border-white/20 rounded-none px-4 py-3 text-white focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] outline-none transition-colors"
                            placeholder="John Doe"
                            type="text"
                            value={guestDetails.name}
                            onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-label text-xs tracking-widest uppercase text-white/70">Email Address <span className="text-[#FF0000]">*</span></label>
                          <input
                            required
                            className="w-full bg-[#1A1A1A] border border-white/20 rounded-none px-4 py-3 text-white focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] outline-none transition-colors"
                            placeholder="john@example.com"
                            type="email"
                            value={guestDetails.email}
                            onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-label text-xs tracking-widest uppercase text-white/70">Phone Number (+62) <span className="text-[#FF0000]">*</span></label>
                          <input
                            required
                            className="w-full bg-[#1A1A1A] border border-white/20 rounded-none px-4 py-3 text-white focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] outline-none transition-colors"
                            placeholder="812-3456-7890"
                            type="tel"
                            value={guestDetails.phone}
                            onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                          />
                        </div>

                      </div>
                    </section>

                    {/* Bagian ini tetap hanya muncul jika tiket dipilih */}
                    {totalTickets > 0 && (
                      <>
                        {/* Dynamic Per Ticket Fields */}
                        {perTicketFields.length > 0 && (
                          <section className="space-y-6">
                            <div className="flex items-center gap-3 pb-2">
                              <MdInfoOutline className="text-[#FF0000] text-2xl" />
                              <h2 className="font-headline font-bold text-xl tracking-tight uppercase">Participant Details</h2>
                            </div>
                            <div className="space-y-8">
                              {event.tickets.map((ticket, index) => {
                                const qty = quantities[index] || 0;
                                return Array.from({ length: qty }).map((_, slot) => {
                                  const slotKey = `${index}-${slot}`;
                                  const answers = ticketAnswers[slotKey] || {};
                                  return (
                                    <div key={slotKey} className="space-y-6">
                                      <h3 className="font-headline font-bold text-lg text-white tracking-widest uppercase border-l-2 border-[#FF0000] pl-3">
                                        {ticket.type} — Ticket {slot + 1}
                                      </h3>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {perTicketFields.map((f) => (
                                          <DynamicField
                                            key={f.field_key}
                                            field={f}
                                            value={answers[f.field_key]}
                                            onChange={(val) => updateTicketAnswer(slotKey, f.field_key, val)}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  );
                                });
                              })}
                            </div>
                          </section>
                        )}

                      </>
                    )}
                  </form>

                  {/* Terms and Conditions */}
                  {terms.length > 0 && (
                    <section className="space-y-4 pt-4 border-t border-[#C41A20]/30">
                      <h2 className="font-headline font-bold text-lg tracking-tight uppercase text-white/80">Terms &amp; Agreements</h2>
                      <div className="space-y-3">
                        {terms.map((term) => (
                          <label key={term.term_key} className="flex items-start gap-4 cursor-pointer p-3 bg-[#1A1A1A]/50 border border-white/10 hover:border-[#FF0000]/50 transition-colors">
                            <input
                              type="checkbox"
                              checked={!!termsChecked[term.term_key]}
                              onChange={(e) => setTermsChecked(prev => ({ ...prev, [term.term_key]: e.target.checked }))}
                              className="w-5 h-5 mt-0.5 shrink-0 accent-[#FF0000] bg-[#1A1A1A] border-white/20"
                            />
                            <span className="font-body text-sm text-white/80 leading-relaxed">
                              {term.label}
                              {term.is_required && <span className="text-[#FF0000] font-bold ml-1">*</span>}
                            </span>
                          </label>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* Right Column: Ticket Panel (Sticky) */}
                <div className="lg:col-span-5 xl:col-span-4">

                  {/* Venue Location Map */}
                  <div className="sticky top-[100px] glass-card rounded-lg border border-[#C41A20]/50 red-glow p-6 flex flex-col gap-6">
                    <h3 className="font-headline text-xl font-bold tracking-tighter uppercase text-white border-b border-white/10 pb-4">
                      Venue Location
                    </h3>
                    <div className="w-full aspect-video md:aspect-[21/9] rounded-lg overflow-hidden border border-white/10 invert-[100%] hue-rotate-180 contrast-125 grayscale-[0.5] hover:grayscale-0 transition-all duration-700">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent((event.location || "") + " " + (event.city || ""))}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        allowFullScreen
                        title="Event Location"
                      ></iframe>
                    </div>
                  </div>

                  <div className="sticky top-[100px] glass-card rounded-lg border border-[#C41A20]/50 red-glow p-6 flex flex-col gap-6">
                    <h3 className="font-headline text-xl font-bold tracking-tighter uppercase text-white border-b border-white/10 pb-4">
                      Ticket Selection
                    </h3>

                    <div className="space-y-4">
                      {isEventActive ? (
                        event.tickets?.map((ticket, index) => (
                          <div key={ticket.id} className="bg-black/50 border border-white/5 rounded p-4 flex flex-col gap-3 relative overflow-hidden">
                            {ticket.sold === ticket.pcs && (
                              <div className="absolute top-0 right-0 bg-[#FF0000] text-white text-[10px] font-bold px-2 py-0.5 font-label tracking-wider">
                                SOLD OUT
                              </div>
                            )}
                            <div className="flex justify-between items-start gap-2">
                              <div className="w-2/3 pr-2">
                                <h4 className="font-headline font-bold text-white">{ticket.type}</h4>
                                <p className="text-white/50 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: ticket.desc }} />
                              </div>
                              <span className="font-label font-bold text-[#FF0000] shrink-0 text-right">
                                IDR {ticket.price.toLocaleString('id-ID')}
                              </span>
                            </div>

                            <div className="flex justify-end items-center gap-4">
                              <button
                                onClick={() => updateTicket(index, -1)}
                                disabled={ticket.sold === ticket.pcs}
                                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors disabled:opacity-30"
                              >
                                -
                              </button>
                              <span className="font-body font-bold w-4 text-center">{quantities[index] || 0}</span>
                              <button
                                onClick={() => updateTicket(index, 1)}
                                disabled={ticket.sold === ticket.pcs}
                                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors disabled:opacity-30"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="bg-[#FF0000]/10 border border-[#FF0000]/50 rounded p-4 text-center font-bold text-[#FF0000] uppercase tracking-widest text-sm">
                          Event Currently Not Available For Sale
                        </div>
                      )}
                    </div>

                    {/* Calculations */}
                    <div className="border-t border-white/10 pt-4 mt-2 flex justify-between items-end gap-2">
                      <div className="font-label text-xs tracking-widest text-white/50 uppercase">
                        Total ({totalTickets} Tickets)
                      </div>
                      <div className="font-headline text-xl md:text-2xl font-black text-[#FF0000] shrink-0 text-right">
                        IDR {subtotal.toLocaleString('id-ID')}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4 mb-2 flex justify-between items-end gap-2">
                      <div className="font-label text-sm tracking-widest text-white uppercase">
                        Grand Total
                      </div>
                      <div className="font-headline text-xl md:text-2xl font-black text-[#FF0000] shrink-0 text-right">
                        IDR {grandTotal.toLocaleString('id-ID')}
                      </div>
                    </div>

                    {totalTickets > 0 ? (
                      <div className="space-y-4">
                        <button
                          type="submit"
                          form="checkout-form"
                          disabled={isLoading || !isEventActive}
                          className={`w-full py-4 font-label font-bold text-lg uppercase tracking-widest transition-all duration-300 ${isLoading || !isEventActive
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-[#C41A20] to-[#FF0000] text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] hover:scale-[1.02]'
                            }`}
                        >
                          {isLoading ? "Processing..." : "Proceed to Payment"}
                        </button>
                        <div className="flex items-center justify-center gap-2 text-white/60 font-label text-xs uppercase tracking-widest">
                          <MdTimer className="text-sm animate-pulse text-[#FF0000]" />
                          <span>Fill the form on the left to complete order</span>
                        </div>
                      </div>
                    ) : (
                      <button
                        disabled
                        className="w-full font-headline font-bold py-4 rounded tracking-widest uppercase mt-4 transition-all bg-gray-800 text-gray-500 cursor-not-allowed"
                      >
                        Select Tickets
                      </button>
                    )}

                    {/* Reservasi table + grup sharing: aksi sekunder, tidak bergantung pada pilihan tiket */}
                    {isEventActive && (reservationUrl || SHARING_GROUP_URL) && (
                      <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
                        <p className="font-label text-xs tracking-widest uppercase text-white/50 text-center">
                          Or book a table
                        </p>
                        {reservationUrl && (
                          <a
                            href={reservationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 flex items-center justify-center gap-3 border border-white/20 font-label font-bold uppercase tracking-widest text-white hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                          >
                            <FaWhatsapp className="text-xl" />
                            Reserve a Table
                          </a>
                        )}
                        <SharingGroupCTA variant="compact" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
