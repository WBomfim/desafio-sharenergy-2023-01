import { ILoginService, tokenReturn } from "../interfaces/IServices";
import { IUserModel } from "../interfaces/IModels";
import { IUser } from "../interfaces/IUser";
import { ErrorsTypes } from "../utils/errors/ErrorsCatalog";
import { generateToken } from "../utils/authentication/handleToken";
import { verifyPassword } from "../utils/authentication/passwordCrypto";
export default class LoginService implements ILoginService<IUser> {
  private _userModel: IUserModel<IUser>;

  constructor(model: IUserModel<IUser>) {
    this._userModel = model;
  }

  public async login(obj: IUser): Promise<tokenReturn | null> {
    const { username, password } = obj;
    
    const user = await this._userModel.readOne(username);

    if (!user) throw new Error(ErrorsTypes.NOT_FOUND_USER);
    verifyPassword(password, user.password);

    const token = generateToken(user);
    return { token };
  }
}
