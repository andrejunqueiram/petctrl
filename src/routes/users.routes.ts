import { Router } from "express";
import UserController from "../controllers/Users.controller";
import {
  createUserSchema,
  validateUserCreation,
} from "../validation/users/usersCreation.validation";

const userRoutes = Router();

userRoutes.post(
  "/",
  validateUserCreation(createUserSchema),
  UserController.store
);
userRoutes.get("/", UserController.index);
userRoutes.patch("/:id", UserController.update);
userRoutes.delete("/:id", UserController.delete);

export default userRoutes;
