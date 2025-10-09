import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [tab, setTab] = useState("alerts");

  // Alerts
  const [alerts, setAlerts] = useState([]);
  const [alertForm, setAlertForm] = useState({ title: "", message: "" });

  // Volunteers (now with email)
  const [volunteers, setVolunteers] = useState([]);
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    role: "",
    contact: "",
    email: "",
  });

  // Safety Tips
  const [tips, setTips] = useState([]);
  const [tipForm, setTipForm] = useState({ title: "", content: "" });

  // Fetch helpers
  const loadAlerts = () =>
    fetch("http://localhost:5000/api/alerts")
      .then((res) => res.json())
      .then((data) =>
        setAlerts(data.map((a) => ({ ...a, id: a.id || a._id })))
      );

  const loadVolunteers = () =>
    fetch("http://localhost:5000/api/volunteers")
      .then((res) => res.json())
      .then((data) =>
        setVolunteers(data.map((v) => ({ ...v, id: v.id || v._id })))
      );

  const loadTips = () =>
    fetch("http://localhost:5000/api/tips")
      .then((res) => res.json())
      .then((data) => setTips(data.map((t) => ({ ...t, id: t.id || t._id }))));

  useEffect(() => {
    loadAlerts();
    loadVolunteers();
    loadTips();
  }, []);

  // ---- ALERTS ----
  const submitAlert = async (e) => {
    e.preventDefault();
    if (!alertForm.title || !alertForm.message) {
      alert("Please fill all fields");
      return;
    }
    const res = await fetch("http://localhost:5000/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alertForm),
    });
    if (res.ok) {
      const newAlert = await res.json();
      setAlerts((prev) => [
        ...prev,
        { ...newAlert, id: newAlert.id || newAlert._id },
      ]);
      setAlertForm({ title: "", message: "" });
    }
  };

  const deleteAlert = async (id) => {
    await fetch(`http://localhost:5000/api/alerts/${id}`, { method: "DELETE" });
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  // ---- VOLUNTEERS ----
  const addVolunteer = async (e) => {
    e.preventDefault();

    if (
      !volunteerForm.name ||
      !volunteerForm.role ||
      !volunteerForm.contact ||
      !volunteerForm.email
    ) {
      alert("Please fill all fields");
      return;
    }
    if (!/^\d{10}$/.test(volunteerForm.contact)) {
      alert("Contact must be a 10-digit number");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(volunteerForm.email)) {
      alert("Invalid email address");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteerForm),
      });

      if (!res.ok) throw new Error("Failed to add volunteer");

      const newVolunteer = await res.json();
      const normalized = {
        ...newVolunteer,
        id: newVolunteer.id || newVolunteer._id,
      };

      setVolunteers((prev) => [...prev, normalized]);
      setVolunteerForm({ name: "", role: "", contact: "", email: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteVolunteer = async (id) => {
    await fetch(`http://localhost:5000/api/volunteers/${id}`, {
      method: "DELETE",
    });
    setVolunteers((prev) => prev.filter((v) => v.id !== id));
  };

  // ---- TIPS ----
  const submitTip = async (e) => {
    e.preventDefault();
    if (!tipForm.title || !tipForm.content) {
      alert("Please fill all fields");
      return;
    }
    const res = await fetch("http://localhost:5000/api/tips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tipForm),
    });
    if (res.ok) {
      const newTip = await res.json();
      setTips((prev) => [...prev, { ...newTip, id: newTip.id || newTip._id }]);
      setTipForm({ title: "", content: "" });
    }
  };

  const deleteTip = async (id) => {
    await fetch(`http://localhost:5000/api/tips/${id}`, { method: "DELETE" });
    setTips((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow space-y-4">
      {/* Tabs */}
      <div className="flex space-x-3 border-b pb-2">
        <button
          onClick={() => setTab("alerts")}
          className={`px-3 py-1 rounded-lg ${
            tab === "alerts" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Manage Alerts
        </button>
        <button
          onClick={() => setTab("volunteers")}
          className={`px-3 py-1 rounded-lg ${
            tab === "volunteers" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Volunteers
        </button>
        <button
          onClick={() => setTab("tips")}
          className={`px-3 py-1 rounded-lg ${
            tab === "tips" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Safety Tips
        </button>
      </div>

      {/* Alerts */}
      {tab === "alerts" && (
        <div>
          <h3 className="font-semibold mb-2">Post a New Alert</h3>
          <form onSubmit={submitAlert} className="space-y-2">
            <input
              className="w-full border p-2 rounded-lg"
              placeholder="Title"
              value={alertForm.title}
              onChange={(e) =>
                setAlertForm({ ...alertForm, title: e.target.value })
              }
            />
            <textarea
              className="w-full border p-2 rounded-lg"
              placeholder="Message"
              value={alertForm.message}
              onChange={(e) =>
                setAlertForm({ ...alertForm, message: e.target.value })
              }
            ></textarea>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
              Publish
            </button>
          </form>

          <ul className="mt-4 space-y-2">
            {alerts.map((a) => (
              <li
                key={a.id}
                className="border p-2 rounded-lg flex justify-between"
              >
                <div>
                  <strong>{a.title}</strong> - {a.message}
                </div>
                <button
                  onClick={() => deleteAlert(a.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
            {alerts.length === 0 && (
              <p className="text-gray-500 text-sm">No alerts yet.</p>
            )}
          </ul>
        </div>
      )}

      {/* Volunteers */}
      {tab === "volunteers" && (
        <div>
          <h3 className="font-semibold mb-2">Register Volunteer</h3>
          <form onSubmit={addVolunteer} className="space-y-2">
            <input
              className="w-full border p-2 rounded-lg"
              placeholder="Full Name"
              value={volunteerForm.name}
              onChange={(e) =>
                setVolunteerForm({ ...volunteerForm, name: e.target.value })
              }
            />
            <input
              className="w-full border p-2 rounded-lg"
              placeholder="Role (e.g., Medical, Rescue)"
              value={volunteerForm.role}
              onChange={(e) =>
                setVolunteerForm({ ...volunteerForm, role: e.target.value })
              }
            />
            <input
              type="tel"
              className="w-full border p-2 rounded-lg"
              placeholder="10-digit Contact Number"
              value={volunteerForm.contact}
              onChange={(e) =>
                setVolunteerForm({
                  ...volunteerForm,
                  contact: e.target.value.replace(/\D/g, "").slice(0, 10),
                })
              }
            />
            <input
              type="email"
              className="w-full border p-2 rounded-lg"
              placeholder="Email Address"
              value={volunteerForm.email}
              onChange={(e) =>
                setVolunteerForm({ ...volunteerForm, email: e.target.value })
              }
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
              Add Volunteer
            </button>
          </form>

          <ul className="mt-4 space-y-2">
            {volunteers.map((v) => (
              <li
                key={v.id}
                className="border p-2 rounded-lg flex justify-between"
              >
                <div>
                  <strong>{v.name}</strong> ({v.role}) - {v.contact} |{" "}
                  <span className="text-sm text-gray-600">{v.email}</span>
                </div>
                <button
                  onClick={() => deleteVolunteer(v.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
            {volunteers.length === 0 && (
              <p className="text-gray-500 text-sm">No volunteers yet.</p>
            )}
          </ul>
        </div>
      )}

      {/* Safety Tips */}
      {tab === "tips" && (
        <div>
          <h3 className="font-semibold mb-2">Add a Safety Tip</h3>
          <form onSubmit={submitTip} className="space-y-2">
            <input
              className="w-full border p-2 rounded-lg"
              placeholder="Title"
              value={tipForm.title}
              onChange={(e) => setTipForm({ ...tipForm, title: e.target.value })}
            />
            <textarea
              className="w-full border p-2 rounded-lg"
              placeholder="Content"
              value={tipForm.content}
              onChange={(e) =>
                setTipForm({ ...tipForm, content: e.target.value })
              }
            ></textarea>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
              Save
            </button>
          </form>

          <ul className="mt-4 space-y-2">
            {tips.map((t) => (
              <li
                key={t.id}
                className="border p-2 rounded-lg flex justify-between"
              >
                <div>
                  <strong>{t.title}</strong> - {t.content}
                </div>
                <button
                  onClick={() => deleteTip(t.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
            {tips.length === 0 && (
              <p className="text-gray-500 text-sm">No tips yet.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
