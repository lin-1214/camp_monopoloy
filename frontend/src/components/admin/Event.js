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
} from "@mui/material";
import RoleContext from "../useRole";
import axios from "../axios";

const Event = () => {
  const [message, setMessage] = useState(
    "持有蜘蛛人系列建築的隊伍須進監獄上跳舞課"
  );
  const [event, setEvent] = useState(0);
  const [events, setEvents] = useState([]);
  const { setEventMessage, role } = useContext(RoleContext);
  const navigate = useNavigate();
  const handleClick = () => {
    setEventMessage({
      title: events[event].title,
      content: message,
    });
    axios.post("/event", { id: event + 1 });
    navigate("/notifications");
  };

  useEffect(() => {
    if (role !== "admin") {
      navigate("/permission");
    }
    axios
      .get("/allEvents")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
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
          Event Settings
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
          <InputLabel id="title">Title</InputLabel>
          <Select
            value={event}
            labelId="title"
            onChange={(e) => {
              setEvent(e.target.value);
              setMessage(events[e.target.value].description);
            }}
          >
            {events.map((item) => {
              return (
                <MenuItem
                  value={events.indexOf(item)}
                  key={events.indexOf(item)}
                >
                  {item.title}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            id="content"
            label="Content"
            multiline
            sx={{ marginTop: 2, marginBottom: 2 }}
            variant="standard"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button disabled={!message} onClick={handleClick}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Event;
