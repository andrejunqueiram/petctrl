import { Router } from "express";

import OwnersController from "../controllers/Owners.controller";

const ownerRoutes = Router();

ownerRoutes.post("/", OwnersController.store);
ownerRoutes.get("/", OwnersController.index);
ownerRoutes.patch("/:id", OwnersController.update);
ownerRoutes.delete("/:id", OwnersController.delete);

export default ownerRoutes;
