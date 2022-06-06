import Match from '../../database/entities/Match';
import Matches from '../../database/models/MatchesModel';

export default interface IMatch {
  getAll(): Promise<Matches[]>;
  getAllByProgress(inProgress: boolean): Promise<Matches[]>;
  create(Match: Match): Promise<Match | null>;
  updateProgress(id: number): Promise<string | null>;
}
