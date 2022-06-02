import User from '../../database/entities/User';

export default interface IUserService {
  login(email: string, password: string): Promise<string | null>;
  getUserByEmail(email: string): Promise<User | null>;
}
