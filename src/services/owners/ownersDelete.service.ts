import { Owner } from "../../entities/owners.entity";

import { AppDataSource } from "../../data-source";

export const ownerDeleteService = async (id: string) => {
    const ownerRepository = AppDataSource.getRepository(Owner);

    const owners = await ownerRepository.find();

    const ownerID = owners.find((owner) => owner.id === id);

    await ownerRepository.delete(ownerID!.id);
}