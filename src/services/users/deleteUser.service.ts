import { string } from "yup";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { IUserID } from "../../interfaces/user.inteface";

const deleteUserService = async ({ id }: IUserID) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new AppError("O usuário não foi encontrado");
  }

  await userRepository.delete({ id });

  return "Usuário deletado com sucesso!";
};

export default deleteUserService;
