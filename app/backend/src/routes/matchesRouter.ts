import * as express from 'express';
import { Request, Response } from 'express';
import MatchFactory from '../database/factories/MatchFactory';

const route = express();
const matchController = MatchFactory.create();

route.get('/', (req: Request, res: Response) => matchController.getAll(req, res));

export default route;
