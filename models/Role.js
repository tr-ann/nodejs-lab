module.exports = (sequelize, DataTypes) => {
    var Role = sequelize.define('role', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: sequelize.INTEGER,
        },
        name: {
            allowNull: false,
            type: sequelize.STRING(100),
        },
    }, {});
    Role.associate = function (models) { };
    return Role;
}
