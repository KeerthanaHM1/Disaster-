import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory DB
let alerts = [];
let volunteers = [];
let tips = [];

// ✅ Root
app.get("/", (req, res) => {
  res.send("🚨 Disaster Alert Backend is running!");
});

// ---- Alerts ----
app.post("/api/alerts", (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: "Title and message required" });
  }
  const newAlert = { id: Date.now(), title, message };
  alerts.push(newAlert);
  res.json(newAlert);
});

app.get("/api/alerts", (req, res) => res.json(alerts));

app.delete("/api/alerts/:id", (req, res) => {
  const id = Number(req.params.id);
  alerts = alerts.filter((a) => a.id !== id);
  res.json({ success: true });
});

// ---- Volunteers ----
app.post("/api/volunteers", (req, res) => {
  const { name, role, contact, email } = req.body;
  if (!name || !role || !contact || !email) {
    return res.status(400).json({ error: "All fields required" });
  }
  const newVolunteer = { id: Date.now(), name, role, contact, email };
  volunteers.push(newVolunteer);
  res.json(newVolunteer);
});

app.get("/api/volunteers", (req, res) => res.json(volunteers));

app.delete("/api/volunteers/:id", (req, res) => {
  const id = Number(req.params.id);
  volunteers = volunteers.filter((v) => v.id !== id);
  res.json({ success: true });
});

// ---- Tips ----
app.post("/api/tips", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "All fields required" });
  }
  const newTip = { id: Date.now(), title, content };
  tips.push(newTip);
  res.json(newTip);
});

app.get("/api/tips", (req, res) => res.json(tips));

app.delete("/api/tips/:id", (req, res) => {
  const id = Number(req.params.id);
  tips = tips.filter((t) => t.id !== id);
  res.json({ success: true });
});

// ---- Start Server ----
app.listen(5000, () =>
  console.log("🚨 Disaster Alert Backend is running on http://localhost:5000")
);
