import { Request, Response } from 'express';
import { ILoginService } from '../interfaces/IServices';
import { IUser } from '../interfaces/IUser';

export default class LoginController {
  private _loginService: ILoginService<IUser>;

  constructor(loginService: ILoginService<IUser>) {
    this._loginService = loginService;
  }

  public async login(req: Request, res: Response<string>) {
    const loginObj = req.body;
    const token = await this._loginService.login(loginObj);
    return res.status(200).json(token as string);
  }
}
