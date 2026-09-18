import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { all as getRoutes } from "../api/trips"; 
import "./home.css";

function RoutesPage() {
  const { t } = useTranslation();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    getRoutes().then(res => {
      console.log("API RESPONSE:", res.data);

      
      const list = Array.isArray(res.data) ? res.data : res.data.data;

      setRoutes(list);
    });
  }, []);

  return (
    <div className="routes-page">
      <h1>{t("routes.title")}</h1>

      <div className="route-list">
        {routes.length === 0 && (
          <p style={{ opacity: 0.7 }}>{t("routes.no_routes")}</p>
        )}

        {routes.map(route => (
          <div key={route.route_id} className="route-card">
            <h3>
              {route.route_short_name || t("routes.unknown")} —{" "}
              {route.route_long_name}
            </h3>

            <p>
              {t("routes.type")}: {route.route_type}
            </p>

            <p>
              {t("routes.agency")}: {route.agency_id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoutesPage;
