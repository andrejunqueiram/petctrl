import * as express from "express";
import { IOwnerCreate } from "../../src/interfaces/owners";
import { IPetCreate } from "../../src/interfaces/pets";
import { IReportCreate } from "../../src/interfaces/reports";
import { IServiceCreate } from "../../src/interfaces/Services.interfaces";
import { IUserCreate } from "../../src/interfaces/user.inteface";

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
