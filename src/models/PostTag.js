import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {

	class PostTag extends Model {};

	PostTag.init({
		postId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'post_id'
		},
		tagId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'tag_id'
		}
	}, {
		sequelize,
		timestamps: false,
		deletedAt: false,

		modelName: 'post_tag',
		tableName: 'posts_tags', 

		name: {
			simple: 'postTag',
			plural: 'postsTags',
		}
	});

	PostTag.associate = function (models) { 
		PostTag.belongsTo(models.tag, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
				foreignKey: 'tagId',
				as: 'posts'
		});

		PostTag.belongsTo(models.post, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
			foreignKey: 'postId',
			as: 'tags'
    });
}
	
	return PostTag;
}
