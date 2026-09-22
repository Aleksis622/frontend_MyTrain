import { useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); 

    try {
      await login(email, password);   
      navigate("/profile");           
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-page">
      <h1>Login</h1>

      {error && <p className="auth-error">{error}</p>}

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

      <button onClick={handleLogin}>Login</button>

      <p>
        No account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
