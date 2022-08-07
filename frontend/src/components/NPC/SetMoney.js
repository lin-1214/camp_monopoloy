import React, { useState } from "react";
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
const SetMoney = () => {
  const [team, setTeam] = useState(0);
  const [amount, setAmount] = useState(0);
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

  const handleClick = () => {
    console.log("Hi");
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
            <MenuItem value={0}>Select Team</MenuItem>
            <MenuItem value={1}>第一小隊</MenuItem>
            <MenuItem value={2}>第二小隊</MenuItem>
            <MenuItem value={3}>第三小隊</MenuItem>
            <MenuItem value={4}>第四小隊</MenuItem>
            <MenuItem value={5}>第五小隊</MenuItem>
            <MenuItem value={6}>第六小隊</MenuItem>
            <MenuItem value={7}>第七小隊</MenuItem>
            <MenuItem value={8}>第八小隊</MenuItem>
          </Select>
          <TextField
            required
            label="Amount"
            id="amount"
            value={amount}
            sx={{ marginTop: 3, marginBottom: 2 }}
            onChange={(e) => {
              setAmount(e.target.value);
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
