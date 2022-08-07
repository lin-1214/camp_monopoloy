import { createContext } from "react";

const RoleContext = createContext({
  role: "",
  setRole: () => {},
  messages: [],
  teams: [],
});

export default RoleContext;
