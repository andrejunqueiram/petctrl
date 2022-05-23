import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import AppError from "../../errors/AppError";
import { IServiceCreate } from "../../interfaces/services.interfaces";

export const createServiceSchema: SchemaOf<IServiceCreate> = yup
  .object()
  .shape({
    name: yup.string().required("nome é obrigatório"),
    category: yup.string().required("categoria é obrigatório"),
    price: yup.number().required("preço é obrigatório"),
  });

export const validateServiceCreation =
  (schema: SchemaOf<IServiceCreate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.validService = validatedData;
        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "));
      }
    } catch (err) {
      next(err);
    }
  };
