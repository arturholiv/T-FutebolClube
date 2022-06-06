import { Request, Response } from 'express';
import IMatchService from '../services/interfaces/IMatch.service';
import IMatch from './interfaces/IMatch.controller';

export default class Matches implements IMatch {
  private _MatchService: IMatchService;

  constructor(matchService: IMatchService) {
    this._MatchService = matchService;
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const boolean = inProgress === 'true';
        const matches = await this._MatchService.getAllByProgress(boolean);
        if (matches) {
          return res.status(200).json(matches);
        }
      } else {
        const matches = await this._MatchService.getAll();
        if (matches) {
          return res.status(200).json(matches);
        }
      }
      return res.status(404).json({ message: 'No matches found' });
    } catch (error) {
      return res.status(500).json({ message: 'internal error' });
    }
  }
}
