import { Router } from "express";
import PetsController from "../controllers/pets.controller";

const petsRouter = Router();

  petsRouter.post("/pets", PetsController.store);
  petsRouter.get("/pets", PetsController.index);
  petsRouter.get("/pets/:id", PetsController.show);
  petsRouter.patch("/pets/:id", PetsController.update);
  petsRouter.delete("/pets/:id", PetsController.delete);

  export default petsRouter;