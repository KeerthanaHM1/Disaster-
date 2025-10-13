import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 1. Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/disasterdb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ 2. Define Schema and Model
const alertSchema = new mongoose.Schema({
  title: String,
  message: String,
  type: String,      // e.g. flood, fire, medical
  createdAt: { type: Date, default: Date.now },
});

const Alert = mongoose.model("Alert", alertSchema);

// ✅ 3. API Routes

// Get all alerts (for all users)
app.get("/api/alerts", async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 });
  res.json(alerts);
});

// Create a new alert (for volunteers/admin)
app.post("/api/alerts", async (req, res) => {
  const newAlert = new Alert(req.body);
  await newAlert.save();
  res.status(201).json(newAlert);
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
