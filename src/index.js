import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { cookieProvider } from "react-cookie";
import App from "./App";
import Auth from "./components/auth";
import "./index.css";

function Router() {
  return (
    <BrowserRouter>
      <cookieProvider>
        <Routes>
          <Route exact path="*" element={<Auth />} />
          <Route exact path="/movies" element={<App />} />
        </Routes>
      </cookieProvider>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

