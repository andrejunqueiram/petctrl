import "reflect-metadata";
import express from "express";
import "express-async-errors";

import "dotenv/config";

// import routes from "./routes";
// import AppError from "./errors/AppError";

const app = express();

app.use(express.json());

app.get("/teste", (req, res) => {
  res.send("Hello");
});
// app.use(routes);

export default app;
