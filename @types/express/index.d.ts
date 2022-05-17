import * as express from "express";
import {
  CreateOwnerValidation,
  CreatePetValidation,
  CreateReportValidation,
  CreateServiceValidation,
  CreateUserValidation,
} from "../../src/interfaces";

declare global {
  namespace Express {
    interface Request {
      validUser: CreateUserValidation;
      validOwner: CreateOwnerValidation;
      validPet: CreatePetValidation;
      validReport: CreateReportValidation;
      validService: CreateServiceValidation;
    }
  }
}
