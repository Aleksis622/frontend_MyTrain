import { useState } from "react";
import { useAuth } from "../context/Auth";
import { register as apiRegister } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const res = await apiRegister(name, email, password);
      setUser(res.data.user);
      navigate("/profile");
    } catch (err) {
      setError("Registration failed");
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

      <button onClick={handleRegister}>Create Account</button>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
