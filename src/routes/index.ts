import { Router } from "express";
import serviceRouter from "./services.routes";

const routes = Router();

routes.use("/services", serviceRouter);

export default routes;
