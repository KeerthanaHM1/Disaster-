// src/components/LoginForm.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { store } from "../store.js";
import { useState } from "react";

export default function LoginForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !password.trim()) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    if (isSignup) {
      // Save new account in localStorage
      const newUser = { firstName, lastName, password };
      localStorage.setItem("registeredUser", JSON.stringify(newUser));
      alert("✅ Account created successfully! Please log in now.");
      setIsSignup(false); // Switch to login mode after signup
      setFirstName("");
      setLastName("");
      setPassword("");
      return;
    } else {
      // Login check
      const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
      if (
        savedUser &&
        savedUser.firstName === firstName &&
        savedUser.lastName === lastName &&
        savedUser.password === password
      ) {
        // Successful login
        const user = { firstName, lastName, rememberMe };
        store.setUser(user);
        alert(`👋 Welcome, ${firstName}! Redirecting to Admin Dashboard...`);
        navigate("/dashboard");
      } else {
        alert("❌ Incorrect login details. Please try again or sign up first.");
      }
    }
  };

  const handleForgotPassword = () => {
    alert("🔑 Password reset link has been sent to your registered email!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          {isSignup ? "Create Account" : "Login to Continue"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Remember Me + Forgot Password */}
          {!isSignup && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-blue-600"
                />
                <span>Remember Me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Switch between Login and Signup */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setFirstName("");
              setLastName("");
              setPassword("");
            }}
            className="text-blue-600 hover:underline font-medium"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
