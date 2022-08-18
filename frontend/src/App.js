import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./components/Home";
import Notifications from "./components/Notifications";
import Teams from "./components/Teams/Teams";
import Properties from "./components/Properties/Properties";
import SellProperty from "./components/Properties/SellProperty";
import LogIn from "./components/LogIn";
import AddMoney from "./components/NPC/AddMoney";
import SetOwnership from "./components/NPC/SetOwnership";
import Transfer from "./components/NPC/Transfer";
import SetShopLevel from "./components/NPC/SetShopLevel";
import Event from "./components/admin/Event";
import Additional from "./components/admin/Additional";
import SetOccupation from "./components/admin/SetOccupation";
import SetMoney from "./components/admin/SetMoney";
import PermissionDenied from "./components/PermissionDenied";
import Footer from "./components/Footer";
import RoleContext from "./components/useRole";
import Loading from "./components/Loading";
import Broadcast from "./components/Broadcast";
import { roleIdMap } from "./components/LogIn";
import theme from "./theme";
import { socket, SocketContext } from "./websocket";

const App = () => {
  const localRole = localStorage.getItem("role");
  // console.log(localRole);
  const [navBarId, setNavBarId] = useState(0);
  const [role, setRole] = useState(localRole ? localRole : "");
  const [roleId, setRoleId] = useState(localRole ? roleIdMap[role] : 0);
  const [teams, setTeams] = useState([]);
  const [phase, setPhase] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const value = {
    navBarId,
    setNavBarId,
    role,
    setRole,
    roleId,
    setRoleId,
    teams,
    setTeams,
    phase,
    setPhase,
    buildings,
    setBuildings,
    filteredBuildings,
    setFilteredBuildings,
  };

  const location = useLocation();

  return (
    // <SocketContext.Provider value={socket}>
    <ThemeProvider theme={theme}>
      <RoleContext.Provider value={value}>
        <Header />
        <Broadcast />
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames="fade"
            unmountOnExit
            in={true}
            appear={true}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="teams" element={<Teams />} />
              <Route path="properties" element={<Properties />} />
              <Route path="sellproperty" element={<SellProperty />} />
              <Route path="login" element={<LogIn />} />
              <Route path="addmoney" element={<AddMoney />} />
              <Route path="setownership" element={<SetOwnership />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="setshop" element={<SetShopLevel />} />
              <Route path="event" element={<Event />} />
              <Route path="additional" element={<Additional />} />
              <Route path="setoccupation" element={<SetOccupation />} />
              <Route path="permission" element={<PermissionDenied />} />
              <Route path="loading" element={<Loading />} />
              <Route path="setmoney" element={<SetMoney />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </RoleContext.Provider>
    </ThemeProvider>
    // </SocketContext.Provider>
  );
};

const Root = () => <BrowserRouter><App /></BrowserRouter>; // prettier-ignore

export default Root;
