import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Loading from "../Loading";
import RoleContext from "../useRole";
import axios from "../axios";

const Resources = () => {
  let flag = false;
  const [resources, setResources] = useState([]);
  const { roleId, teams, setTeams } = useContext(RoleContext); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  const columns = [
    { id: "name", label: "Type", minWidth: "15vw", align: "center" },
    { id: "price", label: "Price", minWidth: "17vw", align: "center" },
  ];

  const getResources = async () => {
    axios
      .get("/resourceInfo")
      .then((res) => {
        setResources(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updatePrices = async () => {
    // console.log(resources);
    // console.log(1);
    // const payload = { resources: resources };
    await axios.post("/resource");
  };

  useEffect(() => {
    getResources();
    const update = setInterval(() => {
      getResources();
      flag = !flag;
      if (flag) updatePrices();
    }, 5000);

    return () => clearInterval(update);
  }, []);

  useEffect(() => {}, [flag]);

  if (resources.length === 0) {
    return <Loading />;
  } else {
    return (
      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          paddingTop: "60px",
          paddingBottom: "60px",
          marginLeft: "2vw",
          marginRight: "2vw",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: 900,
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((item) => (
                  <TableCell
                    key={item.id}
                    align={item.align}
                    style={{
                      minWidth: item.minWidth,
                      fontWeight: "800",
                      userSelect: "none",
                    }}
                  >
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {resources.map((resource) => {
                return (
                  <TableRow key={resource.teamname}>
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ userSelect: "none" }}
                        >
                          {column.id === "name"
                            ? resource.name
                            : resource.price}
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

export default Resources;
