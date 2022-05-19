import { Router } from "express";

import sessionRoutes from "./session.routes";
import userRoutes from "./users.routes";
import serviceRouter from "./services.routes";
import petsRouter from "./pets.routes";

const routes = Router();

routes.use("/services", serviceRouter);
routes.use("/pets", petsRouter);
routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);


export default routes;
