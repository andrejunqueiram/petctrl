import { AppDataSource } from "../../data-source";
import { Pet } from "../../entities/pets.entity";

const petsListService = async () => {
  const petRepository = AppDataSource.getRepository(Pet);

  const petsList = await petRepository.find();

  return petsList;
};

export default petsListService; 