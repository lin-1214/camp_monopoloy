import http from "http";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import cors from "cors";

import db from "./backend/src/mongo.js";
import apiRouter from "./backend/src/api.js";

dotenv.config();

const { PORT, MONGO_URL } = process.env;
const port = PORT || 2022;

db.once("open", () => {
  console.log(`MongoDB connected at ${MONGO_URL}`);

  const app = express();
  const server = http.createServer(app);

  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.static(path.join(process.cwd(), "frontend/build")));

  app.use("/api", apiRouter);
  app.get("/*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "frontend/build", "index.html"));
  });

  server.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
  );
});
