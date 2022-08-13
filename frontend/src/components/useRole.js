import { createContext } from "react";

const RoleContext = createContext({
  role: "",
  setRole: () => {},
  teams: [],
  setTeams: () => {},
  buildings: [],
  setBuildings: () => {},
  filteredBuildings: [],
  setFilteredBuildings: () => {},
});

export default RoleContext;
