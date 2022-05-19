import { Router } from "express";
import SessionController from "../controllers/Session.controller";

const sessionRoutes = Router();

sessionRoutes.post("/signup", SessionController.store);

export default sessionRoutes;
