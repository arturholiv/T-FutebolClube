import * as express from 'express';
import { Request, Response } from 'express';
import LeaderboardFactory from '../database/factories/LeaderboardFactory';

const route = express();
const leaderboardController = LeaderboardFactory.create();

route.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getLeaderboardHome(req, res),
);

export default route;
