import ILeaderboard from '../../database/entities/interfaces/ILeaderboard';

type LeaderboardType = [
  leaderboardHomeFormat: ILeaderboard[],
  leaderboardAwayFormat: ILeaderboard[],
  leaderboardFormat: ILeaderboard[],
];

export default LeaderboardType;
