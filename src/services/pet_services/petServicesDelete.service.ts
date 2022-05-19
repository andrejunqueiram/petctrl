import { AppDataSource } from "../../data-source";
import { PetServices } from "../../entities/pet_services.entity";
import AppError from "../../errors/AppError";

const petServicesDeleteService = async (id: string) => {
  const petServicesRepository = AppDataSource.getRepository(PetServices);
  const petServices = await petServicesRepository.findOne({ where: { id } });

  if (!petServices) {
    throw new AppError("Id não encontrado.");
  }

  await petServicesRepository.delete(id);

  return true;
};

export default petServicesDeleteService;
