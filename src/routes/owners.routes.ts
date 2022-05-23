import { Router } from "express";

import OwnersController from "../controllers/Owners.controller";
import {
  createOwnerSchema,
  validateOwnerCreation,
} from "../validation/owners/ownersCreation.validation";

const ownerRoutes = Router();

ownerRoutes.post(
  "/",
  validateOwnerCreation(createOwnerSchema),
  OwnersController.store
);
ownerRoutes.get("/", OwnersController.index);
ownerRoutes.patch("/:id", OwnersController.update);
ownerRoutes.delete("/:id", OwnersController.delete);

export default ownerRoutes;
