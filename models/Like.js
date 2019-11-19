'use strict'

module.exports = (sequelize, DataType) => {
    var Like = sequelize.define('like', {
        id: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    }, {});
    Like.associate = (models) => {
        Like.belongsTo(models.User, { foreignKey: 'userId' });
        Like.belongsTo(models.Post, { foreignKey: 'postId' });
    };
    return Like;
}
