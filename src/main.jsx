import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.jsx";
import "./vendor/normalize.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/news_frontend">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
