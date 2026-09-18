import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { all as getTrips, search as searchTrips } from "../api/trips";
import "./Home.css";

function Home() {
  const { t } = useTranslation();

  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [date, setDate] = useState("");
  const [weekday, setWeekday] = useState("");

  const [stations, setStations] = useState([]);
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsUntil, setSuggestionsUntil] = useState([]);

  const [popular, setPopular] = useState([]);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  
  useEffect(() => {
    getTrips().then(res => {
      const list = Array.isArray(res.data) ? res.data : res.data.data;

      
      const stops = new Set();
      list.forEach(trip => {
        if (trip.stop_name_from) stops.add(trip.stop_name_from);
        if (trip.stop_name_until) stops.add(trip.stop_name_until);
      });

      setStations([...stops]);

      
      setPopular(list.slice(0, 5));
    });
  }, []);

 
  const handleFromChange = (value) => {
    setFrom(value);
    if (!value) return setSuggestionsFrom([]);

    const filtered = stations.filter(st =>
      st.toLowerCase().startsWith(value.toLowerCase())
    );

    setSuggestionsFrom(filtered.slice(0, 5));
  };

  // Autocomplete UNTIL
  const handleUntilChange = (value) => {
    setUntil(value);
    if (!value) return setSuggestionsUntil([]);

    const filtered = stations.filter(st =>
      st.toLowerCase().startsWith(value.toLowerCase())
    );

    setSuggestionsUntil(filtered.slice(0, 5));
  };

  const handleSearch = () => {
    if (!from || !until) return alert(t("trains.validation"));

    setSearched(true);

    const filters = {
      from,
      until,
      date,
      weekday
    };

    searchTrips(filters).then(res => {
      const list = Array.isArray(res.data) ? res.data : res.data.data;

      
      const filtered = list.filter(trip =>
        trip.stop_name_from?.toLowerCase() === from.toLowerCase() &&
        trip.stop_name_until?.toLowerCase() === until.toLowerCase()
      );

      setResults(filtered);
    });
  };

  return (
    <div className="home">
      <h1>{t("home.welcome")}</h1>
      <p>{t("home.welcome_sub")}</p>

      
      <div className="search-box">
        <div className="input-group">
          <input
            type="text"
            placeholder={t("trains.from")}
            value={from}
            onChange={e => handleFromChange(e.target.value)}
          />
          {suggestionsFrom.length > 0 && (
            <div className="autocomplete">
              {suggestionsFrom.map((s, i) => (
                <div key={i} onClick={() => setFrom(s)}>
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder={t("trains.until")}
            value={until}
            onChange={e => handleUntilChange(e.target.value)}
          />
          {suggestionsUntil.length > 0 && (
            <div className="autocomplete">
              {suggestionsUntil.map((s, i) => (
                <div key={i} onClick={() => setUntil(s)}>
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <select value={weekday} onChange={e => setWeekday(e.target.value)}>
          <option value="">{t("trains.choose_weekday")}</option>
          <option value="1">{t("weekdays.mon")}</option>
          <option value="2">{t("weekdays.tue")}</option>
          <option value="3">{t("weekdays.wed")}</option>
          <option value="4">{t("weekdays.thu")}</option>
          <option value="5">{t("weekdays.fri")}</option>
          <option value="6">{t("weekdays.sat")}</option>
          <option value="7">{t("weekdays.sun")}</option>
        </select>

        <button className="btn" onClick={handleSearch}>
          {t("trains.search")}
        </button>
      </div>

      
      {!searched && (
        <>
          <h2>{t("home.next_trains")}</h2>
          <div className="train-list-container">
            {popular.map(trip => (
              <div key={trip.trip_id} className="train-item">
                <div className="train-left">
                  <div className="train-name">
                    {trip.trip_headsign}
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
        </>
      )}

      
      {searched && (
        <>
          <h2>{t("trains.search_results")}</h2>

          {results.length === 0 && (
            <p style={{ opacity: 0.7 }}>{t("trains.no_results")}</p>
          )}

          <div className="train-list-container">
            {results.map(trip => (
              <div key={trip.trip_id} className="train-item">
                <div className="train-left">
                  <div className="train-name">
                    {trip.trip_headsign}
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
        </>
      )}
    </div>
  );
}

export default Home;
