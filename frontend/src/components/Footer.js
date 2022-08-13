import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NPCItems } from "./NavBar/NavBarItem";
import {
  AppBar,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import RoleContext from "./useRole";

const Footer = () => {
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  const handleClick = (name) => {
    navigate(name);
  };
  const mapping = (item) => (
    <ListItem
      button
      key={item.id}
      sx={{ display: "flex", flexDirection: "column", alignContent: "center" }}
      onClick={() => handleClick(item.route)}
    >
      <ListItemIcon
        sx={{ color: "rgb(255,255,255)" }}
        children={item.icon}
      ></ListItemIcon>
      <Typography variant="caption">{item.label}</Typography>
    </ListItem>
  );
  return (
    <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
      <List sx={{ display: "flex", flexDirection: "row", padding: 0 }}>
        {(role === "NPC" || role === "admin") && NPCItems.map(mapping)}
      </List>
    </AppBar>
  );
};

export default Footer;
