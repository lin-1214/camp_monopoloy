import React, { useState, useEffect } from "react";
import { Stack, SnackbarContent } from "@mui/material";
const Notifications = () => {
  const [messages, setMessages] = useState([
    "This is the first Notification",
    "This is the second notification. The Properties in Avengers will be up for 20%!",
  ]);

  const TimedMessage = ({ duration, content }) => {
    const [second, setSecond] = useState(duration);
    const [visible, setVisible] = useState(true);
    const TimedComponent = () => {};

    //destroy component after specific amount of time
    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
      }, duration * 1000);
    }, []);
    return visible ? <TimedComponent /> : null;
  };

  return (
    <Stack
      spacing={1}
      sx={{
        maxWidth: 700,
        marginTop: "80px",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      {messages.map((item) => (
        <SnackbarContent message={item} />
      ))}
    </Stack>
  );
};
export default Notifications;
