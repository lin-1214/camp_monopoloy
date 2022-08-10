import React, { useState, useEffect } from "react";
import { Stack, Grid, Paper, Box, Typography } from "@mui/material";
import axios from "../axios";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  const colors = {
    Go: "rgb(160,160,160)",
    Building: {
      1: "rgb(255,102,102)",
      2: "rgb(255,204,153)",
      3: "rgb(255,255,153)",
      4: "rgb(204,255,153)",
      5: "rgb(153,255,255)",
      6: "rgb(204,153,205)",
    },
    SpecialBuilding: "rgb(255,153,255)",
    Chance: "rgb(160,160,160)",
    Jail: "rgb(160,160,160)",
    ToJail: "rgb(160,160,160)",
    Event: "rgb(51,153,255)",
    Store: "rgb(51,153,255)",
    Game: "rgb(51,153,255)",
  };

  const getProperties = async () => {
    axios
      .get("/land")
      .then((res) => {
        setProperties(res.data);
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
  }, []);

  const cardComponent = ({
    id,
    type,
    area,
    name,
    owner,
    description,
    level,
  }) => {
    const colorData = type === "Building" ? colors[type][area] : colors[type];
    return (
      <Paper
        elevation={2}
        key={id}
        sx={{
          height: "60px",
          borderLeft: 8,
          borderColor: colorData,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h6">{id}</Typography>
          </Grid>
          <Grid item xs={7} container direction="column">
            <Grid item>
              <Typography marginTop="2px" variant="h6">
                {name}
              </Typography>
            </Grid>
            {type === "Building" || type === "SpecialBuilding" ? (
              <Grid item>
                <Typography variant="body2">{owner}</Typography>
              </Grid>
            ) : (
              <Grid item>
                <Typography variant="caption">{description}</Typography>
              </Grid>
            )}
          </Grid>
          {type === "Building" && (
            <Grid
              item
              xs={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle2">{level}</Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    );
  };

  const cardComponents = properties.map((item) => cardComponent(item));

  return (
    <>
      <Box
        sx={{
          paddingTop: "80px",
          margin: "auto",
        }}
      />
      <Stack
        spacing={2}
        sx={{
          marginLeft: "20px",
          marginRight: "20px",
          width: "500px",
        }}
      >
        {cardComponents}
        <Box
          sx={{
            marginBottom: "80px",
            margin: "auto",
          }}
        />
      </Stack>
    </>
  );
};
export default Properties;
