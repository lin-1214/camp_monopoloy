import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  FormControl,
} from "@mui/material";
import RoleContext from "./useRole";
import axios from "./axios";

const LogIn = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);

  const handleClick = () => {
    console.log(user);
    console.log(password);
    // post /api/login
    const payload = { username: user, password: password };
    axios.post("/login", payload).then((res) => {
      if (res.data !== "") {
        setRole(res.data);
        navigate("/");
      } else {
        console.log("login failed");
        setErrorMessages("login failed");
      }
    });
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
          <div>{errorMessages}</div>
        </FormControl>
      </Box>
    </Container>
  );
};

export default LogIn;
