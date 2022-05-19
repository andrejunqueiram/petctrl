import { AppDataSource } from "../../data-source";
import { Pet } from "../../entities/pets.entity";
import { PetServices } from "../../entities/pet_services.entity";
import AppError from "../../errors/AppError";
import { IPetServicesCreate } from "../../interfaces/pet_services.interfaces";

// services_id array
const petServiceCreateService = async ({
  pet_id,
  service_date,
}: IPetServicesCreate) => {
  const petServicesRepository = AppDataSource.getRepository(PetServices);
  const petRepository = AppDataSource.getRepository(Pet);

  const pet = await petRepository.findOne({ where: { id: pet_id } });

  if (!pet) {
    throw new AppError("Pet não encontrado.", 404);
  }

  const petService = new PetServices();
  petService.pet = pet;
  // petService.services = array de services
  petService.service_date = new Date(service_date);

  petServicesRepository.create(petService);
  await petServicesRepository.save(petService);

  return petService;
};

export default petServiceCreateService;
