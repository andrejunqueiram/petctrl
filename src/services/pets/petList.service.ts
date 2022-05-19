import { AppDataSource } from "../../data-source";
import { Pet } from "../../entities/pets.entity";
import AppError from "../../errors/AppError";

const petListService = async (id: string) => {
  const petRepository = AppDataSource.getRepository(Pet);

  const pets = await petRepository.findOne({ where: { id } });

  if (!pets) {
    throw new AppError("Id não encontrado.");
  }

  return pets;
};

export default petListService;
