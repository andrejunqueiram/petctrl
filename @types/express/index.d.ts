import * as express from "express";
import { IOwnerCreate } from "../../src/interfaces/owners.interfaces";
import { IPetCreate } from "../../src/interfaces/pets.interfaces";
import { IReportCreate } from "../../src/interfaces/reports.interfaces";
import { IServiceCreate } from "../../src/interfaces/services.interfaces";
import { IServiceListCreate } from "../../src/interfaces/service_list.interfaces";
import { IUserCreate, IUserSession } from "../../src/interfaces/user.intefaces";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
      validUser: IUserCreate;
      validOwner: IOwnerCreate;
      validPet: IPetCreate;
      validReport: IReportCreate;
      validService: IServiceCreate;
      validSession: IUserSession;
      validServiceList: IServiceListCreate;
    }
  }
}
