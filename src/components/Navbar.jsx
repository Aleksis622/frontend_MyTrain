import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <nav className="nav">
      <div className="logo">MyTrain</div>

      <ul className="links">
        <li><Link to="/">{t("navigation.home")}</Link></li>
        <li><Link to="/trains">{t("navigation.trains")}</Link></li>
        <li><Link to="/tickets">{t("navigation.tickets")}</Link></li>
        <li><Link to="/map">{t("navigation.map")}</Link></li>
        <li><Link to="/profile">{t("navigation.profile")}</Link></li>
      </ul>

      <div className="lang-switch">
        <button onClick={() => changeLang("lv")}>LV</button>
        <button onClick={() => changeLang("en")}>EN</button>
        <button onClick={() => changeLang("ru")}>RU</button>
      </div>
    </nav>
  );
}

export default Navbar;
