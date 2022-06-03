import Matches from '../../database/models/MatchesModel';

export default interface IMatch {
  getAll(): Promise<Matches[]>
}
