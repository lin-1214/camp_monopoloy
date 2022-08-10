import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
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
import RoleContext from "../useRole";

const SetMoney = () => {
  const [team, setTeam] = useState("Select Team");
  const [amount, setAmount] = useState(0);
  const { teams, setTeams } = useContext(RoleContext);
  const navigate = useNavigate();
  const handlePercentMoney = async () => {
    if (teams.length === 0) {
      await axios.get("/team");
    }
    const item = teams.find((element) => element.teamname === team); //find the team's money
    const money = item.money;
    setAmount(money * 0.1);
  };

  const handleClick = async () => {
    const payload = { teamname: team, dollar: amount };
    await axios.post("/add", payload);
    navigate("/teams");
  };

  const SimpleMoneyButton = ({ val }) => {
    return (
      <Button
        variant="contained"
        disabled={team === "Select Team"}
        sx={{ marginBottom: 1 }}
        onClick={() => {
          setAmount(val);
        }}
      >
        {val}
      </Button>
    );
  };

  useEffect(() => {
    axios
      .get("/team")
      .then((res) => {
        setTeams(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Set Money
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel id="team-label">Team</InputLabel>
          <Select
            value={team}
            id="team-label"
            onChange={(e) => {
              setTeam(e.target.value);
            }}
          >
            <MenuItem value={"Select Team"}>Select Team</MenuItem>
            <MenuItem value={"第1小隊"}>第1小隊</MenuItem>
            <MenuItem value={"第2小隊"}>第2小隊</MenuItem>
            <MenuItem value={"第3小隊"}>第3小隊</MenuItem>
            <MenuItem value={"第4小隊"}>第4小隊</MenuItem>
            <MenuItem value={"第5小隊"}>第5小隊</MenuItem>
            <MenuItem value={"第6小隊"}>第6小隊</MenuItem>
            <MenuItem value={"第7小隊"}>第7小隊</MenuItem>
            <MenuItem value={"第8小隊"}>第8小隊</MenuItem>
          </Select>
          <TextField
            required
            label="Amount"
            id="amount"
            value={amount}
            sx={{ marginTop: 3, marginBottom: 2 }}
            onChange={(e) => {
              setAmount(parseInt(e.target.value));
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <SimpleMoneyButton val={1000} />
            <SimpleMoneyButton val={3000} />
            <SimpleMoneyButton val={5000} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <SimpleMoneyButton val={10000} />
            <Button
              variant="contained"
              disabled={team === "Select Team"}
              onClick={handlePercentMoney}
              sx={{ marginBottom: 1 }}
            >
              10%
            </Button>
            <Button
              variant="contained"
              disabled={team === "Select Team"}
              onClick={() => setAmount(amount * -1)}
              sx={{ marginBottom: 1 }}
            >
              neg
            </Button>
          </Box>
          <Button disabled={!(team && amount)} onClick={handleClick}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};
export default SetMoney;
