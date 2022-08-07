import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import Notifications from "./components/Notifications";
import Teams from "./components/Teams/Teams";
import Properties from "./components/Properties/Properties";
import LogIn from "./components/LogIn";
import SetMoney from "./components/NPC/SetMoney";
import SetOwnership from "./components/NPC/SetOwnership";
import Transfer from "./components/NPC/Transfer";
import Event from "./components/admin/Event";
import Additional from "./components/admin/Additional";
import RoleContext from "./components/useRole";
import theme from "./theme";

const App = () => {
  const [role, setRole] = useState("");
  const value = { role, setRole };
  return (
    <ThemeProvider theme={theme}>
      <RoleContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="notifications" element={<Notifications />} />
              <Route path="teams" element={<Teams />} />
              <Route path="properties" element={<Properties />} />
              <Route path="login" element={<LogIn />} />
              <Route path="setmoney" element={<SetMoney />} />
              <Route path="setownership" element={<SetOwnership />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="event" element={<Event />} />
              <Route path="additional" element={<Additional />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RoleContext.Provider>
    </ThemeProvider>
  );
};

export default App;
