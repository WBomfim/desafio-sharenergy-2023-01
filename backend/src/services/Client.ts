import { IClientService } from "../interfaces/IServices";
import { IClientModel } from "../interfaces/IModels";
import { IClient, ClientSchema } from "../interfaces/IClient";
import { ZodSchema } from "zod";

export default class CleintService implements IClientService<IClient> {
  private _clientModel: IClientModel<IClient>;
  private _validateClient: ZodSchema<IClient>;

  constructor(model: IClientModel<IClient>) {
    this._clientModel = model;
    this._validateClient = ClientSchema;
  }

  public async create(obj: unknown): Promise<IClient> {
    const client = this._validateClient.safeParse(obj);
    if (!client.success) throw client.error;
    return this._clientModel.create(client.data);
  }

  public async read(): Promise<IClient[]> {
    return this._clientModel.read();
  }

  public async readOne(_id: string): Promise<IClient | null> {
    const client = await this._clientModel.readOne(_id);
    if (!client) throw new Error("Client not found");
    return client;
  }

  public async update(_id: string, obj: unknown): Promise<IClient | null> {
    const client = this._validateClient.safeParse(obj);
    if (!client.success) throw client.error;
    const newVehicle = await this._clientModel.update(_id, client.data);
    if (!newVehicle) throw new Error("Client not found");
    return newVehicle;
  }

  public async delete(_id: string): Promise<true | null> {
    const client = await this._clientModel.delete(_id);
    if (!client) throw new Error("Client not found");
    return true;
  }
}
