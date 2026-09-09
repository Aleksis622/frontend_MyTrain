import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { all as getTrains } from "../api/trips";

function Trains() {
  const { t } = useTranslation();
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    getTrains().then(res => setTrains(res.data));
  }, []);

  return (
    <div className="trains">
      <h1>{t("trains.title")}</h1>

      {trains.map(train => (
        <div key={train.id} className="train-card">
          <h3>{train.name}</h3>
          <p>{t("trains.type")}: {train.type}</p>
        </div>
      ))}
    </div>
  );
}

export default Trains;
