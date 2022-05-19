import {Request, Response} from 'express'
import { ownersCreateService } from '../services/owners/ownersCreate.service';
import { ownerDeleteService } from '../services/owners/ownersDelete.service';
import { ownerListService } from '../services/owners/ownersList.service';
export default class OwnersController{
static async store(req: Request, res: Response) {
    const {name, email, address, phone_number, pets} = req.body;

    const owner = await ownersCreateService({
        name,
        email,
        address,
        phone_number,
        pets,
    });
    return res.status(201).json(owner);
};
static async index(req: Request, res: Response) {
    const owners = await ownerListService();
    return res.send(owners);
}

// static async show(req: Request, res: Response) {
//     const { id } = req.params;

//     const ownersList = await ownerListService(id);

//     return res.status(200).json(ownersList);
//   }

static async update(req: Request, res: Response) {
    const {id} = req.params;
    const {name, email, address, phone_number, pets} = req.body

    return res.status(201).json({message: "Dados atualizados"});
};
static async delete(req: Request, res: Response) {
    const {id} = req.params;
    const ownerDeleteController = await ownerDeleteService(id);
    return res.status(200).json({message: 'Usuário deletado'})
};
}