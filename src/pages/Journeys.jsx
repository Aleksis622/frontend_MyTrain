import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { all as getJourneys } from "../api/journeys";

function Journeys() {
  const { t } = useTranslation();
  const [list, setList] = useState([]);

  useEffect(() => {
    getJourneys().then(res => setList(res.data));
  }, []);

  return (
    <div className="journeys">
      <h1>{t("journeys.title")}</h1>

      {list.map(j => (
        <div key={j.id} className="journey-card">
          <h3>{j.name}</h3>
          <p>{t("journeys.from")}: {j.from}</p>
          <p>{t("journeys.to")}: {j.to}</p>
          <p>{t("journeys.price")}: {j.price} EUR</p>
        </div>
      ))}
    </div>
  );
}

export default Journeys;
