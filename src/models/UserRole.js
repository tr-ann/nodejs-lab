import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class UserRole extends Model {};

  UserRole.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'role_id'
    }
  }, {

    sequelize,
    timestamps: false,
    deletedAt: false,
    
    modelName: 'user_role',
    tableName: 'users_roles',    

  });
  
  return UserRole;
}