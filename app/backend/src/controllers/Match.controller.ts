import { Request, Response } from 'express';
// import Matches from '../database/models/MatchesModel';
import IMatchService from '../services/interfaces/IMatch.service';
import IMatch from './interfaces/IMatch.controller';
import Match from '../database/entities/Match';
import TeamService from '../services/Team.service';

export default class MatchController implements IMatch {
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
      return res.status(500).json({ message: 'internal error.' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      const teamService = new TeamService();
      const home = await teamService.getById(+homeTeam);
      const away = await teamService.getById(+awayTeam);

      if (home && away) {
        const match = new Match({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
        const newMatch = await this._MatchService.create(match);
        if (newMatch) {
          return res.status(201).json(newMatch);
        }
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      return res.status(401).json({ message: 'There is no team with such id!' });
    } catch (error) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  public async updateProgress(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await this._MatchService.updateProgress(+id);
      if (!result) {
        return res.status(401).json({ message: 'error' });
      }
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json({ message: 'internal error' });
    }
  }
}
