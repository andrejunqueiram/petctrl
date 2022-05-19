import { Router } from "express";
import reportsRouter from "./reports.routes";

import sessionRoutes from "./sessions.routes";
import userRoutes from "./users.routes";
import serviceRouter from "./services.routes";
import petsRouter from "./pets.routes";
import ownerRoutes from "./owners.routes";

const routes = Router();

routes.use("/reports", reportsRouter);
routes.use("/services", serviceRouter);
routes.use("/pets", petsRouter);
routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);
routes.use("/owners", ownerRoutes);

export default routes;
