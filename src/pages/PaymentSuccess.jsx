import { useParams } from "react-router-dom";
import "./Payment.css";

function PaymentSuccess() {
  const { paymentId } = useParams();

  return (
    <div className="payment-success">
      <h1>Payment Successful!</h1>
      <p>Your payment #{paymentId} has been confirmed.</p>
      <p>Your ticket is now active.</p>
    </div>
  );
}

export default PaymentSuccess;
