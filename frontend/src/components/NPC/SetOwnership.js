import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  InputLabel,
  Select,
  MenuItem,
  // TextField,
  Typography,
  Box,
  Button,
  FormControl,
} from "@mui/material";
import RoleContext from "../useRole";
import axios from "../axios";

const SetOwnership = () => {
  const [team, setTeam] = useState("Select Team");
  const [building, setBuilding] = useState("Select Building");
  const [num, setNum] = useState(0);
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  const data = [
    { id: 2, title: "太空總部" },
    { id: 3, title: "航母總部" },
    { id: 5, title: "帝國大廈" },
    { id: 6, title: "倫敦至聖所" },
    { id: 8, title: "泰坦星" },
    { id: 9, title: "弗米爾星" },
    { id: 12, title: "虛無之地" },
    { id: 15, title: "神盾局" },
    { id: 16, title: "香港至聖所" },
    { id: 18, title: "復聯總部" },
    { id: 19, title: "天劍局" },
    { id: 22, title: "瓦甘達" },
    { id: 23, title: "邊境部落" },
    { id: 25, title: "亞特蘭提斯" },
    { id: 26, title: "紐約至聖所" },
    { id: 28, title: "阿斯嘉" },
    { id: 29, title: "彩虹橋" },
    { id: 32, title: "英靈殿" },
    { id: 35, title: "史塔克總部" },
    { id: 36, title: "卡瑪泰姬" },
    { id: 38, title: "大羅" },
    { id: 39, title: "多摩" },
  ];
  const handleClick = async () => {
    const payload = { team: team, land: building, level: num };
    await axios.post("/ownership", payload);
    console.log("Hi");
    navigate("/properties");
  };

  useEffect(() => {
    if (role === "") {
      navigate("/permission");
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
        <FormControl variant="standard" sx={{ minWidth: 215, marginTop: 2 }}>
          <InputLabel id="building">Building</InputLabel>
          <Select
            value={building}
            labelId="building"
            onChange={(e) => {
              setBuilding(e.target.value);
            }}
          >
            <MenuItem value={"Select Building"}>Select Building</MenuItem>
            {data.map((item) => (
              <MenuItem value={item.title}>
                {item.id} {item.title}
              </MenuItem>
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
          <InputLabel id="num-building">Building Level</InputLabel>
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
            disabled={team === "Select Team"}
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
