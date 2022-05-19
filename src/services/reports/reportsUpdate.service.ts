import { Reports } from "../../entities/reports.entity";
import { AppDataSource } from "../../data-source";
import { IReport } from "../../interfaces/reports.interfaces";
import AppError from "../../errors/AppError";

const reportsUpdateServices = async ({ id, pet_id, reports }: IReport) => {
  const reportsRepository = AppDataSource.getRepository(Reports);
  const data = await reportsRepository.findOne({ where: { id } });
  if (!data) {
    throw new AppError("Nenhum relatorio com esse id");
  }
  reports ? (data.reports = reports) : data.reports;

  return reportsRepository.save(data);
};
export default reportsUpdateServices;
