// src/components/SidebarLayout.jsx
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { store } from "../store.js";

export default function SidebarLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    store.setUser(null);
    navigate("/home");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Sidebar fixed to left edge */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 space-y-6 z-20">
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-4">🛠️ Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            <Link
              to="/dashboard"
              className={`block text-left px-4 py-2 rounded-lg transition ${
                isActive("/dashboard")
                  ? "bg-blue-600 text-white"
                  : "text-blue-700 hover:bg-blue-100"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/emergency-contact"
              className={`block text-left px-4 py-2 rounded-lg transition ${
                isActive("/emergency-contact")
                  ? "bg-blue-600 text-white"
                  : "text-blue-700 hover:bg-blue-100"
              }`}
            >
              Emergency Contact
            </Link>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-100"
        >
          Logout
        </button>
      </aside>

      {/* Main content with margin to avoid overlap */}
      <main className="ml-64 p-6">
        <Outlet />
      </main>
    </>
  );
}
