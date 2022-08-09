import _axios from "axios";

const instance = _axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 1000,
});

export default instance;
