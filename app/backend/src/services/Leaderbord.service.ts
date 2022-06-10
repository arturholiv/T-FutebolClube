import ILeaderboard from '../database/entities/interfaces/ILeaderboard';
import ILeaderboardService from './interfaces/ILeaderboard.service';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModel';
// import ITeam from 'src/database/interfaces/ITeam';

export default class LeaderbordService implements ILeaderboardService {
  private static _TeamsModel = Teams;
  private static _MatchesModel = Matches;
  private _teams: Teams[];
  private _matches: Matches[];
  private _leaderboradFormat: ILeaderboard[] = [];

  public async generateLeaderboard(): Promise<ILeaderboard[]> {
    this._teams = await LeaderbordService._TeamsModel.findAll({ raw: true });
    this._teams.forEach((team) => {
      this._leaderboradFormat.push({
        teamName: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      });
    });
    return this._leaderboradFormat;
  }

  public async verifyScore(match: Matches): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      await this.teamHomeWins(match);
    } else if (homeTeamGoals === awayTeamGoals) {
      await this.teamHomeDraw(match);
    } else {
      await this.teamHomeLost(match);
    }
  }

  public async teamHomeWins(match: Matches): Promise<void> {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    const team = await LeaderbordService._TeamsModel.findByPk(homeTeam);
    if (team) {
      const index = this._leaderboradFormat.findIndex((t) => t.teamName === team.teamName);
      const hTeam = this._leaderboradFormat[index];

      this._leaderboradFormat[index] = {
        teamName: team.teamName,
        totalPoints: hTeam.totalPoints += 3,
        totalGames: hTeam.totalGames += 1,
        totalVictories: hTeam.totalVictories += 1,
        totalDraws: hTeam.totalDraws,
        totalLosses: hTeam.totalLosses,
        goalsFavor: hTeam.goalsFavor += homeTeamGoals,
        goalsOwn: hTeam.goalsOwn += awayTeamGoals,
        goalsBalance: hTeam.goalsBalance += homeTeamGoals - awayTeamGoals,
        efficiency: +(((hTeam.totalPoints + 3) / ((hTeam.totalGames + 1) * 3)) * 100).toFixed(2),
      };
      // const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
      // const thisTeam = this._leaderboradFormat[homeTeam];

      // this._leaderboradFormat[homeTeam] = {
      //   teamName: thisTeam.teamName,
      //   totalPoints: thisTeam.totalPoints += 3,
      //   totalGames: thisTeam.totalGames += 1,
      //   totalVictories: thisTeam.totalVictories += 1,
      //   totalDraws: thisTeam.totalDraws,
      //   totalLosses: thisTeam.totalLosses,
      //   goalsFavor: homeTeamGoals,
      //   goalsOwn: awayTeamGoals,
      //   goalsBalance: homeTeamGoals - awayTeamGoals,
      //   efficiency: (thisTeam.totalPoints + 3) / (((thisTeam.totalGames + 1) * 3) * 100),
    }
  }

  public async teamHomeDraw(match: Matches): Promise<void> {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    const team = await LeaderbordService._TeamsModel.findByPk(homeTeam);

    if (team) {
      const index = this._leaderboradFormat.findIndex((t) => t.teamName === team.teamName);
      const teamH = this._leaderboradFormat[index];

      this._leaderboradFormat[index] = {
        teamName: team.teamName,
        totalPoints: teamH.totalPoints + 1,
        totalGames: teamH.totalGames + 1,
        totalVictories: teamH.totalVictories,
        totalDraws: teamH.totalDraws + 1,
        totalLosses: teamH.totalLosses,
        goalsFavor: teamH.goalsFavor + homeTeamGoals,
        goalsOwn: teamH.goalsOwn + awayTeamGoals,
        goalsBalance: teamH.goalsBalance += (homeTeamGoals - awayTeamGoals),
        efficiency: +(((teamH.totalPoints + 1) / ((teamH.totalGames + 1) * 3)) * 100).toFixed(2),
      };
    }
  }

  public async teamHomeLost(match: Matches): Promise<void> {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    const team = await LeaderbordService._TeamsModel.findByPk(homeTeam);

    if (team) {
      const index = this._leaderboradFormat.findIndex((t) => t.teamName === team.teamName);
      const teamH = this._leaderboradFormat[index];

      this._leaderboradFormat[index] = {
        teamName: team.teamName,
        totalPoints: teamH.totalPoints,
        totalGames: teamH.totalGames += 1,
        totalVictories: teamH.totalVictories,
        totalDraws: teamH.totalDraws,
        totalLosses: teamH.totalLosses += 1,
        goalsFavor: teamH.goalsFavor += homeTeamGoals,
        goalsOwn: teamH.goalsOwn += awayTeamGoals,
        goalsBalance: teamH.goalsBalance += homeTeamGoals - awayTeamGoals,
        efficiency: +((teamH.totalPoints / ((teamH.totalGames + 1) * 3)) * 100).toFixed(2),
      };
    }
  }

  public async getLeaderboardHome(): Promise<ILeaderboard[]> {
    this.generateLeaderboard();
    this._matches = await LeaderbordService._MatchesModel.findAll({
      raw: true,
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    const promises = this._matches.filter((match) => !match.inProgress)
      .map((match) => this.verifyScore(match));
    await Promise.all(promises);
    return this._leaderboradFormat;
  }
}
