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

const Event = () => {
  const [message, setMessage] = useState(
    "持有蜘蛛人系列建築的隊伍須進監獄上跳舞課"
  );
  const [event, setEvent] = useState(0);
  const { setEventMessage, role } = useContext(RoleContext);
  const navigate = useNavigate();
  const handleClick = () => {
    setEventMessage({
      title: data[event].title,
      content: message,
    });
    navigate("/notifications");
  };

  useEffect(() => {
    if (role !== "admin") {
      navigate("/permission");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = [
    {
      title: "去上學",
      description: "持有蜘蛛人系列建築的隊伍須進監獄上跳舞課",
    },
    {
      title: "黑豹過世",
      description:
        "面臨國喪，持有黑豹系列建築的隊伍可以選擇(1)在原地休息5分鐘默哀致意 或 (2)繳20000結束",
    },
    {
      title: "都更",
      description: "購買房地產與升級的金額減半",
    },
    {
      title: "開啟傳送門",
      description:
        "至聖所的傳送門開啟了! 踩到至聖所格子的隊伍可以使用傳送門傳送至任意格子",
    },
  ];

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
          <InputLabel id="title">Trait</InputLabel>
          <Select
            value={event}
            labelId="title"
            onChange={(e) => {
              setEvent(e.target.value);
              setMessage(data[e.target.value].description);
            }}
          >
            {data.map((item) => {
              return (
                <MenuItem value={data.indexOf(item)} key={data.indexOf(item)}>
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
