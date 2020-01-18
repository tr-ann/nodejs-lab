import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  
  class Role extends Model {};

  Role.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    timestamps: false,
    deletedAt: false,
    
    modelName: 'role',

    name: {
      singular: 'role',
      plural: 'roles',
    }
  });

  Role.associate = function (models) {
    Role.belongsToMany(models.user, {
      through: models.user_role,
      onDelete: 'restrict',
      onUpdate: 'restrict',
      foreignKey: 'roleId',
      as: 'users'
    });
  };
  
  return Role;
}