import { Model, DataTypes } from 'sequelize';
import db from '.'; // importa daqui pq o index ja esta exportanto default

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

export default Teams;
