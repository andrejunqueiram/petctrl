import { AppDataSource } from "../../data-source";
import { Reports } from "../../entities/reports.entities";
import AppError from "../../errors/AppError";

const reportsListServices = async () => {
  const repostsRepository = AppDataSource.getRepository(Reports);
  const reports = await repostsRepository.find();
  return reports;
};
export default reportsListServices;
