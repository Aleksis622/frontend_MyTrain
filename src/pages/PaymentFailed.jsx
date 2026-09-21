import { useParams } from "react-router-dom";
import "./Payment.css";

function PaymentFailed() {
  const { paymentId } = useParams();

  return (
    <div className="payment-failed">
      <h1>Payment Failed</h1>
      <p>Payment #{paymentId} was cancelled.</p>
      <p>Your ticket remains unpaid.</p>
    </div>
  );
}

export default PaymentFailed;
