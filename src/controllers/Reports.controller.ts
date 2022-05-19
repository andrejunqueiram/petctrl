import { Request, Response } from "express";
import { IReport } from "../interfaces/reports.interfaces";
import reportsCreateService from "../services/reports/reportsCreate.services";
import reportsListServices from "../services/reports/reportsList.services";
import reportsUpdateServices from "../services/reports/reportsUpdate.services";
import reportsDeleteService from "../services/reports/reportsDelete.services";

export default class ReportsController {
  static async store(req: Request, res: Response) {
    const { reports, pet_id } = req.body;

    const data = await reportsCreateService({
      pet_id,
      reports,
    });

    return res.status(201).json(data);
  }

  static async index(req: Request, res: Response) {
    const petsList: IReport[] = await reportsListServices();

    return res.json(petsList);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { reports, pet_id } = req.body;

    const updateService = await reportsUpdateServices({
      id,
      reports,
      pet_id,
    });

    return res.json(updateService);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await reportsDeleteService({ id });
    return res.status(204);
  }
}
