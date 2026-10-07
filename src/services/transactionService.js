import api from "../api";

/**
 * Detail transaksi (tickets + TransTick, event, tickQrs). id & no_order wajib cocok.
 */
export const getTransaction = async (id, noOrder, { signal } = {}) => {
  const { data } = await api.get(`/transaction/${id}/${noOrder}`, { signal });
  return data?.transaction || null;
};

/**
 * Batalkan transaksi yang masih pending; stok tiket dikembalikan backend.
 */
export const cancelTransaction = async (id, noOrder) => {
  const { data } = await api.post(`/transaction/${id}/${noOrder}/cancel`);
  return data;
};
