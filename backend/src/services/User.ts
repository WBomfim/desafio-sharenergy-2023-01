import { IUserService } from "../interfaces/IServices";
import { IUserModel } from "../interfaces/IModels";
import { IUser } from "../interfaces/IUser";

export default class UserService implements IUserService<IUser> {
  private _userModel: IUserModel<IUser>;

  constructor(model: IUserModel<IUser>) {
    this._userModel = model;
  }

  public async readOne(_id: string): Promise<IUser | null> {
    const user = await this._userModel.readOne(_id);
    if (!user) throw new Error("User not found");
    return user;
  }
}
