import { useEffect, useState } from "react";
import { Alerts } from "../api.js";
import AlertBanner from "./AlertBanner.jsx";

export default function AlertFeed() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    Alerts.list().then(setAlerts);
  }, []);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Alerts</h2>
      {alerts.length > 0 ? (
        alerts.map((a) => <AlertBanner key={a._id} alert={a} />)
      ) : (
        <div className="text-gray-500">No alerts yet.</div>
      )}
    </div>
  );
}
