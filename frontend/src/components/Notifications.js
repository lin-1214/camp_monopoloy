import React, { useState, useEffect } from "react";
import {
  Stack,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  // Box,
} from "@mui/material";
import Loading from "./Loading";
import axios from "./axios";

const Notifications = () => {
  const [messages, setMessages] = useState([]);
  const [eventMessage, setEventMessage] = useState({});
  const [permMessages, setPermMessages] = useState([]);

  const FetchEvent = async () => {
    const { data } = await axios.get("/event");
    // console.log(data);
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
    // refresh every 10 seconds
    const interval = setInterval(() => {
      FetchEvent();
      FetchMessages();
    }, 5000);
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TimedComponent = ({ id, duration, title, content, createdAt }) => {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
      const calculate = () => {
        const temp = duration - Math.floor(Date.now() / 1000 - createdAt);
        console.log(temp);
        setElapsed(temp);
      };

      const task = setInterval(() => {
        calculate();
      }, 1000);
      return () => clearInterval(task);
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (eventMessage.title === undefined) {
    return <Loading />;
  } else {
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
              <Typography variant="body2">
                {eventMessage.description}
              </Typography>
            </CardContent>
          </Card>
          {permMessages &&
            permMessages.map((item) => (
              <Card key={item.id}>
                <CardContent>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </CardContent>
              </Card>
            ))}
          {messages &&
            messages.map((item) => (
              <TimedComponent
                id={item.id}
                duration={item.duration}
                title={item.title}
                content={item.description}
                createdAt={item.createdAt}
              />
            ))}
        </Stack>
      </Container>
    );
  }
};
export default Notifications;
