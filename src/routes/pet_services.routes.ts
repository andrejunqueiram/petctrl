import { Router } from "express";
import PetServicesController from "../controllers/Pet_Services.controller";

const petServicesRouter = Router();

petServicesRouter.post("/", PetServicesController.store);
petServicesRouter.get("/", PetServicesController.index);
petServicesRouter.get("/", PetServicesController.show);
petServicesRouter.delete("/", PetServicesController.delete);

export default petServicesRouter;
