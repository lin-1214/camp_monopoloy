import React, { useState, useEffect, useContext } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useNavigate } from "react-router-dom";
import {
  Container,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import PropertyCard from "../Properties/PropertyCard";
import Loading from "../Loading";
import RoleContext from "../useRole";
import axios from "../axios";

const SetOwnership = () => {
  const [team, setTeam] = useState(-1);
  const [building, setBuilding] = useState(-1);
  const [buildingData, setBuildingData] = useState({});
  const [level, setLevel] = useState(1);
  const [prefill, setPrefill] = useState(false);
  const [open, setOpen] = useState(false);
  const { role, filteredBuildings } = useContext(RoleContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // eslint-disable-line no-unused-vars
  const prefillTeams = searchParams.get("team");
  const prefillBuilding = searchParams.get("id");
  // console.log(prefillBuilding);
  // console.log(prefillTeams);

  const handleClick = async () => {
    const payload = { teamId: team, land: buildingData.name, level };
    await axios.post("/ownership", payload);
    navigate("/properties?id=" + buildingData.id);
  };

  const handleTeam = async (team) => {
    if (team === 0) {
      setLevel(0);
    }
    setTeam(team);
  };

  const handleBuilding = async (building) => {
    const { data } = await axios.get("/land/" + building);
    setBuilding(building);
    setBuildingData(data);
    setLevel(data.level + 1);
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (role === "") {
      navigate("/permission");
    }
    if (!prefill && prefillBuilding !== null && prefillTeams !== null) {
      handleTeam(parseInt(prefillTeams));
      handleBuilding(parseInt(prefillBuilding));
      setPrefill(true);
      console.log("prefilled");
    } else {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillBuilding, prefillTeams]);

  if (filteredBuildings.length === 0) {
    return <Loading />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Set Ownership
          </Typography>
          <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
            <InputLabel id="building">Building</InputLabel>
            <Select
              value={building}
              labelId="building"
              onChange={(e) => {
                handleBuilding(e.target.value);
              }}
            >
              <MenuItem value={-1}>Select Building</MenuItem>
              {filteredBuildings.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.id} {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
            <InputLabel id="team-ownership">Team</InputLabel>
            <Select
              value={team}
              labelId="team-ownership"
              onChange={(e) => {
                handleTeam(e.target.value);
              }}
            >
              <MenuItem value={-1}>Select Team</MenuItem>
              <MenuItem value={0}>N/A</MenuItem>
              <MenuItem value={1}>第1小隊</MenuItem>
              <MenuItem value={2}>第2小隊</MenuItem>
              <MenuItem value={3}>第3小隊</MenuItem>
              <MenuItem value={4}>第4小隊</MenuItem>
              <MenuItem value={5}>第5小隊</MenuItem>
              <MenuItem value={6}>第6小隊</MenuItem>
              <MenuItem value={7}>第7小隊</MenuItem>
              <MenuItem value={8}>第8小隊</MenuItem>
            </Select>
            {team !== buildingData.owner && team !== -1 ? (
              <FormHelperText>Owner has Change!!!</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
            <InputLabel id="level-building">Building Level</InputLabel>
            <Select
              value={level}
              labelId="level-building"
              disabled={team === 0}
              onChange={(e) => {
                setLevel(e.target.value);
              }}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
            {level - buildingData.level !== 1 && team !== -1 ? (
              <FormHelperText>Not Upgrading 1 level!!!</FormHelperText>
            ) : null}
            {/* <Button
              disabled={team === -1 || building === -1}
              onClick={handleClick}
              sx={{ marginTop: 2 }}
            >
              Submit
            </Button> */}
            <Button
                  variant="contained"
                  disabled={team === -1 || building === -1}
                  onClick={handleClick}
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  <SendIcon />
                </Button>
          </FormControl>
          {!(team === -1 || building === -1) ? (
            <>
              <Typography component="h2" variant="h6" sx={{ marginBottom: 2 }}>
                Preview
              </Typography>
              <PropertyCard {...buildingData} hawkEye={-1} />
              <KeyboardDoubleArrowDownIcon />
              <PropertyCard
                {...buildingData}
                level={level}
                owner={team}
                hawkEye={-1}
              />
            </>
          ) : null}
        </Box>
        <Snackbar open={open} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            sx={{ width: "100%" }}
            severity={"warning"}
          >
            Not from Add Money!
          </Alert>
        </Snackbar>
      </Container>
    );
  }
};

export default SetOwnership;
