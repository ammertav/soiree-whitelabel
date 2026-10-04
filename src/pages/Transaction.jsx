import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import api from "../api";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoTicket } from "react-icons/io5";
import { MdCheck, MdTimer, MdCalendarToday, MdLocationOn } from "react-icons/md";

export default function Transaction() {
  const { transactionId, no_order } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [snapToken, setSnapToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const navigate = useNavigate();

  // --- INTERNAL COUNTDOWN LOGIC ---
  useEffect(() => {
    if (!transaction?.expired_at) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(transaction.expired_at).getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("Expired");
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your payment session has expired.",
          background: "#000000",
          color: "#ffffff",
        }).then(() => navigate("/events"));
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [transaction?.expired_at, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchSnapToken = async () => {
      try {
        const { data } = await api.get(`/transaction/${transactionId}/${no_order}`);
        setTransaction(data.transaction || {});
        setSnapToken(data.transaction?.snap_token || null);

        if (!data.transaction?.snap_token) {
          Swal.fire({
            icon: "error",
            title: "Snap token not found.",
            background: "#000000",
            color: "#ffffff",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/events");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to load transaction.",
          background: "#000000",
          color: "#ffffff",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/events");
      }
    };

    fetchSnapToken();
  }, [transactionId, no_order, navigate]);

  const totalAmount = useMemo(() => transaction?.total_amount || 0, [transaction]);
  const totalService = useMemo(() => transaction?.total_service || 0, [transaction]);
  const tickets = useMemo(() => transaction?.tickets || [], [transaction]);

  const handlePayment = useCallback((e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!snapToken) {
      Swal.fire({
        icon: "error",
        title: "Transaction Fail!",
        background: "#000000",
        color: "#ffffff",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      setIsLoading(false);
      return;
    }

    window.snap.pay(snapToken, {
      onSuccess(result) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your ticket has been sent to your email.",
          background: "#000000",
          color: "#ffffff",
          confirmButtonColor: "#C41A20",
          confirmButtonText: "OK"
        }).then(() => {
          navigate("/events");
        });
      },
      onPending(result) {
        Swal.fire({
          icon: "info",
          title: "Payment pending, please complete your payment.",
          background: "#000000",
          color: "#ffffff",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
        setIsLoading(false);
      },
      onError(result) {
        Swal.fire({
          icon: "error",
          title: "Payment failed, please try again.",
          background: "#000000",
          color: "#ffffff",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
        setIsLoading(false);
      },
      onClose() {
        Swal.fire({
          icon: "warning",
          title: "Payment popup closed without finishing.",
          background: "#000000",
          color: "#ffffff",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
        setIsLoading(false);
      },
    });
  }, [snapToken, navigate]);

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this transaction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C41A20",
      cancelButtonColor: "#4B5563",
      background: "#000000",
      color: "#ffffff",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });
    if (!result.isConfirmed) return;
    try {
      setIsLoading(true);
      await api.post(`/transaction/${transactionId}/${no_order}/cancel`);
      Swal.fire({
        icon: "success",
        title: "Transaction cancelled.",
        toast: true,
        background: "#000000",
        color: "#ffffff",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      navigate("/events");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error?.response?.data?.error || "Failed to cancel transaction.",
        toast: true,
        background: "#000000",
        color: "#ffffff",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!transaction) {
    return (
      <main className="flex flex-col min-h-screen bg-black text-white items-center justify-center font-headline text-2xl uppercase">
        Loading Transaction...
      </main>
    );
  }

  const eventImage = transaction.event?.img 
    ? `https://organizer.funnev.com/storage/${transaction.event.img}` 
    : "https://placehold.co/600x400";

  return (
    <>
      <Helmet>
        <title>KEENAN SOCIETY: Complete Payment</title>
        <style>{`
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #000000; }
          ::-webkit-scrollbar-thumb { background: #C41A20; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #FF0000; }
        `}</style>
      </Helmet>

      <main className="font-body min-h-screen flex flex-col bg-black text-white">
        <Navbar />

        <div className="flex-grow pt-[120px] pb-16 w-full px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-12">
              {/* Stepper */}
              <div className="flex items-center justify-between w-full font-label text-sm font-bold tracking-wider relative mb-8">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#C41A20]/30 -z-10 -translate-y-1/2"></div>
                <div className="flex flex-col items-center gap-2 bg-black px-4">
                  <div className="w-8 h-8 rounded-full bg-[#C41A20] text-white flex items-center justify-center border-2 border-[#C41A20]">
                    <MdCheck className="text-lg font-bold" />
                  </div>
                  <span className="text-[#C41A20] uppercase">Tickets</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-black px-4">
                  <div className="w-8 h-8 rounded-full bg-[#C41A20] text-white flex items-center justify-center border-2 border-[#C41A20]">
                    <MdCheck className="text-lg font-bold" />
                  </div>
                  <span className="text-[#C41A20] uppercase">Details</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-black px-4">
                  <div className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center border-2 border-[#FF0000] shadow-[0_0_15px_rgba(255,0,0,0.5)]">
                    3
                  </div>
                  <span className="text-[#FF0000] uppercase drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]">Payment</span>
                </div>
              </div>

              <section className="space-y-6 bg-[#1A1A1A]/50 border border-[#C41A20]/30 p-8 shadow-[0_0_30px_rgba(196,26,32,0.1)]">
                <div className="border-b border-[#C41A20]/30 pb-4">
                  <h1 className="font-headline font-black text-2xl uppercase tracking-tighter text-[#FF0000]">
                    Confirm Your Selection
                  </h1>
                  <p className="text-white/70 font-label tracking-widest text-xs uppercase mt-2">
                    Review your order and proceed to payment
                  </p>
                </div>

                <div className="space-y-4">
                  {tickets.map((ticket, index) => (
                    <div key={index} className="flex justify-between items-center bg-black/50 p-4 border border-white/10">
                      <div className="flex items-center gap-4">
                        <IoTicket className="text-2xl text-[#FF0000]" />
                        <div>
                          <h2 className="font-headline font-bold text-lg text-white uppercase">{ticket.type}</h2>
                          <p className="text-white/50 text-xs font-label tracking-widest uppercase">Qty: {ticket.TransTick.qty}</p>
                        </div>
                      </div>
                      <span className="font-label font-bold text-lg">
                        IDR {ticket.TransTick.subtotal?.toLocaleString('id-ID') || 0}
                      </span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center bg-black/50 p-4 border border-white/10">
                    <span className="font-label font-bold text-white/70 uppercase">Service Fee</span>
                    <span className="font-label font-bold text-lg">IDR {totalService?.toLocaleString('id-ID') || 0}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#C41A20]/30 space-y-4">
                  <h2 className="font-headline font-bold text-lg text-[#FF0000] uppercase tracking-widest">Buyer Information</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm font-body">
                    <div>
                      <p className="text-white/50 tracking-widest uppercase text-xs font-label">Name</p>
                      <p className="font-bold text-white">{transaction.name}</p>
                    </div>
                    <div>
                      <p className="text-white/50 tracking-widest uppercase text-xs font-label">Email</p>
                      <p className="font-bold text-white">{transaction.email}</p>
                    </div>
                    <div>
                      <p className="text-white/50 tracking-widest uppercase text-xs font-label">Phone</p>
                      <p className="font-bold text-white">{transaction.phone || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#C41A20]/30 flex justify-between items-end">
                  <span className="font-label font-bold text-white/70 uppercase tracking-widest">Total Amount</span>
                  <span className="font-headline font-black text-3xl text-[#FF0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]">
                    IDR {totalAmount?.toLocaleString('id-ID') || 0}
                  </span>
                </div>
              </section>
              <div className="flex gap-4 w-full">
                <button 
                  onClick={handlePayment}
                  disabled={isLoading || timeLeft === "Expired"}
                  className="flex-1 py-4 font-label font-bold text-lg uppercase tracking-widest transition-all duration-300 bg-gradient-to-r from-[#C41A20] to-[#FF0000] text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Loading..." : (timeLeft && timeLeft !== "Expired" ? `Pay Now (${timeLeft})` : "Pay Now")}
                </button>
                <button 
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="px-8 py-4 font-label font-bold text-lg uppercase tracking-widest transition-all duration-300 bg-[#4B5563] text-white hover:bg-[#374151] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-[100px] bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 p-6 lg:p-8 space-y-6">
                <img 
                  className="w-full h-48 object-cover rounded-sm border border-white/10" 
                  alt={transaction.event?.event} 
                  src={eventImage} 
                />
                <div className="space-y-4">
                  <h4 className="font-headline font-black text-2xl text-[#FF0000] uppercase tracking-tight">{transaction.event?.event}</h4>
                  
                  <div className="flex items-center gap-3 text-white/70 font-body border-b border-white/10 pb-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MdCheck className="text-[#FF0000]" />
                    </div>
                    <div>
                      <p className="text-xs font-label uppercase tracking-widest text-white/50">Organizer</p>
                      <p className="font-bold">{transaction.event?.organizer}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white/70 font-body border-b border-white/10 pb-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MdCalendarToday className="text-[#FF0000]" />
                    </div>
                    <div>
                      <p className="text-xs font-label uppercase tracking-widest text-white/50">Date & Time</p>
                      <p className="font-bold">{transaction.event?.start_time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white/70 font-body">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MdLocationOn className="text-[#FF0000]" />
                    </div>
                    <div>
                      <p className="text-xs font-label uppercase tracking-widest text-white/50">Location</p>
                      <p className="font-bold">{transaction.event?.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}