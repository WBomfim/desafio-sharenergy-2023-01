import { model as createModel, Schema, Model } from 'mongoose';
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

  public async readOne(userName:string): Promise<IUser | null> {
    return this._model.findOne({ userName });
  }
}
