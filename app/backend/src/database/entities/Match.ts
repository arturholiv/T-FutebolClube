import IMatch from './interfaces/IMatch';

export default class Match {
  public homeTeam: number;
  public awayTeam: number;
  public homeTeamGoals: number;
  public awayTeamGoals: number;
  public inProgress: boolean;

  constructor(match: IMatch) {
    this.homeTeam = match.homeTeam;
    this.awayTeam = match.awayTeam;
    this.homeTeamGoals = match.homeTeamGoals;
    this.awayTeamGoals = match.awayTeamGoals;
    this.inProgress = match.inProgress;
  }
}
