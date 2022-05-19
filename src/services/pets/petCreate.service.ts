import { Pet } from "../../entities/pets.entity";
import { AppDataSource } from "../../data-source";
import { IPetCreate } from "../../interfaces/pets";

const petCreateService = async ({
  name,
  breed,
  type,
  birthday,
  owner_id,
}: IPetCreate) => {
  const petRepository = AppDataSource.getRepository(Pet);
  const pet = new Pet();
  pet.name = name;
  pet.owner_id = owner_id;
  pet.type = type;
  pet.breed = breed;
  pet.birthday = new Date(birthday);

  petRepository.create(pet);
  await petRepository.save(pet);

  return pet;
};

export default petCreateService;
