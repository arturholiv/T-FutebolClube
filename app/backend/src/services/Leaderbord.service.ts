import ILeaderboard from '../database/entities/interfaces/ILeaderboard';
import ILeaderboardService from './interfaces/ILeaderboard.service';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModel';
import LeaderboardType from './types/LeaderboardType';
// import ITeam from 'src/database/interfaces/ITeam';

export default class LeaderbordService implements ILeaderboardService {
  private static _TeamsModel = Teams;
  private static _MatchesModel = Matches;
  private _teams: Teams[];
  private _matches: Matches[];
  private _leaderboardFormat: ILeaderboard[] = [];
  private _leaderboardHomeFormat: ILeaderboard[] = [];
  private _leaderboardAwayFormat: ILeaderboard[] = [];

  public async generateLeaderboard(): Promise<void> {
    this._teams = await LeaderbordService._TeamsModel.findAll({ raw: true });
    this._teams.forEach((team) => {
      const format = {
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
      };
      this._leaderboardFormat.push(format);
      this._leaderboardAwayFormat.push(format);
      this._leaderboardHomeFormat.push(format);
    });
  }

  public async verifyScore(match: Matches): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      await this.teamHomeWins(match);
      await this.teamAwayLost(match);
    } else if (homeTeamGoals === awayTeamGoals) {
      await this.teamHomeDraw(match);
      await this.teamAwayDraw(match);
    } else {
      await this.teamHomeLost(match);
      await this.teamAwayWins(match);
    }
  }

  public async teamHomeWins(match: Matches): Promise<void> {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    const team = await LeaderbordService._TeamsModel.findByPk(homeTeam);
    if (team) {
      const index = this._leaderboardHomeFormat.findIndex((t) => t.teamName === team.teamName);
      const hTeam = this._leaderboardHomeFormat[index];

      this._leaderboardHomeFormat[index] = {
        teamName: team.teamName,
        totalPoints: hTeam.totalPoints + 3,
        totalGames: hTeam.totalGames + 1,
        totalVictories: hTeam.totalVictories + 1,
        totalDraws: hTeam.totalDraws,
        totalLosses: hTeam.totalLosses,
        goalsFavor: hTeam.goalsFavor + homeTeamGoals,
        goalsOwn: hTeam.goalsOwn + awayTeamGoals,
        goalsBalance: hTeam.goalsBalance + homeTeamGoals - awayTeamGoals,
        efficiency: +(((hTeam.totalPoints + 3) / ((hTeam.totalGames + 1) * 3)) * 100).toFixed(2),
      };
      // const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
      // const thisTeam = this._leaderboardFormat[homeTeam];

      // this._leaderboardFormat[homeTeam] = {
      //   teamName: thisTeam.teamName,
      //   totalPoints: thisTeam.totalPoints + 3,
      //   totalGames: thisTeam.totalGames + 1,
      //   totalVictories: thisTeam.totalVictories + 1,
      //   totalDraws: thisTeam.totalDraws,
      //   totalLosses: thisTeam.totalLosses,
      //   goalsFavor: homeTeamGoals,
      //   goalsOwn: awayTeamGoals,
      //   goalsBalance: homeTeamGoals - awayTeamGoals,
      //   efficiency: (thisTeam.totalPoints + 3) / (((thisTeam.totalGames + 1) * 3) * 100),
    }
  }

  public async teamAwayWins(match: Matches): Promise<void> {
    const { awayTeam, awayTeamGoals, homeTeamGoals } = match;
    const team = await LeaderbordService._TeamsModel.findByPk(awayTeam);
    if (team) {
      const index = this._leaderboardAwayFormat.findIndex((t) => t.teamName === team.teamName);
      const aTeam = this._leaderboardAwayFormat[index];
      this._leaderboardAwayFormat[index] = {
        teamName: team.teamName,
        totalPoints: aTeam.totalPoints + 3,
        totalGames: aTeam.totalGames + 1,
        totalVictories: aTeam.totalVictories + 1,
        totalDraws: aTeam.totalDraws,
        totalLosses: aTeam.totalLosses,
        goalsFavor: aTeam.goalsFavor + awayTeamGoals,
        goalsOwn: aTeam.goalsOwn + homeTeamGoals,
        goalsBalance: aTeam.goalsBalance + awayTeamGoals - homeTeamGoals,
        efficiency: +(((aTeam.totalPoints + 3) / ((aTeam.totalGames + 1) * 3)) * 100).toFixed(2),
      };
    }
  }

  public async teamHomeDraw(match: Matches): Promise<void> {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    const team = await LeaderbordService._TeamsModel.findByPk(homeTeam);

    if (team) {
      const index = this._leaderboardHomeFormat.findIndex((t) => t.teamName === team.teamName);
      const teamH = this._leaderboardHomeFormat[index];

      this._leaderboardHomeFormat[index] = {
        teamName: team.teamName,
        totalPoints: teamH.totalPoints + 1,
        totalGames: teamH.totalGames + 1,
        totalVictories: teamH.totalVictories,
        totalDraws: teamH.totalDraws + 1,
        totalLosses: teamH.totalLosses,
        goalsFavor: teamH.goalsFavor + homeTeamGoals,
        goalsOwn: teamH.goalsOwn + awayTeamGoals,
        goalsBalance: teamH.goalsBalance + (homeTeamGoals - awayTeamGoals),
        efficiency: +(((teamH.totalPoints + 1) / ((teamH.totalGames + 1) * 3)) * 100).toFixed(2),
      };
    }
  }

  public async teamAwayDraw(match: Matches): Promise<void> {
    const { awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const team = await LeaderbordService._TeamsModel.findByPk(awayTeam);

    if (team) {
      const index = this._leaderboardAwayFormat.findIndex((t) => t.teamName === team.teamName);
      const teamA = this._leaderboardAwayFormat[index];

      this._leaderboardAwayFormat[index] = {
        teamName: team.teamName,
        totalPoints: teamA.totalPoints + 1,
        totalGames: teamA.totalGames + 1,
        totalVictories: teamA.totalVictories,
        totalDraws: teamA.totalDraws + 1,
        totalLosses: teamA.totalLosses,
        goalsFavor: teamA.goalsFavor + awayTeamGoals,
        goalsOwn: teamA.goalsOwn + homeTeamGoals,
        goalsBalance: teamA.goalsBalance + (awayTeamGoals - homeTeamGoals),
        efficiency: +(((teamA.totalPoints + 1) / ((teamA.totalGames + 1) * 3)) * 100).toFixed(2),
      };
    }
  }

  public async teamHomeLost(match: Matches): Promise<void> {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    const team = await LeaderbordService._TeamsModel.findByPk(homeTeam);

    if (team) {
      const index = this._leaderboardHomeFormat.findIndex((t) => t.teamName === team.teamName);
      const teamH = this._leaderboardHomeFormat[index];

      this._leaderboardHomeFormat[index] = {
        teamName: team.teamName,
        totalPoints: teamH.totalPoints,
        totalGames: teamH.totalGames + 1,
        totalVictories: teamH.totalVictories,
        totalDraws: teamH.totalDraws,
        totalLosses: +1,
        goalsFavor: teamH.goalsFavor + homeTeamGoals,
        goalsOwn: teamH.goalsOwn + awayTeamGoals,
        goalsBalance: teamH.goalsBalance + homeTeamGoals - awayTeamGoals,
        efficiency: +((teamH.totalPoints / ((teamH.totalGames + 1) * 3)) * 100).toFixed(2),
      };
    }
  }

  public async teamAwayLost(match: Matches): Promise<void> {
    const { awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const team = await LeaderbordService._TeamsModel.findByPk(awayTeam);

    if (team) {
      const index = this._leaderboardAwayFormat.findIndex((t) => t.teamName === team.teamName);
      const teamH = this._leaderboardAwayFormat[index];

      this._leaderboardAwayFormat[index] = {
        teamName: team.teamName,
        totalPoints: teamH.totalPoints,
        totalGames: teamH.totalGames + 1,
        totalVictories: teamH.totalVictories,
        totalDraws: teamH.totalDraws,
        totalLosses: teamH.totalLosses + 1,
        goalsFavor: teamH.goalsFavor + awayTeamGoals,
        goalsOwn: teamH.goalsOwn + homeTeamGoals,
        goalsBalance: teamH.goalsBalance + awayTeamGoals - homeTeamGoals,
        efficiency: +((teamH.totalPoints / ((teamH.totalGames + 1) * 3)) * 100).toFixed(2),
      };
    }
  }

  public async getFullLeaderboard(): Promise<void> {
    const t = this._teams.length;
    const h = this._leaderboardHomeFormat;
    const a = this._leaderboardAwayFormat;

    for (let i = 0; i < t; i += 1) {
      this._leaderboardFormat[i] = {
        teamName: h[i].teamName,
        totalPoints: h[i].totalPoints + a[i].totalPoints,
        totalGames: h[i].totalGames + a[i].totalGames,
        totalVictories: h[i].totalVictories + a[i].totalVictories,
        totalDraws: h[i].totalDraws + a[i].totalDraws,
        totalLosses: h[i].totalLosses + a[i].totalLosses,
        goalsFavor: h[i].goalsFavor + a[i].goalsFavor,
        goalsOwn: h[i].goalsOwn + a[i].goalsOwn,
        goalsBalance: (h[i].goalsFavor + a[i].goalsFavor) - (h[i].goalsOwn + a[i].goalsOwn),
        efficiency: +(((h[i].totalPoints + a[i].totalPoints)
        / ((h[i].totalGames + a[i].totalGames) * 3)) * 100).toFixed(2),
      };
    }
  }

  public async getLeaderboard(): Promise<LeaderboardType> {
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
    this.getFullLeaderboard();
    const leaderbdHome = this._leaderboardHomeFormat.sort((a, b) => b.totalPoints - a.totalPoints);
    const leaderbdAway = this._leaderboardAwayFormat.sort((a, b) => b.totalPoints - a.totalPoints);
    const leaderboard = this._leaderboardFormat.sort((a, b) => b.totalPoints - a.totalPoints);
    this._leaderboardHomeFormat = [];
    this._leaderboardAwayFormat = [];
    this._leaderboardFormat = [];
    return [leaderbdHome, leaderbdAway, leaderboard];
  }
}
