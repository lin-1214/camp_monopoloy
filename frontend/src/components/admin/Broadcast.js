import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  Box,
  Button,
  FormControl,
  Alert,
} from "@mui/material";
import Loading from "../Loading";
import RoleContext from "../useRole";
import axios from "../axios";

const Broadcast = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleClick = async () => {
    await axios.post("/broadcast", { title, description });
  };

  useEffect(() => {
    if (role !== "admin") {
      navigate("/permission");
    }
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
          Broadcast
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
          {/* <InputLabel id="title">Title</InputLabel> */}
          <TextField
            id="title"
            label="Enter Title"
            multiline
            sx={{ marginTop: 2, marginBottom: 2 }}
            variant="standard"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
          {/* <InputLabel id="description">Description</InputLabel> */}
          <TextField
            id="description"
            label="Enter Description"
            multiline
            sx={{ marginTop: 2, marginBottom: 2 }}
            variant="standard"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Button disabled={!title || !description} onClick={handleClick}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Broadcast;
