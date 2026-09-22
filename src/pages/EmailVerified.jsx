import "./Auth.css";

export default function EmailVerified() {
  return (
    <div className="auth-page">
      <h1>Email Verified</h1>
      <p>Your email has been successfully verified.</p>

      <a className="btn" href="/login">
        Go to Login
      </a>
    </div>
  );
}
