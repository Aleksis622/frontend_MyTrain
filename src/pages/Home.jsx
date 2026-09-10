import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { all as getTrips } from "../api/trips";
import "./Home.css";

function Home() {
  const { t } = useTranslation();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips().then(res => {
      console.log("API RESPONSE:", res.data);
      const list = Array.isArray(res.data) ? res.data : res.data.data;

      setTrips(list.slice(0, 5));
    });
  }, []);

  return (
    <div className="home">
      <h1>{t("home.welcome")}</h1>
      <p>{t("home.welcome_sub")}</p>

      <h2 className="train-list-title">{t("home.next_trains")}</h2>

      <div className="train-list-container">
        {trips.length === 0 && (
          <p style={{ opacity: 0.7 }}>{t("home.no_trains")}</p>
        )}

        {trips.map(trip => (
          <div key={trip.trip_id} className="train-item">
            <div className="train-left">
              <div className="train-name">
                {trip.trip_headsign || "Unknown Train"}
              </div>

              <div className="train-route">
                {t("trains.route")}: {trip.route_id}
              </div>
            </div>

            <div className="train-right">
              <div className="train-time">
                {t("trains.direction")}: {trip.direction_id}
              </div>

              <div className="train-status">
                {t("trains.service")}: {trip.service_id}
              </div>
            </div>
          </div>
        ))}
      </div>

      <a href="/trips" className="btn">
        {t("home.view_all_trains")}
      </a>
    </div>
  );
}

export default Home;
