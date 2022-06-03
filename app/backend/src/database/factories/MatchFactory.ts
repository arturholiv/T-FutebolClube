import MatchController from '../../controllers/Match.controller';
import MatchService from '../../services/Match.service';

export default class MatchFactory {
  public static create() {
    const matchService = new MatchService();
    const matchController = new MatchController(matchService);
    return matchController;
  }
}
