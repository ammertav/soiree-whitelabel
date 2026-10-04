import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdSearch, MdCalendarToday, MdLocationOn, MdArrowForward, MdChevronRight } from "react-icons/md";
import Swal from "sweetalert2";
import api from "../../api";
import { extractCity, formatShortDate, formatTime } from "../../utils";
import heroImg from '../../assets/hero.webp';

function All() {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [vipEvent, setVipEvent] = useState(null);

  const cities = ["Semarang", "Jakarta", "Bandung"];

  const apiBaseUrl = "http://localhost:8000";

  const showToast = (type, title) =>
    Swal.fire({
      icon: type,
      title,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      background: "#000000",
      color: "#ffffff",
      iconColor: type === "error" ? "#FF0000" : "#00FF00"
    });



  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedCity(params.get("city") || "");
  }, [location.search]);



  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    const city = params.get("city");
    const page = params.get("page") || 1;
    const userId = import.meta.env.VITE_USER_ID; // Ensure this is available

    const fetchData = async () => {
      try {
        // 1. DECIDE WHICH API TO HIT
        if (search || city || Number(page) > 1) {
          // HIT THE SEARCH ENDPOINT (Precise/Database)
          const { data } = await api.get("/search", {
            params: {
              user_id: userId, // CRITICAL FIX: Added this
              search: search || "",
              city: city || "",
              page
            },
            signal: controller.signal,
          });

          setEvents(data?.events?.data || []);
          setTotalPages(data?.events?.total_pages || 1);
          setCurrentPage(data?.events?.current_page || 1);
        } else {
          // HIT THE EVENTS ENDPOINT (Fast/Redis)
          const { data } = await api.get("/newest", {
            params: { user_id: userId },
            signal: controller.signal,
          });

          // Note: allEvents returns { newest: [...] }
          setEvents(data?.newest || []);
          setTotalPages(1);
          setCurrentPage(1);
        }
      } catch (error) {
        if (error.name !== "CanceledError" && error.name !== "AbortError") {
          console.error("Failed to fetch events:", error);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [location.search]); // Only depend on the URL

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (selectedCity) params.set("city", selectedCity);
    params.set("page", "1");

    navigate(`/events?${params.toString()}`);
  };

  const handleResetFilter = () => {
    setSearchTerm("");
    setSelectedCity("");
    navigate("/events");
  };

  const showEvent = useCallback(
    (id, slug) => navigate(`/event/${id}/${slug}`),
    [navigate]
  );

  const handlePageChange = (page) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    navigate(`/events?${params.toString()}`);
  };

  const eventCards = useMemo(() => {
    if (events.length === 0) {
      return (
        <div className="col-span-full py-20 flex flex-col justify-center items-center text-white/50 font-label tracking-widest uppercase">
          No events available
        </div>
      );
    }

    return events.map((event, index) => (
      <div
        key={event.id}
        onClick={() => showEvent(event.id, event.event)}
        className="group bg-ks-black border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 glow-hover relative flex flex-col h-full cursor-pointer"
      >

        <div className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 bg-ks-gradient-vertical opacity-20 group-hover:opacity-40 transition-opacity z-10"></div>
          <img
            alt={event.event}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={
              event.img
                ? `${apiBaseUrl}/storage/${event.img}`
                : "https://placehold.co/600x800/111/444?text=NO+IMAGE"
            }
          />
        </div>
        <div className="p-6 border-t border-t-ks-red/30 flex-grow flex flex-col justify-between relative bg-black">
          <div className="absolute inset-0 bg-ks-glow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className="relative z-10">
            <h3 className="font-headline text-2xl font-bold uppercase mb-2 text-white group-hover:text-ks-red transition-colors text-3d line-clamp-2">{event.event}</h3>
            <p className="text-ks-silver text-sm font-label mb-1 flex items-center gap-2">
              <MdCalendarToday className="text-[16px]" /> {formatShortDate(event.start_time)} • {formatTime(event.start_time)}
            </p>
            <p className="text-ks-silver text-sm font-label mb-4 flex items-center gap-2">
              <MdLocationOn className="text-[16px]" /> {extractCity(event.location)}
            </p>
          </div>
          <div className="relative z-10 flex justify-end items-end mt-4">
            <button className="text-ks-red group-hover:text-white transition-colors">
              <MdArrowForward className="text-3xl" />
            </button>
          </div>
        </div>
      </div>
    ));
  }, [events, showEvent]);

  return (
    <div className="pb-20">
      {/* Page Header Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex flex-col justify-center items-center text-center px-4 overflow-hidden mb-12">
        <div className="absolute inset-0 bg-ks-gradient-vertical opacity-80 z-0"></div>
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 z-0"
          style={{ backgroundImage: `url(${heroImg})` }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto mt-20">
          <h1 className="font-headline text-5xl md:text-7xl font-black uppercase text-white mb-4 text-3d tracking-tight">
            SOCIETY DROPS & EVENTS
          </h1>
          <p className="font-label text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Explore exclusive underground party drops by KEENAN SOCIETY
          </p>
        </div>
      </section>

      <div className="w-full px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter & Search Control Bar */}
          <section className="mb-12 bg-ks-black border border-ks-red/30 rounded-lg p-6 shadow-[0_0_20px_rgba(196,26,32,0.1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-ks-gradient"></div>

            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-6">
              {/* Search */}
              <div className="relative w-full lg:w-1/3">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-DEFAULT py-3 pl-10 pr-4 text-white font-body focus:border-ks-red focus:outline-none focus:ring-1 focus:ring-ks-red transition-colors placeholder:text-white/40"
                  placeholder="Search drops, headliners, venues..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Selectors */}
              <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    const newCity = e.target.value;
                    setSelectedCity(newCity);
                    const params = new URLSearchParams(location.search);
                    if (newCity) {
                      params.set("city", newCity);
                    } else {
                      params.delete("city");
                    }
                    params.set("page", "1");
                    navigate(`/events?${params.toString()}`);
                  }}
                  className="bg-black border border-white/10 rounded-DEFAULT py-3 px-4 text-white font-body focus:border-ks-red focus:outline-none focus:ring-1 focus:ring-ks-red appearance-none min-w-[120px]"
                >
                  <option value="">City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleResetFilter}
                  className="bg-white/5 border border-white/10 rounded-DEFAULT py-3 px-6 text-white font-label tracking-widest text-xs uppercase hover:bg-white/10 hover:border-ks-red transition-colors"
                >
                  Reset Filter
                </button>
                <button type="submit" className="hidden"></button>
              </div>
            </form>
          </section>

          {/* Event Drops Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventCards}
            </div>
          </section>

          {vipEvent && (
            <section className="mb-16">
              <div className="relative w-full rounded-xl overflow-hidden group cursor-pointer border border-ks-red/20 hover:border-ks-red/60 transition-colors duration-500">
                <div className="absolute inset-0 bg-ks-gradient opacity-80 z-10 mix-blend-multiply group-hover:opacity-90 transition-opacity"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${heroImg})` }}
                ></div>
                <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 h-full min-h-[250px]">
                  <div className="max-w-2xl text-center md:text-left">
                    <h2 className="font-headline text-3xl md:text-5xl font-black uppercase text-white mb-2 tracking-tighter text-3d">
                      {vipEvent.event}
                    </h2>
                    <p className="text-ks-silver font-body max-w-lg">Be part of the madness and don't miss out on the experience.</p>
                  </div>
                  <button
                    onClick={() => navigate(`/event/${vipEvent.id}/${encodeURIComponent(vipEvent.event.toLowerCase().replace(/\s+/g, '-'))}`)}
                    className="bg-ks-gradient text-white px-8 py-4 rounded-DEFAULT font-label font-bold tracking-tighter uppercase border border-[#C41A20] shadow-[0_0_20px_rgba(196,26,32,0.6)] hover:scale-105 transition-transform duration-300 whitespace-nowrap"
                  >
                    BUY TICKETS
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-16">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-label font-bold transition-colors ${currentPage === i + 1
                    ? "bg-ks-gradient text-white border border-ks-red shadow-[0_0_10px_rgba(196,26,32,0.4)]"
                    : "bg-transparent border border-white/20 text-white/70 hover:border-ks-red hover:text-white"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default All;