import React, { useState } from "react";
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
} from "@mui/material";
const Additional = () => {
  const [event, setEvent] = useState(0);
  const [trait, setTrait] = useState(0);
  const [duration, setDuration] = useState(0);
  const [message, setMessage] = useState("");
  const handleClick = () => {};
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
          Additional bonus
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 215, marginTop: 2 }}>
          <InputLabel id="title">Title</InputLabel>
          <Select
            value={event}
            labelId="title"
            onChange={(e) => {
              setEvent(e.target.value);
              setMessage(data[e.target.value].description);
              setTrait(data[e.target.value].trait);
              if (data[e.target.value].trait === 1) {
                setDuration(data[e.target.value].duration);
              }
            }}
          >
            {data.map((item) => {
              return (
                <MenuItem value={data.indexOf(item)}>{item.title}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 215, marginTop: 2 }}>
          <InputLabel id="trait">Trait</InputLabel>
          <Select
            value={trait}
            labelId="trait"
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
          <Button disabled={!message} onClick={handleClick}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Additional;
