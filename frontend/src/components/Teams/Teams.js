import React, { useState, useEffect, useContext } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import axios from "../axios";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  const columns = [
    { id: "teamname", label: "Team Name", minWidth: 90, align: "center" },
    { id: "occupation", label: "Occupation", minWidth: 70, align: "center" },
    { id: "money", label: "Money", minWidth: 60, align: "center" },
  ];

  const getTeams = async () => {
    axios
      .get("/team")
      .then((res) => {
        setTeams(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTeams();
    const id = setInterval(() => {
      getTeams();
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        paddingTop: "80px",
        margin: "auto",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 800,
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((item) => (
                <TableCell
                  key={item.id}
                  align={item.align}
                  style={{ minWidth: item.minWidth }}
                >
                  {item.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((item) => {
              return (
                <TableRow key={item.teamname}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {item[column.id]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default Teams;
