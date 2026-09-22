import { useState } from "react";
import api from "../api/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Auth.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token = params.get("token");
  const emailParam = params.get("email");

  const [email, setEmail] = useState(emailParam || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    try {
      await api.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation: confirm,
      });

      setMessage("Password reset successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Password reset failed.");
    }
  };

  return (
    <div className="auth-page">
      <h1>Reset Password</h1>

      {message && <p className="auth-success">{message}</p>}
      {error && <p className="auth-error">{error}</p>}

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
      />

      <button onClick={handleSubmit}>Reset Password</button>

      <p>
        Back to <a href="/login">Login</a>
      </p>
    </div>
  );
}
