import { Request, Response } from "express";
import authService from "../services/sessions/sessions.service";
export default class SessionController {
  static async store(req: Request, res: Response) {
    const { name, password } = req.validSession;

    const authUser = await authService({ name, password });

    return res.status(200).json(authUser);
  }
}
