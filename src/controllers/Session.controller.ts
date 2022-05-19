import { Request, Response } from "express";
import authService from "../services/sessions/sessions.service";
export default class SessionController {
  static async store(req: Request, res: Response) {
    const { name, password } = req.body;

    const authUser = await authService({ name, password });

    return res.json(authUser);
  }
}