import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Notifications from "./components/Notifications";
import Teams from "./components/Teams/Teams";
import Properties from "./components/Properties/Properties";

import theme from "./theme";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="notifications" element={<Notifications />} />
          <Route path="teams" element={<Teams />} />
          <Route path="properties" element={<Properties />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
