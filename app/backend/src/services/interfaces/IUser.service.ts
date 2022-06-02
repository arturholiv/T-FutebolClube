import User from '../../database/entities/User';
import LoginType from '../types/LoginType';

export default interface IUserService {
  login(email: string, passwordL: string): Promise<LoginType | null>;
  getUserByEmail(email: string): Promise<User | null>
}
