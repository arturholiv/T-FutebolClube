import IUser from '../interfaces/IUser';

export default class User implements IUser {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;

  constructor(user: IUser) {
    this.username = user.username;
    this.role = user.role;
    this.email = user.email;
    this.password = user.password;
  }
}
