import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Box,
  FormControl,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "../axios";
import RoleContext from "../useRole";

const SellProperty = () => {
  const [teamData, setTeamData] = useState({});
  const [ownedBuildings, setOwnedBuildings] = useState([]);
  const [building, setBuilding] = useState(-1);
  const [price, setPrice] = useState(0);
  const { roleId, role, setNavBarId } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleBuilding = async (building) => {
    setBuilding(building);

    let temp;
    const land = ownedBuildings.find((land) => land.id === building);
    if (land.type === "Building") {
      temp = land.price.buy + land.price.upgrade * (land.level - 1);
    } else {
      temp = price = land.price.buy;
    }
    setPrice(Math.round(temp));
  };

  const handleSubmit = async () => {
    const payload = {};
    await axios.post("/add", payload);
    navigate("/teams");
    setNavBarId(2);
  };

  useEffect(() => {
    if (role === "" || role === "admin" || role === "NPC") {
      navigate("/permission");
    }

    const getOwnedBuildings = async () => {
      await axios
        .get("/property/" + roleId)
        .then((res) => {
          setOwnedBuildings(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getTeamData = async () => {
      await axios
        .get("/team/" + roleId)
        .then((res) => {
          setTeamData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getOwnedBuildings();
    getTeamData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 9,
          marginBottom: 9,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
          Sell Property
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 0 }}>
          <InputLabel id="building">Building</InputLabel>
          <Select
            value={building}
            labelId="building"
            onChange={(e) => {
              handleBuilding(e.target.value);
            }}
          >
            <MenuItem value={-1}>Select Building</MenuItem>
            {ownedBuildings.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.id} {item.name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            disabled={building === -1}
            onClick={handleSubmit}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            <SendIcon />
          </Button>
        </FormControl>
        {building !== -1 ? (
          <>
            <Typography component="h1" variant="h6" sx={{ marginBottom: 1 }}>
              Preview
            </Typography>
            <Typography component="h2" variant="body2" sx={{ marginBottom: 1 }}>
              {teamData.money} &gt;&gt; {teamData.money + price}
            </Typography>
          </>
        ) : null}
      </Box>
    </Container>
  );
};
export default SellProperty;
