import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, SwipeableDrawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavBar from "./NavBar/NavBar";

const Header = ({ click }) => {
  const [open, setOpen] = useState(false);
  const handleChange = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="absolute">
      <Toolbar>
        <IconButton
          onClick={handleChange}
          sx={{ justifyContent: "flex-start" }}
        >
          <MenuIcon />
          <NavBar open={open} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
