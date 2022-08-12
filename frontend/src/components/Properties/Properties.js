import React, { useContext, useEffect } from "react";
import { Stack, Paper, Box } from "@mui/material";
import RoleContext from "../useRole";
import PropertyCard from "./PropertyCard";
import Loading from "../Loading";
import axios from "../axios";

const Properties = () => {
  const { buildings, setBuildings } = useContext(RoleContext);

  const getProperties = async () => {
    await axios
      .get("/land")
      .then((res) => {
        setBuildings(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProperties();
    const id = setInterval(() => {
      getProperties();
    }, 5000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardComponents = buildings.map((item) => PropertyCard(item));

  if (buildings.length === 0) {
    return <Loading />;
  } else {
    return (
      <>
        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            paddingTop: "80px",
            paddingBottom: "1vh",
            margin: "auto",
          }}
        >
          <Box
            sx={{
              margin: "auto",
            }}
          />
          <Stack
            spacing={2}
            sx={{
              marginLeft: "5vw",
              marginRight: "5vw",
              width: "90vw",
            }}
          >
            {cardComponents}
          </Stack>
          <Box
            sx={{
              marginBottom: "80px",
              marginLeft: "5vw",
              marginRight: "5vw",
            }}
          />
        </Paper>
      </>
    );
  }
};
export default Properties;
