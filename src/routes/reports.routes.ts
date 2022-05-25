import { Router } from "express";
import ReportsController from "../controllers/Reports.controller";
import {
  createReportSchema,
  validateReportCreation,
} from "../validation/reports/reportCreation.validation";

const reportsRouter = Router();

reportsRouter.post(
  "/",
  validateReportCreation(createReportSchema),
  ReportsController.store
);
reportsRouter.get("/", ReportsController.index);
reportsRouter.patch("/:id", ReportsController.update);
reportsRouter.delete("/:id", ReportsController.delete);

export default reportsRouter;
