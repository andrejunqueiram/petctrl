import { Reports } from "../../entities/reports.entity";
import { AppDataSource } from "../../data-source";
import { IReportCreate } from "../../interfaces/reports.interfaces";

const reportsCreateService = async ({ reports, pet_id }: IReportCreate) => {
  const reportsRepository = AppDataSource.getRepository(Reports);
  const data = new Reports();
  data.reports = reports;
  data.pet_id = pet_id;

  reportsRepository.create(data);
  await reportsRepository.save(data);

  return data;
};

export default reportsCreateService;
