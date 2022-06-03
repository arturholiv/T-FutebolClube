import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import UserFactory from '../database/factories/UserFactory';
// import userMiddleware from '../middlewares/loginMiddlewares';
import LoginMiddleware from '../middlewares/loginMiddlewares';
import AuthMiddleware from '../middlewares/authMiddleware';

const route = express();
const userController = UserFactory.create();
const LoginMiddlewares = new LoginMiddleware();
const authMiddleware = new AuthMiddleware();

route.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => LoginMiddlewares.verifyEmail(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    LoginMiddlewares.verifyPassword(req, res, next),
  (req: Request, res: Response) => userController.login(req, res),
);

route.get(
  '/validate',
  (req: Request, res: Response, next: NextFunction) => authMiddleware.validateToken(req, res, next),
  (req: Request, res: Response) => userController.getUserRole(req, res),
);

export default route;
