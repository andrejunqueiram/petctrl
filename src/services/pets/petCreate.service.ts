import { Pet } from "../../entities/pets.entity";
import { AppDataSource } from "../../data-source";
import { IPetCreate } from "../../interfaces/pets.interfaces";
import { Owner } from "../../entities/owners.entity";
import AppError from "../../errors/AppError";

const petCreateService = async ({
  name,
  breed,
  type,
  birthday,
  owner_id,
}: IPetCreate) => {
  const petRepository = AppDataSource.getRepository(Pet);
  const ownerRepository = AppDataSource.getRepository(Owner);

  const owner = await ownerRepository.findOne({
    where: {
      id: owner_id || undefined,
    },
  });

  if (!owner) {
    throw new AppError("Tutor não encontrado.", 404);
  }

  const pet = new Pet();
  pet.name = name;
  pet.owner = owner;
  pet.type = type;
  pet.breed = breed;
  pet.birthday = new Date(birthday);
  pet.ownerId = owner_id;

  petRepository.create(pet);
  await petRepository.save(pet);

  return pet;
};

export default petCreateService;
