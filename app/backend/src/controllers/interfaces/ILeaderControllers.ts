import { Request, Response } from 'express';

export default interface ILeaderboardController {
  getLeaderboardHome(req: Request, res: Response): Promise<Response>;
}
