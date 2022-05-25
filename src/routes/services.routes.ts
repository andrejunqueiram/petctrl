import { Router } from "express";
import ServicesController from "../controllers/Services.controller";
import {
  createServiceSchema,
  validateServiceCreation,
} from "../validation/services/serviceCreation.validation";

const serviceRouter = Router();

serviceRouter.post(
  "/",
  validateServiceCreation(createServiceSchema),
  ServicesController.store
);
serviceRouter.get("/", ServicesController.index);
serviceRouter.patch("/:id", ServicesController.update);
serviceRouter.delete("/:id", ServicesController.delete);

export default serviceRouter;
