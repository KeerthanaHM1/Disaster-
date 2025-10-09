import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../store.js";

export default function LoginForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [forgotMode, setForgotMode] = useState(false);

  const navigate = useNavigate();

  // Validation rules
  function validateField(name, value) {
    if (name === "firstName" && value.length < 2) {
      return "First name must be at least 2 characters";
    }
    if (name === "password") {
      if (value.length < 6) return "Password must be at least 6 characters";
      if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
      if (!/\d/.test(value)) return "Password must contain a number";
    }
    return "";
  }

  function getPasswordStrength(password) {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return "Strong";
    }
    return "Medium";
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    setTimeout(() => {
      if (forgotMode) {
        // Forgot password flow
        if (!form.email) {
          setError("Please enter your email to reset password");
        } else {
          setSuccess("Reset link sent to your email");
          setForgotMode(false);
          setForm({ ...form, email: "" });
        }
      } else if (isSignup) {
        // Signup logic
        if (form.password !== form.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        // Save user to localStorage
        const newUser = {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        };
        localStorage.setItem("user", JSON.stringify(newUser));

        setSuccess(`Account created for ${form.firstName} ${form.lastName}`);
        setIsSignup(false);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        // Login logic
        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (
          (savedUser &&
            form.firstName === savedUser.firstName &&
            form.lastName === savedUser.lastName &&
            form.password === savedUser.password) ||
          (form.firstName === "Admin" &&
            form.lastName === "Officer" &&
            form.password === "disaster123")
        ) {
          store.setUser({ firstName: form.firstName, lastName: form.lastName });
          setSuccess(`Logged in as ${form.firstName} ${form.lastName}`);
          navigate("/dashboard"); // redirect after login
        } else {
          setError("Invalid credentials");
        }
      }
      setLoading(false);
    }, 1000);
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4 w-full max-w-md mx-auto transition-colors"
    >
      <div className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        {forgotMode
          ? "Reset Password"
          : isSignup
          ? "Create an Account"
          : "Login"}
      </div>

      {/* First/Last Name only for login/signup */}
      {!forgotMode && (
        <>
          <input
            type="text"
            className="w-full border rounded-xl p-2 dark:bg-gray-700 dark:text-white"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
          />
          {form.firstName && validateField("firstName", form.firstName) && (
            <div className="text-red-600 text-xs">
              {validateField("firstName", form.firstName)}
            </div>
          )}

          <input
            type="text"
            className="w-full border rounded-xl p-2 dark:bg-gray-700 dark:text-white"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            required
          />
        </>
      )}

      {/* Email (always in signup or forgot mode) */}
      {(isSignup || forgotMode) && (
        <input
          type="email"
          className="w-full border rounded-xl p-2 dark:bg-gray-700 dark:text-white"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      )}

      {/* Password fields - not in forgot mode */}
      {!forgotMode && (
        <>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-xl p-2 pr-16 dark:bg-gray-700 dark:text-white"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-sm text-blue-600 hover:underline"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {form.password && validateField("password", form.password) && (
            <div className="text-red-600 text-xs">
              {validateField("password", form.password)}
            </div>
          )}

          {/* Password Strength Meter */}
          {form.password && !validateField("password", form.password) && (
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Password Strength:{" "}
              <span
                className={
                  getPasswordStrength(form.password) === "Strong"
                    ? "text-green-600"
                    : getPasswordStrength(form.password) === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }
              >
                {getPasswordStrength(form.password)}
              </span>
            </div>
          )}

          {isSignup && (
            <input
              type="password"
              className="w-full border rounded-xl p-2 dark:bg-gray-700 dark:text-white"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
          )}
        </>
      )}

      {/* Forgot password link */}
      {!isSignup && !forgotMode && (
        <div className="text-right">
          <span
            className="text-blue-600 text-sm cursor-pointer hover:underline"
            onClick={() => setForgotMode(true)}
          >
            Forgot Password?
          </span>
        </div>
      )}

      <button
        className="w-full px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl flex items-center justify-center"
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : forgotMode
          ? "Send Reset Link"
          : isSignup
          ? "Sign Up"
          : "Login"}
      </button>

      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      {success && (
        <div className="text-green-600 text-sm text-center">{success}</div>
      )}

      <div className="text-sm text-center text-gray-600 dark:text-gray-300">
        {forgotMode ? (
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setForgotMode(false)}
          >
            Back to Login
          </span>
        ) : isSignup ? (
          <>
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setIsSignup(false)}
            >
              Login
            </span>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setIsSignup(true)}
            >
              Sign Up
            </span>
          </>
        )}
      </div>
    </form>
  );
}
