import { Router } from "express";
import PetsController from "../controllers/pets.controller";

const routes = Router();

export const petsRoutes = () => {
  routes.post("/pets", PetsController.store);
  routes.get("/pets", PetsController.index);
  routes.get("/pets/:id", PetsController.show);
  routes.patch("/pets/:id", PetsController.update);
  routes.delete("/pets/:id", PetsController.delete);

  return routes;
};
