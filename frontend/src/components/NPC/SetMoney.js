import React, { useState, useContext } from "react";
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
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  const handlePercentMoney = () => {
    const money = 60000; //find the team's money
    setAmount(money * 0.1);
  };

  const handleGoMoney = (phase) => {
    switch (phase) {
      case 1:
        return setAmount(20000);
      case 2:
        return setAmount(30000);
      case 3:
        return setAmount(40000);
    }
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
        disabled={!team}
        sx={{ marginBottom: 1 }}
        onClick={() => {
          setAmount(val);
        }}
      >
        {val}
      </Button>
    );
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
            <Button
              variant="contained"
              disabled={!team}
              onClick={handlePercentMoney}
              sx={{ marginBottom: 1 }}
            >
              10%
            </Button>
            <SimpleMoneyButton val={1000} />
            <SimpleMoneyButton val={3000} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <SimpleMoneyButton val={5000} />
            <SimpleMoneyButton val={6000} />
            <Button
              variant="contained"
              disabled={!team}
              onClick={() => handleGoMoney(2)}
              sx={{ marginBottom: 1 }}
            >
              GO
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
