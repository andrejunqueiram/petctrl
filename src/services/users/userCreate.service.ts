import { hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IUser, IUserCreate } from "../../interfaces/user.interfaces";

const createUserService = async ({ name, password, isAdm }: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const userFind = await userRepository.findOne({ where: { name } });

  if (userFind) {
    throw new AppError("Já existe usuário com esse nome", 409);
  }

  const hashedPassword = await hash(password, 8);

  const user = new User();

  user.name = name;
  user.password = hashedPassword;
  user.isAdm = isAdm;

  userRepository.create(user);

  await userRepository.save(user);

  return user;
};

export default createUserService;
