import { createContext } from "react";

const RoleContext = createContext({
  role: "",
  setRole: () => {},
  messages: [],
  setMessages: () => {},
  teams: [],
  id: 0,
  setId: () => {},
  eventMessage: {},
  setEventMessage: () => {},
  permMessages: [],
  setPermMessages: () => {},
});

export default RoleContext;
