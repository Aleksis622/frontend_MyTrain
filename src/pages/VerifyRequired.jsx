import api from "../api/api";
import { useAuth } from "../context/Auth";
import { useState } from "react";
import "./Auth.css";

export default function VerifyRequired() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const resend = async () => {
    try {
      await api.post("/email/resend", { email: user.email });
      setMessage("Verification email sent!");
    } catch {
      setMessage("Failed to resend verification email.");
    }
  };

  return (
    <div className="auth-page">
      <h1>Email Verification Required</h1>

      <p>You must verify your email before buying tickets.</p>

      {message && <p className="auth-success">{message}</p>}

      <button onClick={resend}>Resend Verification Email</button>

      <p>
        After verifying, <a href="/profile">refresh your profile</a>.
      </p>
    </div>
  );
}
