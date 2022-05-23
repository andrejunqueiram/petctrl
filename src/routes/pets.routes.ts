import { Router } from "express";
import PetsController from "../controllers/Pets.controller";
import {
  createPetSchema,
  validatePetCreation,
} from "../validation/pets/petsCreation.validation";

const petsRouter = Router();

petsRouter.post(
  "/",
  validatePetCreation(createPetSchema),
  PetsController.store
);
petsRouter.get("/", PetsController.index);
petsRouter.get("/:id", PetsController.show);
petsRouter.patch("/:id", PetsController.update);
petsRouter.delete("/:id", PetsController.delete);

export default petsRouter;
