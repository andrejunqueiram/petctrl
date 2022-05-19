import { AppDataSource } from "../../data-source";
import Service from "../../entities/Services";
import AppError from "../../errors/AppError";
import { IService } from "../../interfaces/Services.interfaces";

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

  return serviceRepository.save(service);
};

export default updateServiceService;
