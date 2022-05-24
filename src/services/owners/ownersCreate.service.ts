import { Owner } from "../../entities/owners.entity";
import { IOwnerCreate } from "../../interfaces/owners.interfaces";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
export const ownersCreateService = async ({
  name,
  email,
  address,
  phone_number,
}: IOwnerCreate) => {
  const ownerRepository = AppDataSource.getRepository(Owner);

  const ownerExistance = await ownerRepository.findOne({
    where: {
      email,
    },
  });

  if (ownerExistance) {
    throw new AppError("Tutor já cadastrado com este e-mail", 409);
  }

  const owner = new Owner();
  owner.name = name;
  owner.email = email;
  owner.address = address;
  owner.phone_number = phone_number;

  ownerRepository.create(owner);
  await ownerRepository.save(owner);

  return owner;
};
