import { Router } from "express";
import ServiceListController from "../controllers/ServiceList.controller";
import {
  createServiceListSchema,
  validateServiceListCreation,
} from "../validation/service_list/serviceListCreation.validation";

const serviceListRouter = Router();

serviceListRouter.post(
  "/",
  validateServiceListCreation(createServiceListSchema),
  ServiceListController.store
);
// serviceListRouter.get("/", ServiceListController.index);
// serviceListRouter.get("/", ServiceListController.show);
serviceListRouter.delete("/:id", ServiceListController.delete);

export default serviceListRouter;
