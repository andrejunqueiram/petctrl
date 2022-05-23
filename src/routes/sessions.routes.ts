import { Router } from "express";
import SessionController from "../controllers/Sessions.controller";
import {
  sessionsLogin,
  validateSessionsLogin,
} from "../validation/sessions/sessionsLogin.validation";

const sessionRoutes = Router();

sessionRoutes.post(
  "/",
  validateSessionsLogin(sessionsLogin),
  SessionController.store
);

export default sessionRoutes;
