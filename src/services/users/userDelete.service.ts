import { string } from "yup";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IUserID } from "../../interfaces/user.interfaces";

const deleteUserService = async ({ id }: IUserID) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new AppError("O usuário não foi encontrado");
  }

  return await userRepository.delete(id);
};

export default deleteUserService;
