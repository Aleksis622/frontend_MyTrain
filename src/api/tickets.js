import api from "./api";

export const buy = (journeyId) =>
  api.post("/tickets/buy", { journey_id: journeyId });

export const pay = (paymentId, txId) =>
  api.post("/tickets/payment/confirm", {
    payment_id: paymentId,
    transaction_id: txId,
  });
