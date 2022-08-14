import React from "react";
import { InputLabel, Select, MenuItem } from "@mui/material";

const TeamSelect = ({ label, team, handleTeam, hasZero, sx }) => {
  return (
    <>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        value={team}
        labelId={label}
        onChange={(e) => {
          handleTeam(e.target.value);
        }}
        sx={sx}
      >
        <MenuItem value={-1}>Select Team</MenuItem>
        {hasZero && <MenuItem value={0}>N/A</MenuItem>}
        <MenuItem value={1}>第1小隊</MenuItem>
        <MenuItem value={2}>第2小隊</MenuItem>
        <MenuItem value={3}>第3小隊</MenuItem>
        <MenuItem value={4}>第4小隊</MenuItem>
        <MenuItem value={5}>第5小隊</MenuItem>
        <MenuItem value={6}>第6小隊</MenuItem>
        <MenuItem value={7}>第7小隊</MenuItem>
        <MenuItem value={8}>第8小隊</MenuItem>
      </Select>
    </>
  );
};

export default TeamSelect;
