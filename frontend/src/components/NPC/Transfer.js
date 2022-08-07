import React, { useState, useContext } from "react";
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
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import RoleContext from "../useRole";

const Transfer = () => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isEstate, setIsEstate] = useState(true);
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("Hi");
  };

  const handlePercentMoney = () => {
    const money = 60000; //find the team's money
    setAmount(money * 0.05);
  };

  const handleEqualMoney = () => {
    let money_from = 40000; //first team (using the card)
    let money_to = 60000; //second team(passive)
    let temp = (money_from - money_to) / 2;
    setAmount(temp);
  };

  const SimpleMoneyButton = ({ val }) => {
    return (
      <Button
        variant="contained"
        disabled={!(to && from)}
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
        <Typography component="h1" variant="h5">
          Transfer Money
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 215, marginTop: 2 }}>
          <InputLabel id="from-team">From...</InputLabel>
          <Select
            value={from}
            labelId="from-team"
            onChange={(e) => {
              setFrom(e.target.value);
            }}
          >
            <MenuItem value={0}>Select Team</MenuItem>
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
        <FormControl variant="standard" sx={{ minWidth: 215, marginTop: 2 }}>
          <InputLabel id="to-team">To...</InputLabel>
          <Select
            value={to}
            sx={{ marginBottom: 2 }}
            id="to-team"
            onChange={(e) => {
              setTo(e.target.value);
            }}
          >
            <MenuItem value={0}>Select Team</MenuItem>
            <MenuItem value={1}>第1小隊</MenuItem>
            <MenuItem value={2}>第2小隊</MenuItem>
            <MenuItem value={3}>第3小隊</MenuItem>
            <MenuItem value={4}>第4小隊</MenuItem>
            <MenuItem value={5}>第5小隊</MenuItem>
            <MenuItem value={6}>第6小隊</MenuItem>
            <MenuItem value={7}>第7小隊</MenuItem>
            <MenuItem value={8}>第8小隊</MenuItem>
          </Select>
          <FormLabel>Is concerning estate</FormLabel>
          <RadioGroup
            value={isEstate}
            row
            onChange={(e) => {
              setIsEstate(e.target.value);
            }}
          >
            <FormControlLabel value={true} control={<Radio />} label="True" />
            <FormControlLabel value={false} control={<Radio />} label="False" />
          </RadioGroup>
          <TextField
            required
            label="Amount"
            id="amount"
            value={amount}
            sx={{ marginTop: 2, marginBottom: 2 }}
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
            <SimpleMoneyButton val={10000} />
            {role === "admin" && ( //change to admin later on
              <Button
                variant="contained"
                sx={{ marginBottom: 1 }}
                disabled={!(to && from)}
                onClick={handleEqualMoney}
              >
                equal
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ marginBottom: 1 }}
              disabled={!(to && from)}
              onClick={handlePercentMoney}
            >
              5%
            </Button>
          </Box>
          <Button disabled={!(from && to && amount)} onClick={handleClick}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};
export default Transfer;
