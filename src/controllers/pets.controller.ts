import { Request, response, Response } from "express";
import petCreateService from "../services/pets/petCreate.service";
import petsListService from "../services/pets/petsList.service";
import petListService from "../services/pets/petList.service";
import petUpdateService from "../services/pets/petUpdate.service";
import petDeleteService from "../services/pets/petDelete.service";

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
    const petsList = await petsListService();

    return res.status(200).json({ message: "Pet criado.", pet: petsList });
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const petList = await petListService(id);

    return res.status(200).json(petList);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, breed, birthday } = req.body;

    const petUpdate = await petUpdateService({ id, name, breed, birthday });
    return res
      .status(201)
      .json({ message: "Informações atualizadas.", pet: petUpdate });
  }
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletePet = await petDeleteService(id);

    return response.status(204).json({ message: "Pet excluído." });
  }
}
