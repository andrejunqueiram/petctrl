import { Request, Response, NextFunction } from "express";
import { off } from "process";
import * as yup from "yup";
import { SchemaOf } from "yup";
import AppError from "../../errors/AppError";
import { IServiceListCreate } from "../../interfaces/service_list.interfaces";

export const createServiceListSchema: SchemaOf<IServiceListCreate> = yup
  .object()
  .shape({
    pet_id: yup.string().required("Id do pet é obrigatório"),
    pet_services: yup.array().required("Lista de serviços é obrigatório"),
  });

export const validateServiceListCreation =
  (schema: SchemaOf<IServiceListCreate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.validServiceList = validatedData as IServiceListCreate;
        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "));
      }
    } catch (err) {
      next(err);
    }
  };
