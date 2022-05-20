import { AppDataSource } from "../../data-source";

import { Owner } from "../../entities/owners.entity";
import AppError from "../../errors/AppError";

export const ownerUpdateService = async (
  id: string,
  name: string,
  email: string,
  address: string,
  phone_number: string
) => {
  const ownerRepository = AppDataSource.getRepository(Owner);

  const owner = await ownerRepository.findOne({
    where: { id },
  });

  if (!owner) {
    throw new AppError("Tutor não encontrado", 404);
  }

  name ? (owner.name = name) : owner.name;
  email ? (owner.email = email) : owner.email;
  address ? (owner.address = address) : owner.address;
  phone_number ? (owner.phone_number = phone_number) : owner.phone_number;

  await ownerRepository.save(owner);

  return owner;
};
