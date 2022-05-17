import * as express from "express";
import {
  CreateOwnerValidation,
  CreatePetValidation,
  CreateUserValidation,
} from "../../src/interfaces";

declare global {
  namespace Express {
    interface Request {
      validUser: CreateUserValidation;
      validOwner: CreateOwnerValidation;
      validPet: CreatePetValidation;
    }
  }
}
