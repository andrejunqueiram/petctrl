import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/", UserController.store);
userRoutes.get("/", UserController.index);
userRoutes.patch("/:id", UserController.update);
userRoutes.delete("/:id", UserController.delete);

export default userRoutes;
