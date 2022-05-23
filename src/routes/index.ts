import { Router } from "express";
import reportsRouter from "./reports.routes";

import sessionRoutes from "./sessions.routes";
import userRoutes from "./users.routes";
import serviceRouter from "./services.routes";
import petsRouter from "./pets.routes";
import ownerRoutes from "./owners.routes";
import serviceListRouter from "./service_list.routes";

const routes = Router();

routes.use("/reports", reportsRouter);
routes.use("/services", serviceRouter);
routes.use("/pets", petsRouter);
routes.use("/pets/servicelist", serviceListRouter);
routes.use("/users", userRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/owners", ownerRoutes);

export default routes;
