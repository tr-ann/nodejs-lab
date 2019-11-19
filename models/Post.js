module.exports = (sequelize, sequelize) => {
    var Post = sequelize.define('post', {
        id: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        date: {
            type: sequelize.DATE,
            allowNull: false
        },
        description: {
            type: sequelize.STRING,
            allowNull: false
        },
        image: {
            type: sequelize.TEXT,
            allowNull: true
        },
        isEdited: {
            type: sequelize.BOOLEAN
        },
        isDeleted: {
            type: sequelize.BOOLEAN
        },
    }, {});

    Post.associate = (models) => {
        Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
    return Post;
}
