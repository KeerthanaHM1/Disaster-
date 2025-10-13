// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AlertFeed from "./components/AlertFeed.jsx";
import VolunteerForm from "./components/VolunteerForm.jsx";
import EmergencyContacts from "./components/EmergencyContacts.jsx";
import TipsGrid from "./components/TipsGrid.jsx";
import LoginForm from "./components/LoginForm.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import { store } from "./store.js";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setUser(store.getUser()));
    setUser(store.getUser());
    return unsubscribe;
  }, []);

  return (
    <Router>
      <MainApp user={user} setUser={setUser} />
    </Router>
  );
}

function MainApp({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Protect route helper
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      // Redirect to login, but remember where we came from
      return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
    }
    return children;
  };

  const handleLogout = () => {
    store.setUser(null);
    setUser(null);
    navigate("/home");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
        🌐 Disaster Management Platform
      </h1>

      {/* Navbar */}
      <nav className="flex justify-center space-x-4">
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Admin Dashboard</Link>
        {user ? (
          <button onClick={handleLogout} className="text-red-600">Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <Routes>
        {/* Default route: go to Home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Home page — open for everyone */}
        <Route
          path="/home"
          element={
            <>
              <AlertFeed />
              <EmergencyContacts />
              <VolunteerForm />
              <TipsGrid />
            </>
          }
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={<LoginForm />}
        />

        {/* Protected Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}
