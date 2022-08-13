import React, { useEffect, useContext } from "react";
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
    { id: "teamname", label: "Team Name", minWidth: 90, align: "center" },
    { id: "occupation", label: "Occupation", minWidth: 70, align: "center" },
    { id: "money", label: "Money", minWidth: 60, align: "center" },
  ];

  useEffect(() => {
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
                          {column.id === "money"
                            ? Math.round(item[column.id]) > 0
                              ? Math.round(item[column.id])
                              : "破產"
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
