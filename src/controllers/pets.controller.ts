import { Request, Response } from "express";
import { IPet } from "../interfaces/pets";
import petCreateService from "../services/pets/petCreate.service";
import petsListService from "../services/pets/petsList.service";
import petListService from "../services/pets/petList.service";

export default class PetsController {
  static async store(req: Request, res: Response) {
    const { name, breed, type, birthday, owner_id } = req.body;

    const pet = await petCreateService({
      name,
      breed,
      type,
      birthday,
      owner_id,
    });

    return res.status(201).json(pet);
  }

  static async index(req: Request, res: Response) {
    const petsList: IPet[] = await petsListService();

    return res.status(200).json(petsList);
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const petList = await petListService(id);

    return res.status(200).json(petList);
  }
  
  static async update(req: Request, res: Response) {}
  static async delete(req: Request, res: Response) {}
}
