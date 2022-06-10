import { Request, Response } from 'express';
import ILeaderboardService from '../services/interfaces/ILeaderboard.service';

import ILeaderboardController from './interfaces/ILeaderControllers';

export default class LeaderboardController implements ILeaderboardController {
  private _LeaderboardService: ILeaderboardService;

  constructor(leaderBoardService: ILeaderboardService) {
    this._LeaderboardService = leaderBoardService;
  }

  public async getLeaderboardHome(req: Request, res: Response): Promise<Response> {
    try {
      const leaderboardHome = await this._LeaderboardService.getLeaderboardHome();
      if (leaderboardHome) {
        return res.status(200).json(leaderboardHome);
      }
      return res.status(404).json({ message: 'not found' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'internal error' });
    }
  }
}
