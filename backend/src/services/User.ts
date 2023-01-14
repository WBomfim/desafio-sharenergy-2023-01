import { getUsers, UserResponse } from "../integrations/randomUsers";
import { IUserIntegration } from "../interfaces/IUserIntegration";
import { IUserService } from "../interfaces/IServices";

export default class UserService implements IUserService<IUserIntegration> {
  private userFormat(data: UserResponse): IUserIntegration[] {
    return data.results.map((user) => {
      return {
        fullName: `${user.name.first} ${user.name.last}`,
        age: user.dob.age,
        email: user.email,
        username: user.login.username,
        picture: user.picture.large,
      };
    });
  }

  async readPage(page: number): Promise<IUserIntegration[]> {
    const data = await getUsers();
    const users = this.userFormat(data);
    const start = (page -1) * 10;
    const end = start + 10;
    return users.slice(start, end);
  }

  async seachUser(search: string): Promise<IUserIntegration[]> {
    const data = await getUsers();
    const users = this.userFormat(data);

    return users.filter((user) => {
      const fullName = user.fullName.toLowerCase();
      const username = user.username.toLowerCase();
      const email = user.email.toLowerCase();
      const searchTerm = search.toLowerCase();
  
      return (
        fullName.includes(searchTerm) ||
        username.includes(searchTerm) ||
        email.includes(searchTerm)
      );
    });
  }
}
