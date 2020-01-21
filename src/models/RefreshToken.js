import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {

  class RefreshToken extends Model {};

  RefreshToken.init({
    token: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, 
  {
    sequelize,
    timestamps: false,
    deletedAt: false,
    modelName: 'refresh_token',

    tableName: 'refresh_tokens', 

    name: {
      simple: 'refresh_token',
      plural: 'refresh_tokens',
    }
  });

  return RefreshToken;
}
