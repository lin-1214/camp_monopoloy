import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";

const colors = {
  Go: "rgb(0,0,0)",
  Building: {
    1: "rgb(255,102,102)",
    2: "rgb(255,204,153)",
    3: "rgb(255,255,153)",
    4: "rgb(204,255,153)",
    5: "rgb(153,255,255)",
    6: "rgb(194,163,195)",
  },
  SpecialBuilding: "rgb(255,93,255)",
  Chance: "rgb(128,0,0)",
  Jail: "rgb(128,128,128)",
  ToJail: "rgb(128,128,128)",
  Event: "rgb(0,0,0)",
  Store: "rgb(51,153,255)",
  Game: "rgb(25,73,128)",
};

const PropertyCard = ({
  id,
  ref,
  type,
  area,
  name,
  owner,
  hawkEye,
  description,
  level,
  expanded,
}) => {
  const colorData = type === "Building" ? colors[type][area] : colors[type];
  // console.log(ref);
  let levelIcon = [];
  for (let i = 0; i < 3; i++) {
    if (i < level) {
      levelIcon.push(<HomeRoundedIcon style={{ color: "#63f74f" }} key={i} />);
    } else {
      levelIcon.push(
        <HomeRoundedIcon style={{ color: "rgb(160,160,160)" }} key={i} />
      );
    }
  }

  if (hawkEye >= 0 && hawkEye !== id) {
    //affected
    levelIcon.push(
      <VisibilityIcon style={{ color: "rgb(225,100,100)" }} key={3} />
    );
  } else if (hawkEye >= 0 && hawkEye === id) {
    //self
    levelIcon.push(<VisibilityIcon style={{ color: "#63f74f" }} key={3} />);
  } else if (hawkEye >= 0) {
    levelIcon.push(
      <VisibilityIcon style={{ color: "rgb(160,160,160)" }} key={3} />
    );
  }

  return (
    <Paper
      elevation={2}
      key={id}
      id={id}
      ref={ref}
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
        <Grid item xs>
          <Grid item>
            <Typography variant="h6" marginTop="1px">
              {name}
            </Typography>
          </Grid>
          {type === "Building" || type === "SpecialBuilding" ? (
            <Grid item>
              <Typography variant="caption">
                {owner === 0 ? <br /> : `第${owner}小隊`}
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
            xs={5}
            display="flex"
            alignItems="center"
            justifyContent="right"
            paddingRight="5px"
          >
            {levelIcon}
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default PropertyCard;
