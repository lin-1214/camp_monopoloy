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

const LogIn = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);
  const handleClick = () => {
    console.log(user);
    console.log(password);
    setRole("NPC");
    navigate("/");
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
    </Container>
  );
};

export default LogIn;
