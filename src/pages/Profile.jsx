import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Profile.css";

function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div className="profile-page"><p>Loading...</p></div>;
  }

  if (!user) {
    return null; 
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      <div className="profile-card">
        <h3>Your Information</h3>

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
