module.exports = (sequelize, DataTypes) => {
    var PostTag = sequelize.define('postTag', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: sequelize.INTEGER,
        },
    }, {});
    PostTag.associate = function (models) {
        PostTag.belongsTo(models.Post, { foreignKey: 'postId' });
        PostTag.belongsTo(models.Tag, { foreignKey: 'tagId' });
    };
    return PostTag;
};
