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
const SetMoney = () => {
  const [team, setTeam] = useState(1);
  const [amount, setAmount] = useState(0);
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
            sx={{ marginTop: 3, marginBottom: 2 }}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <Button disabled={!(team && amount)} onClick={handleClick}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};
export default SetMoney;
