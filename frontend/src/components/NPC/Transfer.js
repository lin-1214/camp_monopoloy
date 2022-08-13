import React, { useState, useContext, useEffect } from "react";
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
  // FormControlLabel,
  // Radio,
  // RadioGroup,
  Stack,
} from "@mui/material";
import Switch from "@mui/material/Switch";

import RoleContext from "../useRole";
import axios from "../axios";

const Transfer = () => {
  const [from, setFrom] = useState("Select Team");
  const [to, setTo] = useState("Select Team");
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [equal, setEqual] = useState(false);
  const [error, setError] = useState(false);
  const [isEstate, setIsEstate] = useState(true);
  const { teams, setTeams, role } = useContext(RoleContext);
  const navigate = useNavigate();
  const handleClick = async () => {
    const payload = {
      from: from,
      to: to,
      IsEstate: isEstate,
      dollar: parseInt(amount),
      equal,
    };
    await axios.post("/transfer", payload);
    navigate("/teams");
  };

  const handlePercentMoney = (percent) => {
    const item = teams.find((element) => element.teamname === from);
    const money = item.money; //find the team's money
    setAmount(Math.round(money * percent));
    setEqual(false);
  };

  const handleEqualMoney = () => {
    let money_from = teams.find((element) => element.teamname === from).money; //first team (using the card)
    let money_to = teams.find((element) => element.teamname === to).money; //second team(passive)
    let temp = Math.round((money_from - money_to) / 2);
    setAmount(temp);
    setEqual(true);
  };

  useEffect(() => {
    if (role === "") {
      navigate("/permission");
    }
    axios
      .get("/team")
      .then((res) => {
        setTeams(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
          Transfer Money
        </Typography>
        <FormControl
          variant="standard"
          sx={{ minWidth: "250px", marginTop: 2 }}
        >
          <InputLabel id="from-team">From...</InputLabel>
          <Select
            value={from}
            labelId="from-team"
            onChange={(e) => {
              setFrom(e.target.value);
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
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ minWidth: "250px", marginTop: 2 }}
        >
          <InputLabel id="to-team">To...</InputLabel>
          <Select
            value={to}
            sx={{ marginBottom: 2 }}
            id="to-team"
            onChange={(e) => {
              setTo(e.target.value);
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
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ minWidth: "250px", marginTop: 1 }}
        >
          <FormLabel mx="auto">Is Concerning Estate?</FormLabel>
          <Stack
            direction="row"
            spacing="auto"
            alignItems="center"
            mx={5}
            mt={2}
          >
            <Typography>No</Typography>
            <Switch
              checked={isEstate}
              onChange={(e) => {
                setIsEstate(e.target.checked);
              }}
              label="Is concerning estate"
              size="large"
            />
            <Typography>Yes</Typography>
          </Stack>
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ minWidth: "250px", marginTop: 2 }}
        >
          {/* <TextField
            required
            label="Amount"
            id="amount"
            value={amount}
            sx={{ marginTop: 2, marginBottom: 2 }}
            onChange={(e) => {
              setAmount(e.target.value);
              setEqual(false);
            }}
          /> */}
          <TextField
            required
            error={error}
            label="Amount"
            id="amount"
            value={amount}
            sx={{ marginTop: 3, marginBottom: 2 }}
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setAmount(e.target.value ? e.target.value : "");
                setErrorMessage("");
                setError(false);
              } else {
                setErrorMessage("Please enter a valid number");
                setError(true);
              }
            }}
            helperText={errorMessage}
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
              sx={{ marginBottom: 1 }}
              disabled={to === "Select Team" || from === "Select Team"}
              onClick={handleEqualMoney}
            >
              Equal
            </Button>
            <Button
              variant="contained"
              sx={{ marginBottom: 1 }}
              disabled={to === "Select Team" || from === "Select Team"}
              onClick={() => handlePercentMoney(0.05)}
            >
              5%
            </Button>
            <Button
              variant="contained"
              sx={{ marginBottom: 1 }}
              disabled={to === "Select Team" || from === "Select Team"}
              onClick={() => handlePercentMoney(0.1)}
            >
              10%
            </Button>
          </Box>
          <Button
            disabled={!(from && to && amount) || from === to}
            onClick={handleClick}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};
export default Transfer;
