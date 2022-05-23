import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IUserSession } from "../../interfaces/user.intefaces";

const authService = async ({ name, password }: IUserSession) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { name } });

  if (!user) {
    throw new AppError("Usuário ou senha inválidos");
  }

  const comparePassword = await compare(password, user.password);

  if (!comparePassword) {
    throw new AppError("Usuário ou senha inválidos");
  }

  const token = sign({}, process.env.SECRET_KEY || "default", {
    subject: user.id,
    expiresIn: "1d",
  });

  return {
    user,
    token,
  };
};

export default authService;
