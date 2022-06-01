import { Model, DataTypes } from 'sequelize';
import db from '.';

class Users extends Model {
  public username: string;
  public email: string;
  public role: string;
  public password: string;
}

Users.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'users',
});

export default Users;
