import ITeamService from './interfaces/ITeam.service';
import Teams from '../database/models/TeamModel';

export default class TeamService implements ITeamService {
  private static _TeamsModel = Teams;
  public teams: Teams[];

  public async getAll(): Promise<Teams[]> {
    this.teams = await TeamService._TeamsModel.findAll({ raw: true });
    return this.teams;
  }
}
