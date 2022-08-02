import { createContext } from "react";

const userContext = createContext({
  role: "",
  setRole: () => {},
  auth: false,
  setAuth: () => {},
});

export default userContext;
