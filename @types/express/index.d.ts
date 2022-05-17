import * as express from "express";
import { CreateUserValidation } from "../../src/interfaces";

declare global {
  namespace Express {
    interface Request {
      validUser: CreateUserValidation;
    }
  }
}
