import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import Header from "./components/Header";
//import userContext from "./hooks/useUser";
import "./App.css";

const App = () => {
  return (
    <Grid container>
      <Header />
      <Outlet />
    </Grid>
  );
};

export default App;
