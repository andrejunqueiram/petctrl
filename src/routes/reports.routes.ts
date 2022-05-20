import { Router } from "express";
import ReportsController from "../controllers/Reports.controller";

const reportsRouter = Router();

reportsRouter.post("/", ReportsController.store);
reportsRouter.get("/", ReportsController.index);
reportsRouter.patch("/:id", ReportsController.update);
reportsRouter.delete("/:id", ReportsController.delete);

export default reportsRouter;
