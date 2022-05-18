import { hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { IUser, IUserCreate } from "../../interfaces/user.inteface";

const createUserService = async ({ name, password, isAdm }: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const userFind = await userRepository.findOne({ where: { name } });

  if (userFind) {
    throw new AppError("Já existe usuário com esse nome");
  }

  const hashedPassword = await hash(password, 8);

  const user = userRepository.create({ name, password: hashedPassword, isAdm });

  await userRepository.save(user);

  return user;
};

export default createUserService;
