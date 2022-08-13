import { createContext } from "react";

const RoleContext = createContext({
  role: "",
  setRole: () => {},
  teams: [],
  setTeams: () => {},
  phase: 1,
  setPhase: () => {},
  buildings: [],
  setBuildings: () => {},
  filteredBuildings: [],
  setFilteredBuildings: () => {},
});

export default RoleContext;
