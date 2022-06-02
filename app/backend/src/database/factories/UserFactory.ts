import UserController from '../../controllers/User.controller';
import UserService from '../../services/User.service';

export default class UserFactory {
  public static create() {
    const userService = new UserService();
    const userController = new UserController(userService);

    return userController;
  }
}
