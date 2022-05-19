import { Request, Response } from "express";
import { ownersCreateService } from "../services/owners/ownersCreate.service";
import { ownerDeleteService } from "../services/owners/ownersDelete.service";
import { ownerListService } from "../services/owners/ownersList.service";
import { ownerUpdateService } from "../services/owners/ownersUpdate.service";
export default class OwnersController {
  static async store(req: Request, res: Response) {
    const { name, email, address, phone_number, pets } = req.body;

    const owner = await ownersCreateService({
      name,
      email,
      address,
      phone_number,
      pets,
    });
    return res.status(201).json(owner);
  }
  static async index(req: Request, res: Response) {
    const owners = await ownerListService();
    return res.json(owners);
  }

  // static async show(req: Request, res: Response) {
  //     const { id } = req.params;

  //     const ownersList = await ownerListService(id);

  //     return res.status(200).json(ownersList);
  //   }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, address, phone_number, pets } = req.body;
    const updatedOwner = await ownerUpdateService(
      id,
      name,
      email,
      address,
      phone_number,
      pets
    );
    return res.json(updatedOwner);
  }
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await ownerDeleteService(id);
    return res.status(204);
  }
}