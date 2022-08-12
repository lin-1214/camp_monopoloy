import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

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

const PropertyCard = ({ id, type, area, name, owner, description, level }) => {
  const colorData = type === "Building" ? colors[type][area] : colors[type];
  let levelIcon = [];
  for (let i = 0; i < 3; i++) {
    if (i < level) {
      levelIcon.push(
        // <HomeRoundedIcon style={{ color: "rgb(51,153,255)" }} key={i} />
        <HomeRoundedIcon style={{ color: "#63f74f" }} key={i} />
      );
    } else {
      levelIcon.push(
        <HomeRoundedIcon style={{ color: "rgb(160,160,160)" }} key={i} />
      );
    }
  }
  return (
    <Paper
      elevation={2}
      key={id}
      sx={{
        borderLeft: 10,
        borderColor: colorData,
        paddingTop: 0.5,
        paddingBottom: 0.5,
        minWidth: "100%",
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
            justifyContent="right"
            paddingRight="1px"
          >
            {levelIcon}
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default PropertyCard;
