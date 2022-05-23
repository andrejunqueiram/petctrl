import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import AppError from "../../errors/AppError";
import { IUserCreate } from "../../interfaces/user.intefaces";

export const createUserSchema: SchemaOf<IUserCreate> = yup.object().shape({
  name: yup.string().required("nome é obrigatório"),
  password: yup.string().required("senha é obrigatório"),
  isAdm: yup.boolean().required("verificação de cargo é obrigatório"),
});

export const validateUserCreation =
  (schema: SchemaOf<IUserCreate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.validUser = validatedData;
        next();
      } catch (err: any) {
        // throw new AppError(err.errors?.join(", "));
        return res.status(400).json({
          status: "error",
          message: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
