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
// import { socket, SocketContext } from "./websocket";

const App = () => {
  const [role, setRole] = useState("");
  const [messages, setMessages] = useState([]);
  const [eventMessage, setEventMessage] = useState({
    title: "none",
    content: "目前沒有事件正在發生...",
  });
  const [teams, setTeams] = useState([]);
  const [permMessages, setPermMessages] = useState([]);
  const [id, setId] = useState(100);
  const value = {
    role,
    setRole,
    teams,
    setTeams,
    messages,
    setMessages,
    eventMessage,
    setEventMessage,
    id,
    setId,
    permMessages,
    setPermMessages,
  };
  return (
    // <SocketContext.Provider value={socket}>
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
    // </SocketContext.Provider>
  );
};

export default App;
