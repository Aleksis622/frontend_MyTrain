import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { all as getTickets } from "../api/tickets";
import "./home.css";

function Tickets() {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTickets().then(res => {
      console.log("API RESPONSE:", res.data);

      const list = Array.isArray(res.data) ? res.data : res.data.data;

      setTickets(list);
    });
  }, []);
<button
  className="btn"
  onClick={() => navigate(`/payment/${ticket.id}`)}
>
  Pay Now
</button>

  return (
    <div className="tickets-page">
      <h1>{t("tickets.title")}</h1>

      <div className="ticket-list">
        {tickets.length === 0 && (
          <p style={{ opacity: 0.7 }}>{t("tickets.no_tickets")}</p>
        )}

        {tickets.map(ticket => (
          <div key={ticket.id} className="ticket-card">
            <h3>
              {t("tickets.journey")}: {ticket.journey_name}
            </h3>

            <p>
              {t("tickets.from")}: {ticket.from_stop_name}
            </p>

            <p>
              {t("tickets.to")}: {ticket.to_stop_name}
            </p>

            <p>
              {t("tickets.date")}: {ticket.date}
            </p>

            <p>
              {t("tickets.price")}: {ticket.price} EUR
            </p>

            <p>
              {t("tickets.status")}: {ticket.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default Tickets;
