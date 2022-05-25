import { Reports } from "../../entities/reports.entity";
import { AppDataSource } from "../../data-source";
import { IReportId } from "../../interfaces/reports.interfaces";
import AppError from "../../errors/AppError";

const reportsDeleteService = async ({ id }: IReportId) => {
  const reportsRepository = AppDataSource.getRepository(Reports);
  const data = await reportsRepository.findOne({ where: { id } });

  if (!data) {
    throw new AppError("Nenhum relatório com esse id.", 404);
  }

  await reportsRepository.delete(id);

  return true;
};

export default reportsDeleteService;
