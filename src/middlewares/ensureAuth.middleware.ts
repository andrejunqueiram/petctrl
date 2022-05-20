import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";

const ensureAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let jwtToken = req.headers.authorization;

  if (!jwtToken) {
    throw new AppError("Token de autenticação inexistente", 404);
  }

  try {
    const [, token] = jwtToken?.split(" ");

    const secret = process.env.SECRET_KEY || "default";

    const decoded = jwt.verify(token, secret);

    const { sub } = decoded;

    req.user = {
      id: sub as string,
    };

    return next();
  } catch (err) {
    throw new AppError("Token inválido", 401);
  }
};

export default ensureAuthMiddleware;
