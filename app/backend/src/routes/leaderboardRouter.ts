import * as express from 'express';
import { Request, Response } from 'express';
import LeaderboardFactory from '../database/factories/LeaderboardFactory';

const route = express();
const leaderboardController = LeaderboardFactory.create();

route.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
);

route.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getLeaderboardHome(req, res),
);

route.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getLeaderboardAway(req, res),
);

export default route;
