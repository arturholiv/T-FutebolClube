import ILeaderboard from '../../database/entities/interfaces/ILeaderboard';
import Matches from '../../database/models/MatchesModel';

export default interface ILeaderboardService {
  generateLeaderboard(): Promise<ILeaderboard[]>;
  getLeaderboardHome(): Promise<ILeaderboard[]>;
  // getLeaderboard(): Promise<ILeaderboard[]>;
  verifyScore(match: Matches): Promise<void>
  teamHomeWins(match: Matches): Promise<void>
  teamHomeDraw(match: Matches): Promise<void>
}
