import { useTranslation } from "react-i18next";

function Stops() {
  const { t } = useTranslation();

  return (
    <div className="stops">
      <h1>{t("stops.title")}</h1>
      <p>{t("stops.desc")}</p>
    </div>
  );
}

export default Stops;
