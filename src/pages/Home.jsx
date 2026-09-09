import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { all as getTrips } from "../api/trips"; // IMPORTANT: trips, not trains

function Home() {
  const { t } = useTranslation();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips().then(res => {
      console.log("API RESPONSE:", res.data);

      // Laravel pagination → actual data is inside res.data.data
      const list = res.data.data || [];

      // Show only first 5 trips on main page
      setTrips(list.slice(0, 5));
    });
  }, []);

  return (
    <div className="home">
      <h1>{t("home.welcome")}</h1>
      <p>{t("home.welcome_sub")}</p>

      <h2 style={{ marginTop: "2rem" }}>{t("home.next_trains")}</h2>

      <div className="train-preview">
        {trips.length === 0 && (
          <p style={{ opacity: 0.7 }}>{t("home.no_trains")}</p>
        )}

        {trips.map(trip => (
          <div key={trip.trip_id} className="train-card">
            <h3>{trip.trip_headsign || "Unknown Train"}</h3>

            <p>
              {t("trains.route")}: {trip.route_id}
            </p>

            <p>
              {t("trains.service")}: {trip.service_id}
            </p>

            <p>
              {t("trains.direction")}: {trip.direction_id}
            </p>
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
