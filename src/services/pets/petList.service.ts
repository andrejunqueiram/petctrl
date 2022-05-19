import { AppDataSource } from "../../data-source";
import { Pet } from "../../entities/pets.entity";
import AppError from "../../errors/AppError";

const petListService = async (id: string) => {
  const petRepository = AppDataSource.getRepository(Pet);

  const pets = await petRepository.find();

  const pet = pets.find((pet) => pet.id === id);

  if(!pets) {
    throw new AppError("Id não encontrado.");
  }

  return pet; 
};

export default petListService; 
