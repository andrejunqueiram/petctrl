import { Request, Response } from "express";

export default class PetServicesController {
  static async store(req: Request, res: Response) {}
  static async index(req: Request, res: Response) {}
  static async show(req: Request, res: Response) {}
  static async delete(req: Request, res: Response) {
    return res.status(204);
  }
}
