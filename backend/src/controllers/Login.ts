import { Request, Response } from 'express';
import { ILoginService } from '../interfaces/IServices';
import { IUser } from '../interfaces/IUser';

export default class LoginController {
  private _userService: ILoginService<IUser>;

  constructor(userService: ILoginService<IUser>) {
    this._userService = userService;
  }

  public async login(req: Request, res: Response<string>) {
    const loginObj = req.body;
    const token = await this._userService.login(loginObj);
    return res.status(200).json(token as string);
  }
}
