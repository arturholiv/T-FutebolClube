import * as express from 'express';
import { Request, Response } from 'express';
import TeamFactory from '../database/factories/TeamFactory';

const route = express();
const teamController = TeamFactory.create();

route.get('/', (req: Request, res: Response) => teamController.getAll(req, res));
route.get('/:id', (req: Request, res: Response) => teamController.getById(req, res));

export default route;
