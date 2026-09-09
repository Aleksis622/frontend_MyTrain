import { useTranslation } from "react-i18next";

function Tickets() {
  const { t } = useTranslation();

  return (
    <div className="tickets">
      <h1>{t("tickets.title")}</h1>
      <p>{t("tickets.desc")}</p>
    </div>
  );
}

export default Tickets;
