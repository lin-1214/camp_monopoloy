import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  // Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Box,
  Button,
  FormControl,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  Paper,
  Grid,
  TableBody,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AddIcon from "@mui/icons-material/Add";
import axios from "../axios";
import RoleContext from "../useRole";

const SetMoney = () => {
  const [team, setTeam] = useState(-1);
  const [teamData, setTeamData] = useState({});

  const [amount, setAmount] = useState("0");
  const [errorMessage, setErrorMessage] = useState("");

  const [building, setBuilding] = useState(-1);
  const [price, setPrice] = useState({});

  const [showPreview, setShowPreview] = useState(false);
  const { role, filteredBuildings } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleTeam = async (team) => {
    if (amount !== "-" && amount !== "" && team !== -1) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
    const { data } = await axios.get("/team/" + team);
    // console.log(data);
    setTeamData(data);
    setTeam(team);
  };

  const handleAmount = async (amount) => {
    if (amount !== "-" && amount !== "" && team !== -1) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
    setAmount(amount);
  };

  const handleBuilding = async (building) => {
    if (building > 0) {
      const { data } = await axios.get("/land/" + building);
      setBuilding(building);
      setPrice(data.price);
    } else {
      setBuilding(-1);
      setPrice({});
    }
    // console.log(data);
  };

  const handlePercentMoney = async () => {
    if (teamData.teamname !== team) {
      const { data } = await axios.get("/team/" + team);
      console.log(data);
      setTeamData(data);
    }
    const money = teamData.money;
    handleAmount(Math.round(money * -0.1));
  };

  const handleSubmit = async () => {
    const payload = {
      teamname: `第${team}小隊`,
      dollar: parseInt(amount) ? parseInt(amount) : 0,
    };
    await axios.post("/add", payload);
    navigate("/teams");
  };

  const handleSubmitAndSetOwnership = async () => {
    const payload = {
      teamname: `第${team}小隊`,
      dollar: parseInt(amount) ? parseInt(amount) : 0,
    };
    await axios.post("/add", payload);
    navigate("/setownership?id=" + building + "&team=" + team);
  };

  const SimpleMoneyButton = ({ val }) => {
    return (
      <Button
        variant="contained"
        disabled={team === -1}
        sx={{ marginBottom: 1, width: 80 }}
        onClick={() => {
          if (!amount) {
            handleAmount(val);
          } else {
            handleAmount(parseInt(amount) + val);
          }
        }}
      >
        {val > 0 ? "+" : ""}
        {val}
      </Button>
    );
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
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 9,
          marginBottom: 9,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: 0 }}>
          Add Money
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
          <TextField
            required
            label="Amount"
            id="amount"
            value={amount}
            sx={{ marginTop: 2, marginBottom: 1 }}
            onChange={(e) => {
              const re = /^-?[0-9\b]+$/;
              console.log(e.target.value);
              if (
                e.target.value === "-" ||
                e.target.value === "" ||
                re.test(e.target.value)
              ) {
                if (Math.abs(parseInt(e.target.value)) > 1000000) {
                  setErrorMessage("Amount must be less than 1,000,000");
                } else {
                  handleAmount(e.target.value ? e.target.value : "");
                  setErrorMessage("");
                }
              } else {
                setErrorMessage("Please enter a valid number");
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
            <SimpleMoneyButton val={+100} />
            <SimpleMoneyButton val={+1000} />
            <SimpleMoneyButton val={+5000} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <SimpleMoneyButton val={-100} />
            <SimpleMoneyButton val={-1000} />
            <SimpleMoneyButton val={-5000} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              disabled={team === -1}
              sx={{ marginBottom: 1, width: 80 }}
              onClick={handlePercentMoney}
            >
              -10%
            </Button>
            <Button
              variant="contained"
              disabled={team === -1 || !price.buy}
              sx={{ marginBottom: 1, width: 80 }}
              onClick={() => handleAmount(-1 * price.buy)}
            >
              Buy
            </Button>
            <Button
              variant="contained"
              disabled={team === -1 || !price.upgrade}
              sx={{ marginBottom: 1, width: 80 }}
              onClick={() => handleAmount(-1 * price.upgrade)}
            >
              Upgrade
            </Button>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <Button
                  variant="contained"
                  disabled={team === -1 || amount === ""}
                  onClick={handleSubmit}
                  fullWidth
                >
                  <SendIcon />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <Button
                  variant="contained"
                  disabled={team === -1 || amount === ""}
                  onClick={handleSubmitAndSetOwnership}
                  fullWidth
                >
                  <SendIcon />
                  <AddIcon />
                  <RequestQuoteIcon />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </FormControl>
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h6" sx={{ marginBottom: 0 }}>
            Query Price
          </Typography>
          <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 0 }}>
            <InputLabel id="building">Building</InputLabel>
            <Select
              value={building}
              labelId="building"
              onChange={(e) => {
                handleBuilding(e.target.value);
              }}
            >
              <MenuItem value={-1}>Select Building</MenuItem>
              {filteredBuildings.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.id} {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableBody>
                <TableRow>
                  <TableCell align="left">Buy</TableCell>
                  <TableCell align="right">
                    {price.buy !== null ? price.buy : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Upgrade</TableCell>
                  <TableCell align="right">
                    {(price.upgrade !== null) !== 0 ? price.upgrade : ""}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {showPreview ? (
          <Box
            sx={{ marginTop: 2 }}
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <Typography component="h1" variant="h6" sx={{ marginBottom: 1 }}>
              Preview
            </Typography>
            <Typography component="h2" variant="body2" sx={{ marginBottom: 1 }}>
              {teamData.money} &gt;&gt; {teamData.money + parseInt(amount)}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
};
export default SetMoney;
