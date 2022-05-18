import { Router } from "express";
import serviceRouter from "./services.routes";
import petsRouter from "./pets.routes";

const routes = Router();

routes.use("/services", serviceRouter);
routes.use("/pets", petsRouter);

export default routes;
