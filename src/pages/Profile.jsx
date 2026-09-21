import { useAuth } from "../context/Auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Profile() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="profile-page">
        <h1>{t("profile.title")}</h1>

        <p style={{ opacity: 0.7 }}>{t("profile.not_logged_in")}</p>

        <div className="profile-card">
          <a className="btn" href="/login">{t("profile.login")}</a>
          <a className="btn" href="/register">{t("profile.register")}</a>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1>{t("profile.title")}</h1>

      <div className="profile-card">
        <h3>{t("profile.info")}</h3>

        <p><strong>{t("profile.name")}:</strong> {user.name}</p>
        <p><strong>{t("profile.email")}:</strong> {user.email}</p>

        <button className="btn" onClick={handleLogout}>
          {t("profile.logout")}
        </button>
      </div>
    </div>
  );
}

export default Profile;
