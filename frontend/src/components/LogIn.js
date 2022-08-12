import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import RoleContext from "./useRole";
import axios from "./axios";

const LogIn = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);

  const handleClick = async () => {
    // post /api/login
    const payload = { username: user, password: password };
    const {
      data: { username },
    } = await axios.post("/login", payload);
    // console.log(username);
    if (username === "NPC" || username === "admin") {
      //successed!
      setMessage("Successfully login!");
      setOpen(true);
      setRole(username);
      navigate("/");
    } else {
      //failed
      setMessage("Wrong username or password.");
      setOpen(true);
    }
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
        <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
          Log in
        </Typography>
        <FormControl variant="standard">
          <TextField
            required
            label="Username"
            id="user"
            autoComplete="user"
            type="text"
            sx={{ marginTop: 1, marginBottom: 1 }}
            autoFocus
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
          <TextField
            required
            label="Password"
            id="password"
            autoComplete="current-password"
            type="password"
            sx={{ marginTop: 1, marginBottom: 1 }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            sx={{ marginTop: 1 }}
            disabled={!(user && password)}
            onClick={handleClick}
          >
            Log In
          </Button>
        </FormControl>
      </Box>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          sx={{ width: "100%" }}
          severity={message === "Successfully login!" ? "success" : "warning"}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LogIn;
