import { Request, Response } from 'express';
import { IClientService } from '../interfaces/IServices';
import { IClient } from '../interfaces/IClient';

export default class ClientController {
  private _clientService: IClientService<IClient>;

  constructor(clientService: IClientService<IClient>) {
    this._clientService = clientService;
  }

  public async create(req: Request, res: Response<IClient>) {
    const { body } = req;
    const data = await this._clientService.create(body);
    return res.status(201).json(data as IClient);
  }

  public async read(req: Request, res: Response<IClient[]>) {
    const data = await this._clientService.read();
    return res.status(200).json(data as IClient[]);
  }

  public async readOne(req: Request, res: Response<IClient>) {
    const { id } = req.params;
    const data = await this._clientService.readOne(id);
    return res.status(200).json(data as IClient);
  }

  public async update(req: Request, res: Response<IClient>) {
    const { id } = req.params;
    const { body } = req;
    const data = await this._clientService.update(id, body);
    return res.status(200).json(data as IClient);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this._clientService.delete(id);
    return res.status(204).end();
  }
}
