import { model as createModel, Schema, Model, isValidObjectId } from 'mongoose';
import { IClient } from '../../interfaces/IClient';

const clientSchema = new Schema<IClient>({
  name: { type: String, length: 3 },
  email: { type: String, length: 8 },
  phone: { type: String, length: 10 },
  address: { type: String, length: 3 },
  cpf: { type: String, length: 11, unique: true }
}, {
  versionKey: false,
});

export default class UserModel {
  private _model: Model<IClient>;

  constructor(model = createModel<IClient>('Client', clientSchema)) {
    this._model = model;
  }

  public async create(obj: IClient): Promise<IClient> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<IClient[]> {
    return this._model.find({});
  }

  public async readOne(_id:string): Promise<IClient | null> {
    if (!isValidObjectId(_id)) throw new Error("Invalid ID");
    return this._model.findOne({ _id });
  }

  public async update(_id:string, obj: Partial<IClient>): Promise<IClient | null> {
    if (!isValidObjectId(_id)) throw new Error("Invalid ID");
    return this._model.findOneAndUpdate({ _id }, { ...obj }, { new: true });
  }

  public async delete(_id:string): Promise<IClient | null> {
    if (!isValidObjectId(_id)) throw new Error("Invalid ID");
    return this._model.findByIdAndDelete(_id);
  }
}
