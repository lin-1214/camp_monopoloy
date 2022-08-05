import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  SwipeableDrawer,
} from "@mui/material";
import {
  LogInItems,
  LogOutItems,
  NavBarItems,
  NPCItems,
  adminItems,
} from "./NavBarItem";
import { NavBarStyles } from "./NavStyle";
import RoleContext from "../useRole";

const Navbar = ({ open }) => {
  const [currIndex, setIndex] = useState(0);
  const { role, setRole } = useContext(RoleContext);
  const mapping = (item) => (
    <ListItem
      button
      key={item.id}
      onClick={() => handleClick(item.id, item.route)}
      selected={currIndex === item.id}
    >
      <ListItemIcon sx={NavBarStyles.icons}>{item.icon}</ListItemIcon>
      <ListItemText sx={NavBarStyles.text} primary={item.label} />
    </ListItem>
  );

  const navigate = useNavigate();
  const handleClick = (index, name) => {
    navigate(name);
    setIndex(index);
  };

  return (
    <SwipeableDrawer
      sx={NavBarStyles.drawer}
      variant="temporary"
      anchor="left"
      open={open}
      onOpen={() => {}}
      onClose={() => {}}
    >
      <Toolbar />
      <Divider />
      <List>
        {NavBarItems.map(mapping)}
        {role === "NPC" && NPCItems.map(mapping)}
      </List>
    </SwipeableDrawer>
  );
};

export default Navbar;
