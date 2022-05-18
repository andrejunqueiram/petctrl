import { Router } from "express";
import sessionRoutes from "./session.routes";
import userRoutes from "./users.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);

export default routes;
