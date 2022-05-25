import { Request, Response } from "express";
import serviceListCreateService from "../services/service_list/serviceListCreate.service";
import serviceListDeleteService from "../services/service_list/serviceListDelete.service";

export default class ServiceListController {
  static async store(req: Request, res: Response) {
    const { pet_id, pet_services } = req.validServiceList;

    const serviceList = await serviceListCreateService({
      pet_id,
      pet_services,
    });

    return res.status(201).json(serviceList);
  }

  // static async index(req: Request, res: Response) {}
  // static async show(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await serviceListDeleteService(id);

    return res.status(204).json();
  }
}
