import React, { useState } from "react";
import { Stack, Grid, Paper, Box, Typography } from "@mui/material";
const Properties = () => {
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
    Event: "rgb(51,153,255)",
    Store: "rgb(51,153,255)",
    Game: "rgb(51,153,255)",
  };

  const data = [
    { id: 1, type: "Go", name: "GO 格" },
    {
      id: 2,
      type: "Building",
      area: 1,
      name: "太空總部",
      owner: "N/A",
      level: 2,
    },
    { id: 4, type: "Chance", name: "機會命運" },
    { id: 6, type: "SpecialBuilding", name: "倫敦至聖所", owner: "第一小隊" },
    {
      id: 8,
      type: "Building",
      area: 2,
      name: "泰坦星",
      owner: "第二小隊",
      level: 2,
    },
  ];

  const cardComponent = ({ id, type, area, name, owner, level }) => {
    const colorData = colors[type];
    switch (type) {
      case "Go":
        return <></>;
    }
  };

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
        <Paper
          sx={{
            borderLeft: 5,
            borderColor: "rgb(255,102,102)",
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
              <Typography variant="h6">2</Typography>
            </Grid>
            <Grid item xs={7} container direction="column">
              <Grid item>
                <Typography variant="h6">太空總部</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">第一小隊</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle2">20000</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          sx={{
            borderLeft: 5,
            borderColor: "rgb(255,102,102)",
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
              <Typography variant="h6">2</Typography>
            </Grid>
            <Grid item xs={7} container direction="column">
              <Grid item>
                <Typography variant="h6">太空總部</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">第一小隊</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle2">20000</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </>
  );
};
export default Properties;
