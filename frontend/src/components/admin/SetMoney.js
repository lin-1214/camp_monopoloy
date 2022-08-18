import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  FormControl,
  Box,
  Paper,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import RoleContext from "../useRole";
import TeamSelect from "../TeamSelect";
import axios from "../axios";

const SetMoney = () => {
  const [team, setTeam] = useState(-1);
  const [amount, setAmount] = useState(0);
  const { role } = useContext(RoleContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = async () => {
    const payload = { id: team, amount: amount };
    await axios.post("/set", payload);
    setOpen(true);
  };

  useEffect(() => {
    if (role !== "admin") {
      navigate("/permission");
    }
  });

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
          Set Money
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 250 }}>
          <TeamSelect
            label="Team"
            team={team}
            handleTeam={setTeam}
            hasZero={false}
          />
          <TextField
            required
            label="Amount"
            id="amount"
            value={amount}
            sx={{ marginTop: 2, marginBottom: 1 }}
            onChange={(e) => {
              if (e.target.value === "") setAmount(0);
              else setAmount(parseInt(e.target.value));
            }}
            FormHelperTextProps={{ error: true }}
          />
          <Button
            variant="outlined"
            onClick={handleClick}
            disabled={team === -1 || amount <= 0}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 200,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Set complete</Typography>
        </Paper>
      </Modal>
    </Container>
  );
};

export default SetMoney;
