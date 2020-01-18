import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
    
  class Post extends Model {};
  
  Post.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'owner_id'
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: true,
    deletedAt: false,
    
    modelName: 'post',

    name: {
      simple: 'post',
      plural: 'posts',
    }
  });

  Post.associate = (models) => {
    Post.belongsToMany(models.user, {
      through: models.like,
      onDelete: 'cascade',
      onUpdate: 'cascade',
      foreignKey: 'postId',
      as: 'likes'
    });

    Post.belongsTo(models.user, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
      foreignKey: 'userId',
      as: 'user'
    });

    Post.belongsToMany(models.tag, {
      through: models.post_tag,
      onDelete: 'cascade',
      onUpdate: 'cascade',
      foreignKey: 'postId',
      as: 'tags'
    });
  }

  return Post
}