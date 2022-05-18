import { Router } from "express";
import reportsRouter from "./reports.routes";

const routes = Router();

routes.use("/reports", reportsRouter);

export default routes;
