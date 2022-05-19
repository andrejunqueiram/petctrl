import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import AppError from "../../errors/AppError";
import { IPetCreate } from "../../interfaces/pets";

export const createPetSchema: SchemaOf<IPetCreate> = yup.object().shape({
  owner_id: yup.string().required("id do tutor é obrigatório"),
  name: yup.string().required("nome é obrigatório"),
  birthday: yup.date().required("data de nascimentoé obrigatório"),
  breed: yup.string().required("raça é obrigatório"),
  type: yup.string().required("tipo é obrigatório"),
});

export const validatePetCreation = (schema: SchemaOf<IPetCreate>) => {
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
