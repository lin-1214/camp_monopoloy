import React, { useState, useContext, useEffect } from "react";
import {
  Stack,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "./axios";
import RoleContext from "./useRole";

const Notifications = () => {
  const {
    messages,
    setMessages, // eslint-disable-line no-unused-vars
    eventMessage,
    setEventMessage,
    permMessages,
    setPermMessages,
  } = useContext(RoleContext);
  const [id, setId] = useState(0); // eslint-disable-line no-unused-vars

  const FetchEvent = async () => {
    const { data } = await axios.get("/event");
    if (data !== null) setEventMessage(data); //avoid 0 state
  };

  const FetchMessages = async () => {
    const { data } = await axios.get("/notifications");
    // console.log(data);
    const temporary = data.filter((item) => item.type === "temporary");
    const permanent = data.filter((item) => item.type === "permenant");
    setMessages(temporary);
    setPermMessages(permanent);
  };
  useEffect(() => {
    //fetch event from backend
    FetchEvent();
    //fetch messages from backend
    FetchMessages();
    //assign data to the messages
  }, []);

  const TimedComponent = ({ id, duration, title, content, createdAt }) => {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
      const calculate = () => {
        const temp = duration - Math.floor(((Date.now() / 1000) - createdAt));
        console.log(temp);
        setElapsed(temp);
      };

      const task = setInterval(() => {
        calculate();
      }, 1000);
      return () => clearInterval(task);
    }, []);

    return (
      <Card key={id} sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography variant="h6">{title}</Typography>
            </Grid>
            <Grid item xs={3} sx={{ alignItems: "flex-end" }}>
              <Typography variant="body1">
                {Math.floor(elapsed / 60)} :{" "}
                {elapsed % 60 > 9 ? elapsed % 60 : "0" + (elapsed % 60)}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2">{content}</Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stack
        spacing={1}
        sx={{
          maxWidth: 700,
          marginTop: "80px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <Card
          sx={{ backgroundColor: "rgb(60,60,60)", color: "rgb(255,255,255)" }}
        >
          <CardContent>
            <Typography variant="h6">
              事件：{eventMessage ? eventMessage.title : "無"}
            </Typography>
            <Typography variant="body2">{eventMessage.description}</Typography>
          </CardContent>
        </Card>
        {permMessages &&
          permMessages.map((item) => (
            <Card>
              <CardContent>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          ))}
        {messages &&
          messages.map((item) => (
            <TimedComponent
              id={id}
              duration={item.duration}
              title={item.title}
              content={item.description}
              createdAt={item.createdAt}
            />
          ))}
      </Stack>
    </Container>
  );
};
export default Notifications;