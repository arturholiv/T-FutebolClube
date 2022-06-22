// import ILeaderboard from '../../database/entities/interfaces/ILeaderboard';
import Matches from '../../database/models/MatchesModel';
import LeaderboardType from '../types/LeaderboardType';

export default interface ILeaderboardService {
  generateLeaderboard(): Promise<void>;
  getLeaderboard(): Promise<LeaderboardType>;
  verifyScore(match: Matches) :void
  teamHomeWins(match: Matches) :void
  teamHomeDraw(match: Matches) :void
  teamHomeLost(match: Matches) :void
  teamAwayDraw(match: Matches) :void
  teamAwayWins(match: Matches) :void
  teamAwayLost(match: Matches) :void
}
