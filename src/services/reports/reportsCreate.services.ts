import { Reports } from "../../entities/reports.entity";
import { AppDataSource } from "../../data-source";
import { IReportCreate } from "../../interfaces/reports.interfaces";
import { Pet } from "../../entities/pets.entity";
import AppError from "../../errors/AppError";

const reportsCreateService = async ({ reports, pet_id }: IReportCreate) => {
  const reportsRepository = AppDataSource.getRepository(Reports);
  const petsRepository = AppDataSource.getRepository(Pet);
  const pet = await petsRepository.findOne({ where: { id: pet_id } });
  if (!pet) {
    throw new AppError("Pet nao encontrado", 404);
  }
  const data = new Reports();
  data.reports = reports;
  data.pet = pet;

  reportsRepository.create(data);
  await reportsRepository.save(data);

  return data;
};

export default reportsCreateService;
