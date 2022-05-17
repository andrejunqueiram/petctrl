import { Router } from "express";
import userRoutes from "./users.routes";

const routes = Router();

routes.use("/users", userRoutes);
export default routes;
