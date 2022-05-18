import { AppDataSource } from "../../data-source";
import Service from "../../entities/Services";
import AppError from "../../errors/AppError";
import { IServiceCreate } from "../../interfaces/Services.interfaces";

const createServiceService = async ({
  name,
  price,
  category,
}: IServiceCreate) => {
  const serviceRepository = AppDataSource.getRepository(Service);

  const serviceExistance = await serviceRepository.findOne({ where: { name } });

  if (serviceExistance) {
    throw new AppError("Serviço já cadastrado.");
  }

  const service = serviceRepository.create({
    name,
    price,
    category,
  });

  await serviceRepository.save(service);

  return service;
};

export default createServiceService;
