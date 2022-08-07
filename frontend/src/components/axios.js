import _axios from "axios";

const axios = (baseURL) => {
  const instance = _axios.create({
    baseURL: baseURL || "http://localhost:4000/api",
    timeout: 1000,
  });

  return instance;
};

export { axios };
export default axios();
