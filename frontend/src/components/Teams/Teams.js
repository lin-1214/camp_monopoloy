import React, { useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const Teams = () => {
  const columns = [
    { id: "teamname", label: "Team Name", minWidth: 90, align: "center" },
    { id: "occupation", label: "Occupation", minWidth: 70, align: "center" },
    { id: "money", label: "Money", minWidth: 60, align: "center" },
  ];

  const rows = [
    { teamname: "第1小隊", occupation: "N/A", money: 100000 },
    { teamname: "第2小隊", occupation: "N/A", money: 100000 },
    { teamname: "第3小隊", occupation: "N/A", money: 100000 },
    { teamname: "第4小隊", occupation: "N/A", money: 100000 },
  ];

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
          maxHeight: 400,
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
            {rows.map((item) => {
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
