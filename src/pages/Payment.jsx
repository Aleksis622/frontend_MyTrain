import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPayment } from "../api/payments";
import "./Payment.css";

function Payment() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);

  const startPayment = async (provider) => {
    try {
      const res = await createPayment(ticketId, provider);
      setPayment(res.data.payment);

      
      navigate(`/payment/${res.data.payment.id}/provider`);
    } catch (err) {
      alert("Could not start payment");
    }
  };

  return (
    <div className="payment-page">
      <h1>Choose Payment Method</h1>

      <div className="payment-methods">
        <button onClick={() => startPayment("swedbank")}>
          Swedbank (Fake)
        </button>

        <button onClick={() => startPayment("paypal")}>
          PayPal (Fake)
        </button>

        <button onClick={() => startPayment("card")}>
          Credit Card (Fake)
        </button>
      </div>
    </div>
  );
}

export default Payment;
