import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {

	class Like extends Model {};

	Like.init({
		postId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'post_id'
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'user_id'
		}
	}, {
		sequelize,
		timestamps: false,
		deletedAt: false,

		modelName: 'like',
		tableName: 'likes', 

		name: {
			simple: 'like',
			plural: 'likes',
		}
	});
	
	return Like;
}
