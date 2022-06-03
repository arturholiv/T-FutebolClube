import ITeamService from './interfaces/ITeam.service';
import Teams from '../database/models/TeamModel';

export default class TeamService implements ITeamService {
  private static _TeamsModel = Teams;
  public teams: Teams[];
  public team: Teams;

  public async getAll(): Promise<Teams[]> {
    this.teams = await TeamService._TeamsModel.findAll({ raw: true });
    return this.teams;
  }

  public async getById(id: number): Promise<Teams | null> {
    const result = await TeamService._TeamsModel.findByPk(id);
    if (result) {
      this.team = result;
      return this.team;
    }
    return null;
  }
}
