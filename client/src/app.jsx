import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AlertFeed from "./components/AlertFeed.jsx";
import VolunteerForm from "./components/VolunteerForm.jsx";
import EmergencyContacts from "./components/EmergencyContacts.jsx";
import TipsGrid from "./components/TipsGrid.jsx";
import LoginForm from "./components/LoginForm.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

export default function App() {
  return (
    <Router>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          🌐 Disaster Management Platform
        </h1>

        {/* Navigation */}
        <nav className="flex justify-center space-x-4">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Admin Dashboard</Link>
        </nav>

        <Routes>
          {/* ✅ Real homepage with components */}
          <Route
            path="/"
            element={
              <>
                <AlertFeed />
                <EmergencyContacts />
                <VolunteerForm />
                <TipsGrid />
              </>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
