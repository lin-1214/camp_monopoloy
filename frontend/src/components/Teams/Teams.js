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
import RoleContext from "../useRole";
import Loading from "../Loading";
import axios from "../axios";

const Teams = () => {
  const { teams, setTeams } = useContext(RoleContext);

  const columns = [
    { id: "teamname", label: "Team", minWidth: "15vw", align: "center" }, //80
    {
      id: "occupation",
      label: "Occupation",
      minWidth: "17vw",
      align: "center",
    }, //60
    { id: "money", label: "Money", minWidth: "14vw", align: "center" },
    // { id: "level", label: "Level", minWidth: "8vw", align: "center" },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (teams.length === 0) {
    return <Loading />;
  } else {
    return (
      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          paddingTop: "60px",
          marginLeft: "2vw",
          marginRight: "2vw",
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
                          {column.id === "money"
                            ? Math.round(item[column.id]) > 0
                              ? Math.round(item[column.id])
                              : "破產"
                            : column.id === "occupation"
                            ? item[column.id] !== "N/A"
                              ? item[column.id] + ` (${"I".repeat(item.level)})`
                              : "N/A"
                            : item[column.id]}
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
  }
};
export default Teams;
