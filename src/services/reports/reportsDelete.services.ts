import { Reports } from "../../entities/reports.entities";
import { AppDataSource } from "../../data-source";
import { IReportId } from "../../interfaces/reports";
import AppError from "../../errors/AppError";

const reportsDeleteService = async ({ id }: IReportId) => {
  const reportsRepository = AppDataSource.getRepository(Reports);
  const data = await reportsRepository.findOne({ where: { id } });

  if (!data) {
    throw new AppError("Nenhum relatorio com esse id");
  }

  return await reportsRepository.delete(id);
};

export default reportsDeleteService;
