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
          borderLeft: 8,
          borderColor: colorData,
          paddingTop: 0.5,
          paddingBottom: 0.5,
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
          <Grid item xs={7}>
            <Grid item>
              <Typography variant="h6" marginTop="1px">
                {name}
              </Typography>
            </Grid>
            {type === "Building" || type === "SpecialBuilding" ? (
              <Grid item>
                <Typography variant="caption">
                  {owner === "N/A" ? <br /> : owner}
                </Typography>
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
};
export default Properties;
