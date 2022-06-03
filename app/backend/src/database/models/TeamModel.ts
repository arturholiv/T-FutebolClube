import { Model, DataTypes } from 'sequelize';
import db from '.'; // importa daqui pq o index ja esta exportanto default
import Matches from './MatchesModel';

class Teams extends Model {
  public id: number;
  public teamName: string;
}

Teams.init({
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Teams',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'home_team', as: 'matches_home_team' });
Teams.hasMany(Matches, { foreignKey: 'away_team', as: 'matches_away_team' });

export default Teams;
