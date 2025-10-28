import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";   // ✅ use your app.jsx
import "./styles.css";        // ✅ tailwind styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
