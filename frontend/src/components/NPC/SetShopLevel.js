import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Box,
  Button,
  FormControl,
} from "@mui/material";
import RoleContext from "../useRole";
import axios from "../axios";

const SetShopLevel = () => {
  const [team, setTeam] = useState(-1);
  const [level, setLevel] = useState(1);
  const { role } = useContext(RoleContext); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  const handleTeam = async (team) => {
    const getTeamLevel = async (team) => {
      const { data } = await axios.get("/team/" + team);
      return data.level;
    };
    const teamLevel = await getTeamLevel(team);
    if (teamLevel === 3) {
      setLevel(3);
    } else {
      setLevel(teamLevel + 1);
    }
    setTeam(team);
  };

  const handleClick = async () => {
    const payload = { teamId: team, level };
    await axios.post("/level", payload); //api
    navigate("/teams");
  };

  useEffect(() => {
    if (role === "") {
      navigate("/permission");
    }
    // axios
    //   .get("/team")
    //   .then((res) => {
    //     setTeams(res.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTeam, setLevel]);

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
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Set Shop Level
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 250 }}>
          <InputLabel id="team-label">Team</InputLabel>
          <Select
            value={team}
            id="team-label"
            onChange={(e) => {
              handleTeam(e.target.value);
            }}
          >
            <MenuItem value={-1}>Select Team</MenuItem>
            <MenuItem value={1}>第1小隊</MenuItem>
            <MenuItem value={2}>第2小隊</MenuItem>
            <MenuItem value={3}>第3小隊</MenuItem>
            <MenuItem value={4}>第4小隊</MenuItem>
            <MenuItem value={5}>第5小隊</MenuItem>
            <MenuItem value={6}>第6小隊</MenuItem>
            <MenuItem value={7}>第7小隊</MenuItem>
            <MenuItem value={8}>第8小隊</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
          <InputLabel id="level-label">Level</InputLabel>
          <Select
            value={level}
            id="level-label"
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
          <Button disabled={team === "Select Team"} onClick={handleClick}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default SetShopLevel;
