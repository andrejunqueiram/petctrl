import { compare, hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IUser } from "../../interfaces/user.interfaces";

const updateUserService = async ({ id, name, password, isAdm }: IUser) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id } });
  if (!user) {
    throw new AppError("O usuário não foi encontrado", 404);
  }

  name ? (user.name = name) : user.name;
  isAdm ? (user.isAdm = isAdm) : user.isAdm;

  if (password) {
    const comparePassword = await compare(password, user.password as string);
    if (!comparePassword) {
      const hashedPassword = await hash(password, 8);
      user.password = hashedPassword;
    }
  }

  await userRepository.save(user);

  return user;
};

export default updateUserService;
