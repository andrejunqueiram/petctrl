import { AppDataSource } from "../../data-source";

import { Owner } from "../../entities/owners.entity";

export const ownerUpdateService = async (
    id: string,
    name: string,
    email: string,
    address: string,
    phone_number: string,
    pets: string,
) => {
    const ownerRepository = AppDataSource.getRepository(Owner);

    const owners = await ownerRepository.find();

    const ownerID = owners.find((owner) => owner.id === id);

    const newName = name;
    const newEmail = email;
    const newAddress = address;
    const newPhone_number = phone_number;
    const newPet = pets;

    await ownerRepository.update(ownerID!.id,{
        name: newName,
        email: newEmail,
        address: newAddress,
        phone_number: newPhone_number,
        pets: newPet,
    });

}