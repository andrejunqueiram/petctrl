import { Router } from "express";
import ServiceListController from "../controllers/ServiceList.controller";

const serviceListRouter = Router();

serviceListRouter.post("/", ServiceListController.store);
serviceListRouter.get("/", ServiceListController.index);
serviceListRouter.get("/", ServiceListController.show);
serviceListRouter.delete("/", ServiceListController.delete);

export default serviceListRouter;
