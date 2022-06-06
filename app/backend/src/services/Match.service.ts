import IMatch from './interfaces/IMatch.service';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModel';
import Match from '../database/entities/Match';

export default class MatchesService implements IMatch {
  private static _MatchesModel = Matches;
  private _matches: Matches[];
  private _match: Matches;
  private _inProgress: boolean;

  public async getAll(): Promise<Matches[]> {
    this._matches = await MatchesService._MatchesModel.findAll({
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }, // icludes é como se fosse um join
      ],
    });
    return this._matches;
  }

  public async getAllByProgress(inProgress: boolean): Promise<Matches[]> {
    this._matches = await MatchesService._MatchesModel.findAll({
      where: {
        inProgress,
      },
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }, // icludes é como se fosse um join
      ],
    });
    return this._matches;
  }

  public async create(match: Matches): Promise<Match | null> {
    if (match.awayTeam === match.homeTeam) {
      return null;
    }
    this._match = await MatchesService._MatchesModel.create({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
    });
    return match;
  }

  public async updateProgress(id: number): Promise<string | null> {
    this._inProgress = false;
    const updated = await MatchesService._MatchesModel.update(
      {
        inProgress: false,
      },
      {
        where: {
          id,
        },
      },
    );
    if (!updated) {
      return null;
    }
    return 'updated';
  }
}
