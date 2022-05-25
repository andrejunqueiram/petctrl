import { AppDataSource } from "../../data-source";
import { Service } from "../../entities/services.entity";
import AppError from "../../errors/AppError";
import { IServiceCreate } from "../../interfaces/services.interfaces";

const createServiceService = async ({
  name,
  price,
  category,
}: IServiceCreate) => {
  const serviceRepository = AppDataSource.getRepository(Service);

  const serviceExistance = await serviceRepository.findOne({ where: { name } });

  if (serviceExistance) {
    throw new AppError("Serviço já cadastrado.", 409);
  }

  const service = new Service();
  service.name = name;
  service.price = price;
  service.category = category;

  serviceRepository.create(service);

  await serviceRepository.save(service);

  return service;
};

export default createServiceService;
