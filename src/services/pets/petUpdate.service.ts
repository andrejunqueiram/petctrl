import { AppDataSource } from "../../data-source";
import { Pet } from "../../entities/pets.entity";
import AppError from "../../errors/AppError";
import { IPetUpdate } from "../../interfaces/pets.interfaces";

const petUpdateService = async ({ id, name, breed, birthday }: IPetUpdate) => {
  const petRepository = AppDataSource.getRepository(Pet);

  const pet = await petRepository.findOne({ where: { id } });

  if (!pet) {
    throw new AppError("Id não encontrado.");
  }

  name ? (pet.name = name) : pet.name;
  breed ? (pet.breed = breed) : pet.breed;
  birthday ? (pet.birthday = birthday) : pet.birthday;

  return petRepository.save(pet);
};

export default petUpdateService;
