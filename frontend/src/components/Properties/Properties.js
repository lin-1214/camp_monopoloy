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
    ToJail: "rgb(160,160,160)",
    Event: "rgb(51,153,255)",
    Store: "rgb(51,153,255)",
    Game: "rgb(51,153,255)",
  };

  const data = [
    { id: 1, type: "Go", name: "GO 格", description: "真是夠格的啊！" },
    {
      id: 2,
      type: "Building",
      area: 1,
      name: "太空總部",
      owner: "N/A",
      level: 2,
    },
    {
      id: 3,
      type: "Building",
      area: 1,
      name: "航母總部",
      owner: "N/A",
      level: 2,
    },
    {
      id: 4,
      type: "Chance",
      name: "機會命運",
      description: "為你的未來重新洗牌！",
    },
    { id: 6, type: "SpecialBuilding", name: "倫敦至聖所", owner: "第一小隊" },
    { id: 7, type: "Game", name: "跳左跳右", description: "細節略" },
    {
      id: 8,
      type: "Building",
      area: 2,
      name: "泰坦星",
      owner: "第二小隊",
      level: 1,
    },
    {
      id: 9,
      type: "Building",
      area: 2,
      name: "弗米爾星",
      owner: "第二小隊",
      level: 2,
    },
    {
      id: 10,
      type: "Chance",
      name: "機會命運",
      description: "為你的未來重新洗牌！",
    },
    { id: 11, type: "Jail", name: "探監", description: "去笑坐牢出來的人吧！" },
    { id: 13, type: "Store", name: "商店", description: "1次可購買1張卡片" },
  ];

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

  const cardComponents = data.map((item) => cardComponent(item));

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
