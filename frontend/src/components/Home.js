import React from "react";
import { Container, Box } from "@mui/material";
import image from "../banner.jpg";
//put an great made after effect intro video!!
const Home = () => {
  return (
    <Container>
      <Box sx={{ height: "80px" }} />
      <img src={image} alt="Avengers" style={{ maxWidth: "100%" }} />
    </Container>
  );
};

export default Home;
