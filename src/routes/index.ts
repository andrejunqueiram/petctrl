import { Router } from "express";
import reportsRouter from "./reports.routes";

import sessionRoutes from "./sessions.routes";
import userRoutes from "./users.routes";
import serviceRouter from "./services.routes";
import petsRouter from "./pets.routes";
import ownerRoutes from "./owners.routes";
import serviceListRouter from "./service_list.routes";
import checkAdmMiddleware from "../middlewares/checkAdm.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const routes = Router();

routes.use("/sessions", sessionRoutes);

routes.use(ensureAuthMiddleware);

routes.use("/services", serviceRouter);
routes.use("/pets", petsRouter);
routes.use("/pets/servicelist", serviceListRouter);
routes.use("/owners", ownerRoutes);

routes.use(checkAdmMiddleware);

routes.use("/reports", reportsRouter);
routes.use("/users", userRoutes);

export default routes;
