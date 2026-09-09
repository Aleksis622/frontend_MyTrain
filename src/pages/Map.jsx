import { useTranslation } from "react-i18next";

function Map() {
  const { t } = useTranslation();

  return (
    <div className="map">
      <h1>{t("map.title")}</h1>
      <p>{t("map.desc")}</p>
    </div>
  );
}

export default Map;
