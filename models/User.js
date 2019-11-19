module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("user", {
        id: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        login: {
            type: sequelize.STRING(100),
            allowNull: false
        },
        password: {
            type: sequelize.STRING(100),
            allowNull: false
        },
        isDeleted: {
            type: sequelize.BOOLEAN,
        },
    }, {});
    User.associate = (models) => {
        User.hasMany(models.Post, {
            foreignKey: 'userId',
            as: 'posts'
        });
    };
    return User;
};
