import { AppDataSource } from "../../data-source";
import { ServiceList } from "../../entities/service_list.entity";
import AppError from "../../errors/AppError";

const serviceListDeleteService = async (id: string) => {
  const serviceListRepository = AppDataSource.getRepository(ServiceList);
  const serviceList = await serviceListRepository.findOne({
    where: {
      id,
    },
  });

  if (!serviceList) {
    throw new AppError("Lista de serviços não encontrada", 404);
  }

  await serviceListRepository.delete(id);

  return true;
};

export default serviceListDeleteService;
