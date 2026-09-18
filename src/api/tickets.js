import api from "./api";

// Get all tickets for the logged-in user
export const all = () => {
  return api.get("/tickets");
};

// Get one ticket by ID
export const one = (id) => {
  return api.get(`/tickets/${id}`);
};

// Buy a ticket for a journey
export const buy = (journeyId) => {
  return api.post("/tickets/buy", { journey_id: journeyId });
};

// Confirm payment
export const pay = (paymentId, txId) => {
  return api.post("/tickets/payment/confirm", {
    payment_id: paymentId,
    transaction_id: txId,
  });
};

export const cancel = (id) => {
  return api.post(`/tickets/${id}/cancel`);
};
