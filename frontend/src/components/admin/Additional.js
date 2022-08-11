import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Box,
  Button,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import RoleContext from "../useRole";
import axios from "../axios";

const Additional = () => {
  const [event, setEvent] = useState(0);
  const [title, setTitle] = useState("地產增值(I)");
  const [team, setTeam] = useState("Select Team");
  const [trait, setTrait] = useState(0);
  const [duration, setDuration] = useState(0);
  const [message, setMessage] = useState(
    "使你的房地產租金提升至150%, 效果持續10分鐘。不可疊加使用"
  );
  const [open, setOpen] = useState(false);
  const {
    messages,
    setMessages,
    id,
    setId,
    permMessages,
    setPermMessages,
    role,
  } = useContext(RoleContext);
  const navigate = useNavigate();

  const data = [
    {
      title: "地產增值(I)",
      description: "使你的房地產租金提升至150%, 效果持續10分鐘。不可疊加使用",
      trait: 1,
      duration: 600,
    },
    {
      title: "財產凍結",
      description:
        "選擇一個小隊, 其他小隊踩到此小隊的房產無須付租金, 效果持續5分鐘",
      trait: 1,
      duration: 300,
    },
    {
      title: "量子領域",
      description:
        "選擇一個區域, 若其他小隊停在此區域會損失10%手上的金錢, 效果持續10分鐘",
      trait: 1,
      duration: 600,
    },
    {
      title: "靈魂寶石",
      description:
        "所需支付的金錢提升至150%, 但同時所獲得的金錢提升至200%, 效果持續10分鐘",
      trait: 1,
      duration: 600,
    },
    {
      title: "地產增值(II)",
      description: "使你的房地產租金提升至200%, 效果持續10分鐘。不可疊加使用",
      trait: 1,
      duration: 600,
    },
    {
      title: "double一下",
      description:
        "選擇一個區域。若持有該區域數量-1的房產即可獲得double效果, 此效果沒有時間限制",
      trait: 0,
    },
  ];

  const handleClick = async () => {
    if (trait === 1) {
      //temporary messages
      console.log(messages);
      let temp = messages.slice();
      temp.push({
        id: id,
        duration: duration,
        title: title,
        content: message,
      });
      setMessages(temp);
      setId(id + 1);
    } else {
      //permanaent messages
      let temp = permMessages.slice();
      temp.push({
        title: title,
        content: message,
      });
      setPermMessages(temp);
    }
    setOpen(true);

    let payload;
    let event_name = data[event].title;
    switch (event_name) {
      case "地產增值(I)":
        payload = { teamname: team, bonus: 1.5, duration: duration };
        await axios.post("/bonus", payload);
        break;
      case "財產凍結":
        payload = { teamname: team, bonus: 0, duration: duration };
        await axios.post("/bonus", payload);
        break;
      case "量子領域":
        break;
      case "地產增值(II)":
        payload = { teamname: team, bonus: 2, duration: duration };
        await axios.post("/bonus", payload);
        break;
      case "double一下":
        break;
      case "靈魂寶石":
        payload = { teamname: team };
        await axios.post("/soulgem", payload);
        break;
      default:
        break;
    }
    navigate("/notifications");
    console.log(payload);
  };

  useEffect(() => {
    if (role !== "admin") {
      navigate("/permission");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Additional Bonus
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
          <InputLabel id="title">Title</InputLabel>
          <Select
            value={event}
            id="title"
            onChange={(e) => {
              setEvent(e.target.value);
              setTitle(data[e.target.value].title);
              setMessage(data[e.target.value].description);
              setTrait(data[e.target.value].trait);
              if (data[e.target.value].trait === 1) {
                setDuration(data[e.target.value].duration);
              }
            }}
          >
            {data.map((item) => {
              return (
                <MenuItem value={data.indexOf(item)} key={data.indexOf(item)}>
                  {item.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
          <InputLabel id="team-ownership">Team</InputLabel>
          <Select
            value={team}
            id="team-ownership"
            onChange={(e) => {
              setTeam(e.target.value);
            }}
          >
            <MenuItem value={"Select Team"}>Select Team</MenuItem>
            <MenuItem value={"第1小隊"}>第1小隊</MenuItem>
            <MenuItem value={"第2小隊"}>第2小隊</MenuItem>
            <MenuItem value={"第3小隊"}>第3小隊</MenuItem>
            <MenuItem value={"第4小隊"}>第4小隊</MenuItem>
            <MenuItem value={"第5小隊"}>第5小隊</MenuItem>
            <MenuItem value={"第6小隊"}>第6小隊</MenuItem>
            <MenuItem value={"第7小隊"}>第7小隊</MenuItem>
            <MenuItem value={"第8小隊"}>第8小隊</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 250, marginTop: 2 }}>
          <InputLabel id="trait">Trait</InputLabel>
          <Select
            value={trait}
            id="trait"
            onChange={(e) => {
              setTrait(e.target.value);
            }}
          >
            <MenuItem value={0}>Permenant</MenuItem>
            <MenuItem value={1}>Temporary</MenuItem>
          </Select>
          {trait === 1 && (
            <TextField
              id="duration"
              label="Duration(seconds)"
              sx={{ marginTop: 2 }}
              variant="standard"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />
          )}
          <TextField
            id="content"
            label="Content"
            multiline
            sx={{ marginTop: 2, marginBottom: 2 }}
            variant="standard"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button
            disabled={!(message && team !== "Select Team")}
            onClick={handleClick}
          >
            Submit
          </Button>
        </FormControl>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Notification</DialogTitle>
          <DialogContent>Add event successfully!</DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Additional;
