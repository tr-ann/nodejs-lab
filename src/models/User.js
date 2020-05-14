import { Model } from 'sequelize'
import Hash from '../classes/hash'

export default (sequelize, DataTypes) => {

  class User extends Model {};

  User.init({
    login: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: 'last_name'
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: false,    
    modelName: 'user',

    // tableName: 'users', 

    name: {
      simple: 'user',
      plural: 'users',
    }
  });

  User.associate = function (models) {
    User.belongsToMany(models.role, {
      through: models.user_role,
      onDelete: 'cascade',
      onUpdate: 'cascade',
      foreignKey: 'userId',
      as: 'roles'
    });

    User.belongsToMany(models.post, {
      through: models.like,
      onDelete: 'cascade',
      onUpdate: 'cascade',
      foreignKey: 'userId',
      as: 'likes'
    });

    User.hasMany(models.post, {
      onDelete: 'cascade',
      onDelete: 'cascade',
      foreignKey: 'userId',
      as: 'posts'
    });
  }

  User.prototype.checkPassword = async function(password) {
    return await Hash.compare(password, this.password)
  };

  User.beforeCreate(
    (user, options) => user.password = Hash.get(user.password)
  );

  User.beforeUpdate(
    (user) => {
      if (user.password) {
        user.password = Hash.get(user.password);
      }
    }
  )
  
  return User;
}