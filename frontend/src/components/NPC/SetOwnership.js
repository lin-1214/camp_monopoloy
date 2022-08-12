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
} from "@mui/material";
import PropertyCard from "../Properties/PropertyCard";
import RoleContext from "../useRole";
import axios from "../axios";

const SetOwnership = () => {
  const [team, setTeam] = useState("Select Team");
  const [building, setBuilding] = useState(-1);
  const [buildingData, setBuildingData] = useState({});
  const [level, setLevel] = useState(0);
  const { role, buildings, setBuildings } = useContext(RoleContext);
  const [data, setData] = useState(
    buildings.filter((building) => building.type === "Building")
  );
  const navigate = useNavigate();

  const handleClick = async () => {
    const payload = { team, land: buildingData.name, level };
    await axios.post("/ownership", payload);
    navigate("/properties");
  };

  const handleTeam = async (team) => {
    if (team === "N/A") {
      setLevel(0);
    }
    setTeam(team);
  };

  const handleBuilding = async (building) => {
    const { data } = await axios.get("/land/" + building);
    setBuilding(building);
    setBuildingData(data);
  };

  useEffect(() => {
    if (role === "") {
      navigate("/permission");
    }
    if (buildings.length === 0) {
      axios
        .get("/land")
        .then((res) => {
          setBuildings(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setData(buildings.filter((building) => building.type === "building"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {data.map((item) => (
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
            <MenuItem value={"Select Team"}>Select Team</MenuItem>
            <MenuItem value={"N/A"}>N/A</MenuItem>
            <MenuItem value={"第1小隊"}>第1小隊</MenuItem>
            <MenuItem value={"第2小隊"}>第2小隊</MenuItem>
            <MenuItem value={"第3小隊"}>第3小隊</MenuItem>
            <MenuItem value={"第4小隊"}>第4小隊</MenuItem>
            <MenuItem value={"第5小隊"}>第5小隊</MenuItem>
            <MenuItem value={"第6小隊"}>第6小隊</MenuItem>
            <MenuItem value={"第7小隊"}>第7小隊</MenuItem>
            <MenuItem value={"第8小隊"}>第8小隊</MenuItem>
          </Select>
          {team !== buildingData.owner && team !== "Select Team" ? (
            <FormHelperText>Owner has Change!!!</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
          <InputLabel id="level-building">Building Level</InputLabel>
          <Select
            value={level}
            labelId="level-building"
            disabled={team === "N/A"}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
          <Button
            disabled={team === "Select Team" || building === -1}
            onClick={handleClick}
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </FormControl>
        {!(team === "Select Team" || building === -1) ? (
          <>
            <Typography component="h2" variant="h6" sx={{ marginBottom: 2 }}>
              Preview
            </Typography>
            <PropertyCard {...buildingData} />
            <KeyboardDoubleArrowDownIcon />
            <PropertyCard {...buildingData} level={level} owner={team} />
          </>
        ) : null}
      </Box>
    </Container>
  );
};

export default SetOwnership;
