import { model as createModel, Schema, Model, isValidObjectId } from 'mongoose';
import { IUserModel } from './../../interfaces/IModels';
import { IUser } from '../../interfaces/IUser';

const userSchema = new Schema<IUser>({
  userName: { type: String, length: 3 },
  password: { type: String, length: 8 }
}, {
  versionKey: false,
});

export default class UserModel implements IUserModel<IUser> {
  private _model: Model<IUser>;

  constructor(model = createModel<IUser>('User', userSchema)) {
    this._model = model;
  }

  public async readOne(_id:string): Promise<IUser | null> {
    if (!isValidObjectId(_id)) throw new Error("Invalid ID");
    return this._model.findOne({ _id });
  }
}
