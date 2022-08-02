import React, { useState } from "react";
import {
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  SwipeableDrawer,
} from "@mui/material";
import { NavBarItems } from "./NavBarItem";
import { NavBarStyles } from "./NavStyle";
import { useNavigate } from "react-router-dom";

const Navbar = ({ open }) => {
  const [currIndex, setIndex] = useState(0);
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
        {NavBarItems.map((item, index) => (
          <ListItem
            button
            key={item.id}
            onClick={() => handleClick(item.id, item.route)}
            selected={currIndex === item.id}
          >
            <ListItemIcon sx={NavBarStyles.icons}>{item.icon}</ListItemIcon>
            <ListItemText sx={NavBarStyles.text} primary={item.label} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default Navbar;
