import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Pet } from "../../entities/pets.entity";
import { PetServices } from "../../entities/pet_services.entity";
import { Service } from "../../entities/services.entity";
import { ServiceList } from "../../entities/service_list.entity";
import AppError from "../../errors/AppError";
import { IServiceListCreate } from "../../interfaces/service_list.interfaces";

const serviceListCreateService = async ({
  pet_id,
  pet_services,
}: IServiceListCreate) => {
  const serviceListRepository = AppDataSource.getRepository(ServiceList);
  const petRepository = AppDataSource.getRepository(Pet);
  const serviceRepository = AppDataSource.getRepository(Service);
  const petServiceRepository = AppDataSource.getRepository(PetServices);

  const services = await serviceRepository.findBy({
    id: In(pet_services),
  });

  console.log(services);

  if (!services[pet_services.length - 1]) {
    throw new AppError("Lista de serviços não encontrada", 404);
  }

  const pet = await petRepository.findOne({ where: { id: pet_id } });

  console.log(pet);

  if (!pet) {
    throw new AppError("Pet não encontrado.", 404);
  }

  const serviceList = new ServiceList();
  serviceList.pet = pet;

  serviceListRepository.create(serviceList);
  await serviceListRepository.save(serviceList);

  // pet_services.forEach(async (serviceId) => {
  //   const petService = petServiceRepository.create({
  //     serviceListId: serviceList.id,
  //     serviceId,
  //   });

  //   console.log("***************************************************");
  //   console.log(petService);

  //   await petServiceRepository.save(petService);
  // });

  pet_services.forEach(async (service_id) => {
    console.log("***********************************************8");
    console.log(serviceList);
    const petService = new PetServices();
    petService.serviceListId = serviceList.id;
    petService.serviceId = service_id;

    petServiceRepository.create(petService);
    await petServiceRepository.save(petService);
  });

  return serviceList;
};

export default serviceListCreateService;
