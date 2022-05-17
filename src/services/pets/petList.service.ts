import { AppDataSource } from "../../data-source";
import { Pet } from "../../entities/pets.entity";

const petListService = async (id: string) => {
  const petRepository = AppDataSource.getRepository(Pet);

  const pets = await petRepository.find();

  const pet = pets.find((pet) => pet.id === id);

  return pet; 
};

export default petListService; 
