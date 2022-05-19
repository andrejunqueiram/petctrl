import { Router } from "express";
import SessionController from "../controllers/Sessions.controller";

const sessionRoutes = Router();

sessionRoutes.post("/", SessionController.store);

export default sessionRoutes;
