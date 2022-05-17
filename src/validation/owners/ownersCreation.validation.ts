import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import AppError from "../../errors/AppError";
import { CreateOwnerValidation } from "../../interfaces";

export const createOwnerSchema: SchemaOf<CreateOwnerValidation> = yup
  .object()
  .shape({
    name: yup.string().required("é obrigatório"),
    email: yup
      .string()
      .email("Invalid email")
      .required("é obrigatório")
      .transform((value, originalValue) => originalValue.toLowerCase()),
    address: yup.string().required("é obrigatório"),
    phone_number: yup.string().required("é obrigatório"),
  });

export const validateOwnerCreation = (
  schema: SchemaOf<CreateOwnerValidation>
) => {
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
