module.exports = (sequelize, DataTypes) => {
    var Tag = sequelize.define('tag', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: sequelize.INTEGER,
        },
        name: {
            allowNull: false,
            type: sequelize.STRING,
        },
    }, {});
    Tag.associate = function (models) { };
    return Tag;
}
