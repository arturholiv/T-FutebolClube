import IMatch from './interfaces/IMatch.service';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModel';

export default class MatchesService implements IMatch {
  private static _MatchesModel = Matches;
  private _matches: Matches[];

  public async getAll(): Promise<Matches[]> {
    this._matches = await MatchesService._MatchesModel.findAll({
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return this._matches;
  }
}
