import { Express } from "express";
import { petsRoutes } from "./pets.routes";


export const routes = (app: Express) => {
    app.use("/pets", petsRoutes())
}
 