import { AppDataSource } from "../../data-source";
import Service from "../../entities/services.entity";
import AppError from "../../errors/AppError";
import { IService } from "../../interfaces/services.interfaces";

const updateServiceService = async ({
  id,
  name,
  price,
  category,
}: IService) => {
  const serviceRepository = AppDataSource.getRepository(Service);

  const service = await serviceRepository.findOne({ where: { id } });

  if (!service) {
    throw new AppError("Nenhum serviço com esse id");
  }

  name ? (service.name = name) : service.name;
  price ? (service.price = price) : service.price;
  category ? (service.category = category) : service.category;

  await serviceRepository.save(service);

  return service;
};

export default updateServiceService;
