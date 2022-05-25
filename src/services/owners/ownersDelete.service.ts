import { Owner } from "../../entities/owners.entity";

import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";

export const ownerDeleteService = async (id: string) => {
  const ownerRepository = AppDataSource.getRepository(Owner);

  const owner = await ownerRepository.findOne({ where: { id } });

  if (!owner) {
    throw new AppError("Tutor não encontrado", 404);
  }

  await ownerRepository.delete(id);

  return true;
};
