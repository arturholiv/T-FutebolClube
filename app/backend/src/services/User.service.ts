import { compareSync } from 'bcrypt';
import Users from '../database/models/UserModel';
import IUserService from './interfaces/IUser.service';
import JwtGenerator from '../utils/JwtGenerator';
import User from '../database/entities/User';

class UserService implements IUserService {
  private static _UserModel = Users;
  private _token: string;
  private _user: User | null;

  public async login(emailLogin: string, password: string): Promise<string | null> {
    const user = await this.getUserByEmail(emailLogin);

    if (user && compareSync(password, user.password as string)) {
      const jwt = new JwtGenerator();
      this._token = jwt.generateToken(emailLogin, password);
      return this._token;
    }
    return null;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    this._user = await UserService._UserModel.findOne({
      where: {
        email,
      },
      raw: true,
    });
    if (this._user) {
      return this._user;
    }
    return null;
  }
}

export default UserService;
