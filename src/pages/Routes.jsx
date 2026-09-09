import { useTranslation } from "react-i18next";

function RoutesPage() {
  const { t } = useTranslation();

  return (
    <div className="routes">
      <h1>{t("routes.title")}</h1>
      <p>{t("routes.desc")}</p>
    </div>
  );
}

export default RoutesPage;
