import Teams from '../../database/models/TeamModel';

export default interface IteamService {
  getAll(): Promise<Teams[]>;
  getById(id: number): Promise<Teams | null>;
}
