import api from "../api";

// Organizer pemilik whitelabel ini (users.id di backend)
const USER_ID = import.meta.env.VITE_USER_ID;

/**
 * Event aktif milik organizer (maks. 6, status Approve/ON SALE).
 * Dipakai Home (section Roadmap) dan halaman /roadmap.
 */
export const getNewestEvents = async ({ signal } = {}) => {
  const { data } = await api.get("/newest", {
    params: { user_id: USER_ID },
    signal,
  });
  return data?.newest || [];
};

/**
 * Detail event + tickets, form_fields, dan lineups.
 * Mengembalikan event yang sudah digabung dengan `date` & `time` dari backend.
 */
export const getEventDetail = async (id, slug, { signal } = {}) => {
  const { data } = await api.get(`/event/${id}/${slug}`, { signal });
  return data?.event ? { ...data.event, date: data.date, time: data.time } : null;
};
