import { AppDataSource } from "../../data-source";
import { Pet } from "../../entities/pets.entity";
import AppError from "../../errors/AppError";

const petDeleteService = async (id: string) => {
  const petRepository = AppDataSource.getRepository(Pet);
  const pet = await petRepository.findOne({ where: { id } });

  if (!pet) {
    throw new AppError("Id não encontrado.");
  }

  await petRepository.delete(pet.id);

  return true;
};

export default petDeleteService;
