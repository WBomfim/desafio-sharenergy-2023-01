import { ILoginService } from "../interfaces/IServices";
import { IUserModel } from "../interfaces/IModels";
import { IUser } from "../interfaces/IUser";

export default class LoginService implements ILoginService<IUser> {
  private _userModel: IUserModel<IUser>;

  constructor(model: IUserModel<IUser>) {
    this._userModel = model;
  }

  public async login(obj: IUser): Promise<string | null> {
    const { username, password } = obj;
    const user = await this._userModel.readOne(username);
    if (!user) throw new Error("User not found");
    if (user.password !== password) throw new Error("Wrong password");
    return "Retornando o token";
  }
}
