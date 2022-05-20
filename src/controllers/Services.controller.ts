import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Service } from "../entities/services.entity";
import createServiceService from "../services/services/serviceCreate.service";
import deleteServiceService from "../services/services/serviceDelete.service";
import updateServiceService from "../services/services/serviceUpdate.service";

export default class ServicesController {
  static async store(req: Request, res: Response) {
    const { name, price, category } = req.body;

    const service = await createServiceService({ name, price, category });

    return res.status(201).json(service);
  }

  static async index(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(Service);

    const services = await userRepository.find();

    return res.json(services);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, category } = req.body;

    const updateService = await updateServiceService({
      id,
      name,
      price,
      category,
    });

    return res.json(updateService);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await deleteServiceService({ id });

    return res.status(204).json();
  }
}
