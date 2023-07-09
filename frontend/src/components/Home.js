import React from "react";
import { Container, Box } from "@mui/material";
// import image from "../banner.jpg";
//put an great made after effect intro video!!
const Home = () => {
  return (
    <Container>
      <Box
        sx={{
          height: "80px",
        }}
      />
      <img
        src="/banner.jpg"
        alt="Avengers"
        style={{
          maxWidth: "100%",
          userSelect: "none",
        }}
      />
    </Container>
  );
};

export default Home;
