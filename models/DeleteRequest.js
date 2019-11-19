module.exports = (sequelize, DataTypes) => {
    var DeleteRequest = sequelize.define('deleteRequest', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: sequelize.INTEGER,
        },
    }, {});
    DeleteRequest.associate = function (models) {
        DeleteRequest.belongsMany(models.User, { foreignKey: 'userId' }); 
    }; 
    return DeleteRequest;
}
