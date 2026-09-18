import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { all as getStops } from "../api/trips"; 
import "./home.css";

function Stops() {
  const { t } = useTranslation();
  const [stops, setStops] = useState([]);

  useEffect(() => {
    getStops().then(res => {
      console.log("API RESPONSE:", res.data);

      const list = Array.isArray(res.data) ? res.data : res.data.data;

      setStops(list);
    });
  }, []);

  return (
    <div className="stops-page">
      <h1>{t("stops.title")}</h1>

      <div className="stop-list">
        {stops.length === 0 && (
          <p style={{ opacity: 0.7 }}>{t("stops.no_stops")}</p>
        )}

        {stops.map(stop => (
          <div key={stop.stop_id} className="stop-card">
            <h3>{stop.stop_name || t("stops.unknown")}</h3>

            <p>
              {t("stops.code")}: {stop.stop_code || "-"}
            </p>

            <p>
              {t("stops.lat")}: {stop.stop_lat}
            </p>

            <p>
              {t("stops.lon")}: {stop.stop_lon}
            </p>

            <p>
              {t("stops.zone")}: {stop.zone_id || "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stops;
