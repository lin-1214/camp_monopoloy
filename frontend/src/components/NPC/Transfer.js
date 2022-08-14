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
import SendIcon from "@mui/icons-material/Send";
import RoleContext from "../useRole";
import axios from "../axios";
import TeamSelect from "../TeamSelect";

const Transfer = () => {
  const [from, setFrom] = useState(-1);
  const [to, setTo] = useState(-1);
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
      equal: equal,
    };
    await axios.post("/transfer", payload);
    navigate("/teams");
  };

  const handlePercentMoney = (percent) => {
    const item = teams.find((element) => element.teamname === `第${from}小隊`);
    const money = item.money; //find the team's money
    setAmount(Math.round(money * percent));
    setEqual(false);
  };

  const handleEqualMoney = () => {
    let money_from = teams.find(
      (element) => element.teamname === `第${from}小隊`
    ).money; //first team (using the card)
    let money_to = teams.find(
      (element) => element.teamname === `第${to}小隊`
    ).money; //second team(passive)
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
          <TeamSelect
            label="From.."
            team={from}
            handleTeam={setFrom}
            hasZero={false}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ minWidth: "250px", marginTop: 2 }}
        >
          <TeamSelect
            label="To.."
            team={to}
            handleTeam={setTo}
            hasZero={false}
            sx={{ marginBottom: 2 }}
          />
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
              disabled={to === -1 || from === -1}
              onClick={handleEqualMoney}
            >
              Equal
            </Button>
            <Button
              variant="contained"
              sx={{ marginBottom: 1 }}
              disabled={to === -1 || from === -1}
              onClick={() => handlePercentMoney(0.05)}
            >
              5%
            </Button>
            <Button
              variant="contained"
              sx={{ marginBottom: 1 }}
              disabled={to === -1 || from === -1}
              onClick={() => handlePercentMoney(0.1)}
            >
              10%
            </Button>
          </Box>
          {/* <Button
            disabled={!(from && to && amount) || from === to}
            onClick={handleClick}
          >
            Submit
          </Button> */}
          <Button
            variant="contained"
            disabled={!(from && to && amount) || from === to}
            onClick={handleClick}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            <SendIcon />
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};
export default Transfer;
