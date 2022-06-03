import { Request, Response } from 'express';
import ITeamService from '../services/interfaces/ITeam.service';
import ITeamController from './interfaces/ITeam.controller';

export default class TeamController implements ITeamController {
  private _TeamService: ITeamService;

  constructor(teamService: ITeamService) {
    this._TeamService = teamService;
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const teams = await this._TeamService.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      return res.status(500).json({ message: 'internal error' });
    }
  }
}
