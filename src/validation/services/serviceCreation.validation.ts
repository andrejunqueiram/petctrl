import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import AppError from "../../errors/AppError";
import { CreateServiceValidation } from "../../interfaces";

export const createOwnerSchema: SchemaOf<CreateServiceValidation> = yup
  .object()
  .shape({
    name: yup.string().required(),
    category: yup.string().required(),
    price: yup.number().required(),
  });

export const validateOwnerCreation = (
  schema: SchemaOf<CreateServiceValidation>
) => {
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
};
