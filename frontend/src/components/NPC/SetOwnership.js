import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Box,
  Button,
  FormControl,
} from "@mui/material";
import axios from "../axios";

const SetOwnership = () => {
  const [team, setTeam] = useState("Select Team");
  const [building, setBuilding] = useState("");
  const [num, setNum] = useState(0);
  const navigate = useNavigate();
  const handleClick = async () => {
    const payload = { team: team, land: building, level: num };
    await axios.post("/ownership", payload);
    console.log("Hi");
    navigate("/");
  };
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
        <FormControl variant="standard" sx={{ minWidth: 215, marginTop: 2 }}>
          <InputLabel id="building">Building</InputLabel>
          <Select
            value={building}
            labelId="building"
            onChange={(e) => {
              setBuilding(e.target.value);
            }}
          >
            <MenuItem value={"Select the building"}>
              Select the building
            </MenuItem>
            <MenuItem value={"泰坦星"}>泰坦星</MenuItem>
            <MenuItem value={"弗米爾星"}>弗米爾星</MenuItem>
            <MenuItem value={"航母總部"}>航母總部</MenuItem>
            <MenuItem value={"太空總部"}>太空總部</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 215, marginTop: 2 }}>
          <InputLabel id="team-ownership">Team</InputLabel>
          <Select
            value={team}
            labelId="team-ownership"
            onChange={(e) => {
              setTeam(e.target.value);
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
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 215, marginTop: 2 }}>
          <InputLabel id="num-building">Number of Building</InputLabel>
          <Select
            value={num}
            labelId="num-building"
            onChange={(e) => {
              setNum(e.target.value);
            }}
          >
            <MenuItem value={0}>Select building number</MenuItem>
            <MenuItem value={4}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
          <Button
            disabled={team === 0 || building === 0 || num === 0}
            onClick={handleClick}
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default SetOwnership;
