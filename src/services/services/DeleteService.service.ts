import { AppDataSource } from "../../data-source";
import Service from "../../entities/Services";
import AppError from "../../errors/AppError";
import { IServiceId } from "../../interfaces/Services.interfaces";

const deleteServiceService = async ({ id }: IServiceId) => {
  const serviceRepository = AppDataSource.getRepository(Service);

  const service = await serviceRepository.findOne({ where: { id } });

  if (!service) {
    throw new AppError("Nenhum serviço com esse id");
  }

  return await serviceRepository.delete(id);
};

export default deleteServiceService;
