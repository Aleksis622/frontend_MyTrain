import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="nav">
      <div className="logo">MyTrain</div>

      <ul className="links">
        <li className={isActive("/")}>
          <Link to="/">{t("navigation.home")}</Link>
        </li>

        <li className={isActive("/tickets")}>
          <Link to="/tickets">{t("navigation.tickets")}</Link>
        </li>

        <li className={isActive("/map")}>
          <Link to="/map">{t("navigation.map")}</Link>
        </li>

        <li className={isActive("/profile")}>
          <Link to="/profile">{t("navigation.profile")}</Link>
        </li>
      </ul>

      <div className="lang-switch">
        <button
          className={i18n.language === "lv" ? "active-lang" : ""}
          onClick={() => changeLang("lv")}
        >
          LV
        </button>

        <button
          className={i18n.language === "en" ? "active-lang" : ""}
          onClick={() => changeLang("en")}
        >
          EN
        </button>

        <button
          className={i18n.language === "ru" ? "active-lang" : ""}
          onClick={() => changeLang("ru")}
        >
          RU
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
