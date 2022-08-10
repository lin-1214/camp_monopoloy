import React, { useState, useContext, useEffect } from "react";

import {
  Stack,
  SnackbarContent,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import RoleContext from "./useRole";

const Notifications = () => {
  const { messages, setMessages, eventMessage, permMessages } =
    useContext(RoleContext);
  const [id, setId] = useState(0);

  const TimedComponent = ({ id, duration, title, content }) => {
    return (
      <Card key={id} sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography variant="subtitle1">{title}</Typography>
            </Grid>
            <Grid item xs={3} sx={{ alignItems: "flex-end" }}>
              <Typography variant="body1">
                {Math.floor(duration / 60)} :{" "}
                {duration % 60 > 9 ? duration % 60 : "0" + (duration % 60)} s
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
            <Typography variant="subtitle1">
              事件：{eventMessage.title}
            </Typography>
            <Typography variant="body2">{eventMessage.content}</Typography>
          </CardContent>
        </Card>
        {permMessages.map((item) => (
          <Card>
            <CardContent>
              <Typography variant="subtitle1">{item.title}</Typography>
              <Typography variant="body2">{item.content}</Typography>
            </CardContent>
          </Card>
        ))}
        {messages &&
          messages.map((item) => (
            <TimedComponent
              id={id}
              duration={item.duration}
              title={item.title}
              content={item.content}
            />
          ))}
      </Stack>
    </Container>
  );
};
export default Notifications;
