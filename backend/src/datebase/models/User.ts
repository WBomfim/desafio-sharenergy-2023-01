import { model as createModel, Schema, Model } from 'mongoose';
import { IUserModel } from './../../interfaces/IModels';
import { IUser } from '../../interfaces/IUser';

export const userSchema = new Schema<IUser>({
  username: { type: String, length: 3, unique: true },
  password: { type: String, length: 8 }
}, {
  versionKey: false,
});

export default class UserModel implements IUserModel<IUser> {
  private _model: Model<IUser>;

  constructor(model = createModel<IUser>('User', userSchema)) {
    this._model = model;
  }

  public async readOne(username:string): Promise<IUser | null> {
    return this._model.findOne({ username });
  }
}
