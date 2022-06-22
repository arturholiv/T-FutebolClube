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
      const leaderboard = await this._LeaderboardService.getLeaderboard();
      if (leaderboard) {
        return res.status(200).json(leaderboard[0]);
      }
      return res.status(404).json({ message: 'not found' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error!' });
    }
  }

  public async getLeaderboardAway(req: Request, res: Response): Promise<Response> {
    try {
      const leaderboard = await this._LeaderboardService.getLeaderboard();
      if (leaderboard) {
        return res.status(200).json(leaderboard[1]);
      }
      return res.status(404).json({ message: 'not found' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  public async getLeaderboard(req: Request, res: Response): Promise<Response> {
    try {
      const leaderboard = await this._LeaderboardService.getLeaderboard();
      if (leaderboard) {
        return res.status(200).json(leaderboard[2]);
      }
      return res.status(404).json({ message: 'not found' });
    } catch (e) {
      return res.status(500).json({ message: 'internal errorr' });
    }
  }
}
