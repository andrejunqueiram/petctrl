import { Reports } from "../../entities/reports.entities";
import { AppDataSource } from "../../data-source";
import { IReportCreate } from "../../interfaces/reports";

const reportsCreateService = async ({ reports, pet_id }: IReportCreate) => {
  const reportsRepository = AppDataSource.getRepository(Reports);
  const data = new Reports();
  data.reports = reports;
  data.pet_id = pet_id;

  reportsRepository.create(data);
  await reportsRepository.save(data);
  console.log("entrou no service");
  return data;
};

export default reportsCreateService;
