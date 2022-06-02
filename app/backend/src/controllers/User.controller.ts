import { Request, Response } from 'express';
import IUserService from '../services/interfaces/IUser.service';
import IUserController from './interfaces/IUser.Controller';

export default class UserController implements IUserController {
  public _UserService: IUserService;

  constructor(UserService: IUserService) {
    this._UserService = UserService;
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const result = await this._UserService.login(email, password);
      if (result) {
        return res.status(200).json(result);
      }
      return res.status(404).json({ message: 'user not found' });
    } catch (error) {
      return res.status(500).json({ message: 'internal error' });
    }
  }
}
