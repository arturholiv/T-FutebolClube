// import ILeaderboard from '../../database/entities/interfaces/ILeaderboard';
import Matches from '../../database/models/MatchesModel';
import LeaderboardType from '../types/LeaderboardType';

export default interface ILeaderboardService {
  generateLeaderboard(): Promise<void>;
  getLeaderboard(): Promise<LeaderboardType>;
  // getLeaderboard(): Promise<ILeaderboard[]>;
  verifyScore(match: Matches): Promise<void>
  teamHomeWins(match: Matches): Promise<void>
  teamHomeDraw(match: Matches): Promise<void>
  teamHomeLost(match: Matches): Promise<void>
  teamAwayDraw(match: Matches): Promise<void>
  teamAwayWins(match: Matches): Promise<void>
  teamAwayLost(match: Matches): Promise<void>
}
