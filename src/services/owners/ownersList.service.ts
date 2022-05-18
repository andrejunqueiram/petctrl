import { AppDataSource } from '../data-source';
import { Owner } from '../entities/owners.entity';

export const ownerListService = async () => {
  const userRepository = AppDataSource.getRepository(Owner);
  const owners = userRepository.find();
  return owners;
};
