import { Router } from "express";
import ServicesController from "../controllers/Services.controller";

const serviceRouter = Router();

serviceRouter.post("/", ServicesController.store);
serviceRouter.get("/", ServicesController.index);
serviceRouter.patch("/:id", ServicesController.update);
serviceRouter.delete("/:id", ServicesController.delete);

export default serviceRouter;
