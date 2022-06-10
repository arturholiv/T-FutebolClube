import LeaderboardService from '../../services/Leaderbord.service';
import LeaderboardController from '../../controllers/Leaderboard';

export default class LeaderboardFactory {
  public static create() {
    const leaderboardService = new LeaderboardService();
    const leaderboardController = new LeaderboardController(leaderboardService);
    return leaderboardController;
  }
}
