import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./components/Home";
import Notifications from "./components/Notifications";
import Teams from "./components/Teams/Teams";
import Properties from "./components/Properties/Properties";
import LogIn from "./components/LogIn";
import SetMoney from "./components/NPC/SetMoney";
import SetOwnership from "./components/NPC/SetOwnership";
import Transfer from "./components/NPC/Transfer";
import SetShopLevel from "./components/NPC/SetShopLevel";
import Event from "./components/admin/Event";
import Additional from "./components/admin/Additional";
import SetOccupation from "./components/admin/SetOccupation";
import PermissionDenied from "./components/PermissionDenied";
import Footer from "./components/Footer";
import RoleContext from "./components/useRole";
import Loading from "./components/Loading";
import theme from "./theme";
// import { socket, SocketContext } from "./websocket";

const App = () => {
  const [role, setRole] = useState("");
  const [teams, setTeams] = useState([]);
  const [phase, setPhase] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const value = {
    role,
    setRole,
    teams,
    setTeams,
    phase,
    setPhase,
    buildings,
    setBuildings,
    filteredBuildings,
    setFilteredBuildings,
  };

  return (
    // <SocketContext.Provider value={socket}>
    <ThemeProvider theme={theme}>
      <RoleContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="/" element={<Home />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="teams" element={<Teams />} />
              <Route path="properties" element={<Properties />} />
              <Route path="login" element={<LogIn />} />
              <Route path="setmoney" element={<SetMoney />} />
              <Route path="setownership" element={<SetOwnership />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="setshop" element={<SetShopLevel />} />
              <Route path="event" element={<Event />} />
              <Route path="additional" element={<Additional />} />
              <Route path="setoccupation" element={<SetOccupation />} />
              <Route path="permission" element={<PermissionDenied />} />
              <Route path="loading" element={<Loading />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </RoleContext.Provider>
    </ThemeProvider>
    // </SocketContext.Provider>
  );
};

export default App;
