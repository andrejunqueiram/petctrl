import { Request, Response } from "express";
import createUserService from "../services/users/userCreate.service";
import deleteUserService from "../services/users/userDelete.service";
import listUsersService from "../services/users/userList.service";
import updateUserService from "../services/users/userUpdate.service";
export default class UserController {
  static async store(req: Request, res: Response) {
    const { name, password, isAdm } = req.body;

    const user = await createUserService({ name, password, isAdm });

    return res.status(201).json(user);
  }
  static async index(req: Request, res: Response) {
    const users = await listUsersService();

    return res.json(users);
  }
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, password, isAdm } = req.body;

    const user = await updateUserService({ id, name, password, isAdm });

    return res.json(user);
  }
  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUser = await deleteUserService({ id });

    return res.status(204);
  }
}
