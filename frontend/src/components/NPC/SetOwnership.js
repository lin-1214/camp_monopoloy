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
const SetOwnership = () => {
  const [team, setTeam] = useState(0);
  const [building, setBuilding] = useState(0);
  const [num, setNum] = useState(0);
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("Hi");
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
            <MenuItem value={0}>Select the building</MenuItem>
            <MenuItem value={2}>泰坦星</MenuItem>
            <MenuItem value={3}>弗米爾星</MenuItem>
            <MenuItem value={6}>航母總部</MenuItem>
            <MenuItem value={7}>太空總部</MenuItem>
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
            <MenuItem value={0}>Select Team</MenuItem>
            <MenuItem value={9}>無主地</MenuItem>
            <MenuItem value={1}>第一小隊</MenuItem>
            <MenuItem value={2}>第二小隊</MenuItem>
            <MenuItem value={3}>第三小隊</MenuItem>
            <MenuItem value={4}>第四小隊</MenuItem>
            <MenuItem value={5}>第五小隊</MenuItem>
            <MenuItem value={6}>第六小隊</MenuItem>
            <MenuItem value={7}>第七小隊</MenuItem>
            <MenuItem value={8}>第八小隊</MenuItem>
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
