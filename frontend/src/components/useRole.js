import { createContext } from "react";

const RoleContext = createContext({
  role: "",
  setRole: () => {},
});

export default RoleContext;
