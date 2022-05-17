import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import AppError from "../../errors/AppError";
import { CreatePetValidation } from "../../interfaces";

export const createOwnerSchema: SchemaOf<CreatePetValidation> = yup
  .object()
  .shape({
    owner_id: yup.string().required(),
    name: yup.string().required(),
    birthday: yup.date().required(),
  });

export const validateOwnerCreation = (
  schema: SchemaOf<CreatePetValidation>
) => {
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.validPet = validatedData;
        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "));
      }
    } catch (err) {
      next(err);
    }
  };
};
