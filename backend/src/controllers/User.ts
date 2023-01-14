import { Request, Response } from 'express';
import { IUserIntegration } from "../interfaces/IUserIntegration";
import { IUserService } from "../interfaces/IServices";
import StatusHttp from '../utils/StatusHttp';

export default class UserService {
  private _userServices: IUserService<IUserIntegration>;

  constructor(userServices: IUserService<IUserIntegration>) {
    this._userServices = userServices;
  }

  public async readPage(req: Request, res: Response<IUserIntegration[]>) {
    const { page } = req.params;
    const data = await this._userServices.readPage(Number(page));
    return res.status(StatusHttp.OK).json(data);
  }

  public async seachUser(req: Request, res: Response<IUserIntegration[]>) {
    const { q } = req.query as { q: string };
    const data = await this._userServices.seachUser(q);
    return res.status(StatusHttp.OK).json(data);
  }
}
