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
  const data = [
    "太空總部",
    "航母總部",
    "帝國大廈",
    "倫敦至聖所",
    "泰坦星",
    "弗米爾星",
    "虛無之地",
    "神盾局",
    "香港至聖所",
    "復聯總部",
    "天劍局",
    "瓦甘達",
    "邊境部落",
    "亞特蘭提斯",
    "紐約至聖所",
    "阿斯嘉",
    "彩虹橋",
    "英靈殿",
    "史塔克總部",
    "卡瑪泰姬",
    "大羅",
    "多摩",
  ];
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
            {data.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
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
            <MenuItem value={0}>0</MenuItem>
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
