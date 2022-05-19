import { Router } from "express";

import OwnersController from "../controllers/owners.controller";

const ownerRoutes = Router();

ownerRoutes.post("/owners", OwnersController.store);
ownerRoutes.get("/owners", OwnersController.index);
ownerRoutes.patch("/owners/:id", OwnersController.update);
ownerRoutes.delete("/owners/:id", OwnersController.delete);

export default ownerRoutes;
