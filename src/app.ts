import "reflect-metadata";
import express from "express";
import "express-async-errors";
import "dotenv/config";
import ErrorMiddleware from "./middlewares/error.middleware";

import { routes } from "./routes";
// import AppError from "./errors/AppError";

const app = express();

app.use(express.json());

app.use(ErrorMiddleware.execute);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(routes);

export default app;
