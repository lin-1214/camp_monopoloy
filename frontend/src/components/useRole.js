import { createContext } from "react";

const RoleContext = createContext({
  role: "",
  setRole: () => {},
  messages: [],
  setMessages: () => {},
  teams: [],
  setTeams: () => {},
  id: 100,
  setId: () => {},
  eventMessage: {},
  setEventMessage: () => {},
  permMessages: [],
  setPermMessages: () => {},
});

export default RoleContext;
