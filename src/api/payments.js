import api from "./api";

export const createPayment = (ticketId, provider) =>
  api.post("/payments", { ticket_id: ticketId, provider });

export const confirmPayment = (paymentId) =>
  api.post(`/payments/${paymentId}/confirm`);

export const getPayment = (paymentId) =>
  api.get(`/payments/${paymentId}`);
