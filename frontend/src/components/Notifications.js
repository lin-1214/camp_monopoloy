import React, { useState } from "react";
import { Stack, SnackbarContent } from "@mui/material";
const Notifications = () => {
  const [messages, setMessages] = useState([
    "This is the first Notification",
    "This is the second notification. The Properties in Avengers will be up for 20%!",
  ]);

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
