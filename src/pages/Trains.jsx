import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { search as searchTrips, all as getTrips } from "../api/trips";
import "./Trains.css";

function Trains() {
  const { t } = useTranslation();

  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [date, setDate] = useState("");

  const [popular, setPopular] = useState([]);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    getTrips().then(res => {
      const list = Array.isArray(res.data) ? res.data : res.data.data;
      setPopular(list.slice(0, 5)); 
    });
  }, []);

  const handleSearch = () => {
    setSearched(true);

    const filters = {
      from,
      until,
      date
    };

    searchTrips(filters).then(res => {
      const list = Array.isArray(res.data) ? res.data : res.data.data;

      // Exact station match only
      const filtered = list.filter(trip =>
        trip.stop_name_from?.toLowerCase() === from.toLowerCase() &&
        trip.stop_name_until?.toLowerCase() === until.toLowerCase()
      );

      setResults(filtered);
    });
  };

  return (
    <div className="trains-page">
      <h1>{t("trains.title")}</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder={t("trains.from")}
          value={from}
          onChange={e => setFrom(e.target.value)}
        />

        <input
          type="text"
          placeholder={t("trains.until")}
          value={until}
          onChange={e => setUntil(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <button className="btn" onClick={handleSearch}>
          {t("trains.search")}
        </button>
      </div>

      {!searched && (
        <>
          <h2>{t("trains.popular_routes")}</h2>
          <div className="train-list">
            {popular.map(trip => (
              <div key={trip.trip_id} className="train-item">
                <div className="train-title">{trip.trip_headsign}</div>
                <div className="train-details">
                  {t("trains.route")}: {trip.route_id}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {searched && (
        <>
          <h2>{t("trains.search_results")}</h2>

          {results.length === 0 && (
            <p style={{ opacity: 0.7 }}>{t("trains.no_results")}</p>
          )}

          <div className="train-list">
            {results.map(trip => (
              <div key={trip.trip_id} className="train-item">
                <div className="train-title">{trip.trip_headsign}</div>
                <div className="train-details">
                  {t("trains.route")}: {trip.route_id}
                </div>
                <div className="train-details">
                  {t("trains.direction")}: {trip.direction_id}
                </div>
                <div className="train-details">
                  {t("trains.service")}: {trip.service_id}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Trains;
