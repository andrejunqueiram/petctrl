import {Owner} from "../../entities/owners.entity"
import { IOwnerCreate } from "../../interfaces/owners"
import { AppDataSource } from "../../data-source"
export const ownersCreateService = async({
    name,
    email,
    address,
    phone_number,
    pets,
} : IOwnerCreate) =>{
    const ownerRepository = AppDataSource.getRepository(Owner);
    const owner = new Owner();
    owner.name = name;
    owner.email = email;
    owner.address = address;
    owner.phone_number = phone_number;
    owner.pets = pets;

    ownerRepository.create(owner);
    await ownerRepository.save(owner);

    return owner;
}