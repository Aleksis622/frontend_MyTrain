import { useState } from "react";
import api from "../api/api";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setMessage("");
    setError("");

    try {
      await api.post("/forgot-password", { email });
      setMessage("Password reset link sent to your email.");
    } catch {
      setError("Failed to send reset link.");
    }
  };

  return (
    <div className="auth-page">
      <h1>Forgot Password</h1>

      {message && <p className="auth-success">{message}</p>}
      {error && <p className="auth-error">{error}</p>}

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={handleSubmit}>Send Reset Link</button>

      <p>
        Remember your password? <a href="/login">Login</a>
      </p>
    </div>
  );
}
