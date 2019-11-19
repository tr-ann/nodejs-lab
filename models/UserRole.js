module.exports = (sequelize, DataTypes) => {
    var UserRole = sequelize.define('userRole', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: sequelize.INTEGER,
        },
    }, {});
    UserRole.associate = function (models) {
        UserRole.belongsTo(models.User, { foreignKey: 'userId' });
        UserRole.belongsTo(models.Role, { foreignKey: 'roleId' });
    };
    return UserRole;
};
