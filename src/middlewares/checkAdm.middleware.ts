// import { NextFunction, Request, Response } from "express";
// import { AppDataSource } from "../data-source";
// import User from "../entities/User";
// import AppError from "../errors/AppError";

// const checkAdmCheckMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { id } = req.user;
//   const userRepository = AppDataSource.getRepository(User);
//   const user = await userRepository.findOne({
//     where: {
//       id,
//     },
//   });

//   if (!user) {
//     throw new AppError("Usuário não encontrado", 404);
//   }

//   if (!user.isAdm) {
//     throw new AppError(
//       "Acesso negado (condição de Administrador necessária)",
//       401
//     );
//   }

//   return next();
// };

// export default checkAdmCheckMiddleware;
