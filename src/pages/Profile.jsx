import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { me, logout } from "../api/auth";
import "./home.css";

function Profile() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    me()
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleLogout = () => {
    logout().then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="profile-page">
      <h1>{t("profile.title")}</h1>

      {!user && (
        <p style={{ opacity: 0.7 }}>{t("profile.not_logged_in")}</p>
      )}

      {user && (
        <div className="profile-card">
          <h3>{t("profile.info")}</h3>

          <p>
            <strong>{t("profile.name")}:</strong> {user.name}
          </p>

          <p>
            <strong>{t("profile.email")}:</strong> {user.email}
          </p>

          <button className="btn" onClick={handleLogout}>
            {t("profile.logout")}
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
