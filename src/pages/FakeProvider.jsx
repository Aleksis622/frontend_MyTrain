import { useParams, useNavigate } from "react-router-dom";
import { confirmPayment, getPayment } from "../api/payments";
import { useEffect, useState } from "react";
import "./Payment.css";

function FakeProvider() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);

  useEffect(() => {
    getPayment(paymentId).then(res => setPayment(res.data));
  }, [paymentId]);

  const handleConfirm = async () => {
    await confirmPayment(paymentId);
    navigate(`/payment/${paymentId}/success`);
  };

  const handleCancel = () => {
    navigate(`/payment/${paymentId}/failed`);
  };

  if (!payment) return <p>Loading...</p>;

  return (
    <div className="provider-page">
      <h1>Fake Payment Provider</h1>

      <p>Amount: {payment.amount} {payment.currency}</p>
      <p>Ticket ID: {payment.ticket_id}</p>

      <div className="provider-actions">
        <button className="btn-success" onClick={handleConfirm}>
          Confirm Payment
        </button>

        <button className="btn-cancel" onClick={handleCancel}>
          Cancel Payment
        </button>
      </div>
    </div>
  );
}

export default FakeProvider;
