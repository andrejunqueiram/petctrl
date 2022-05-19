import * as express from "express";
import { IOwnerCreate } from "../../src/interfaces/owners.interfaces";
import { IPetCreate } from "../../src/interfaces/pets.interfaces";
import { IReportCreate } from "../../src/interfaces/reports.interfaces";
import { IServiceCreate } from "../../src/interfaces/services.interfaces";
import { IUserCreate } from "../../src/interfaces/user.intefaces";

declare global {
  namespace Express {
    interface Request {
      validUser: IUserCreate;
      validOwner: IOwnerCreate;
      validPet: IPetCreate;
      validReport: IReportCreate;
      validService: IServiceCreate;
    }
  }
}
