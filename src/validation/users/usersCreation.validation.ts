import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import AppError from "../../errors/AppError";
import { CreateUserValidation } from "../../interfaces";

export const createUserSchema: SchemaOf<CreateUserValidation> = yup
  .object()
  .shape({
    name: yup.string().required("é obrigatório"),
    password: yup.string().required("é obrigatório"),
    isAdm: yup.boolean().required("é obrigatório"),
  });

export const validateUserCreation = (
  schema: SchemaOf<CreateUserValidation>
) => {
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
        throw new AppError(err.errors?.join(", "));
      }
    } catch (err) {
      next(err);
    }
  };
};
