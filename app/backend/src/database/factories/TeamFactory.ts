import TeamService from '../../services/Team.service';
import TeamController from '../../controllers/Team.controller';

export default class TeamFactory {
  public static create() {
    const teamService = new TeamService();
    const teamController = new TeamController(teamService);
    return teamController;
  }
}
