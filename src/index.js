// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Asegúrate que este archivo exista y exporte el componente App

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
