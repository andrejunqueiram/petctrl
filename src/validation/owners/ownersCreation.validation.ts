import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import AppError from "../../errors/AppError";
import { IOwnerCreate } from "../../interfaces/owners.interfaces";

export const createOwnerSchema: SchemaOf<IOwnerCreate> = yup.object().shape({
  name: yup.string().required("nome é obrigatório"),
  email: yup
    .string()
    .email("email inválido")
    .required("email é obrigatório")
    .transform((value, originalValue) => originalValue.toLowerCase()),
  address: yup.string().required("endereço é obrigatório"),
  phone_number: yup.string().required("telefone é obrigatório"),
});

export const validateOwnerCreation = (schema: SchemaOf<IOwnerCreate>) => {
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.validOwner = validatedData;
        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "));
      }
    } catch (err) {
      next(err);
    }
  };
};
