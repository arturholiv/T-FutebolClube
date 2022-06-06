import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import MatchFactory from '../database/factories/MatchFactory';
import AuthMiddleware from '../middlewares/authMiddleware';

const route = express();
const authMiddleware = new AuthMiddleware();
const matchController = MatchFactory.create();

route.get('/', (req: Request, res: Response) => matchController.getAll(req, res));
route.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => authMiddleware.validateToken(req, res, next),
  (req: Request, res: Response) => matchController.create(req, res),
);

export default route;
