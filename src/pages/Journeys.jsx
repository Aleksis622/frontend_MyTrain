import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { all as getJourneys } from "../api/journeys";
import "./home.css";

function Journeys() {
  const { t } = useTranslation();
  const [list, setList] = useState([]);

  useEffect(() => {
    getJourneys().then(res => {
      console.log("API RESPONSE:", res.data);

      const journeys = Array.isArray(res.data) ? res.data : res.data.data;

      setList(journeys);
    });
  }, []);

  return (
    <div className="journeys-page">
      <h1>{t("journeys.title")}</h1>

      <div className="journey-list">
        {list.length === 0 && (
          <p style={{ opacity: 0.7 }}>{t("journeys.no_journeys")}</p>
        )}

        {list.map(j => (
          <div key={j.id} className="journey-card">
            <h3>{j.name || t("journeys.unknown")}</h3>

            <p>
              {t("journeys.from")}: {j.from_stop_name}
            </p>

            <p>
              {t("journeys.to")}: {j.to_stop_name}
            </p>

            <p>
              {t("journeys.departure")}: {j.departure_time}
            </p>

            <p>
              {t("journeys.arrival")}: {j.arrival_time}
            </p>

            <p>
              {t("journeys.price")}: {j.price} EUR
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journeys;
