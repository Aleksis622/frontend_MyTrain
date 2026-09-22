import { useState } from "react";
import { register } from "../api/auth";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    try {
      
      await register(name, email, password);

      
      await login(email, password);

      navigate("/profile");
    } catch (err) {
      setError("Registration failed. Check your details.");
    }
  };

  return (
    <div className="auth-page">
      <h1>Register</h1>

      {error && <p className="auth-error">{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
