module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.createTable('deleteRequest', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                type: sequelize.INTEGER,
                references: {
                    model: 'user',
                    key: 'id',
                    as: 'userId',
                },
            },
        });
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.dropTable('deleteRequest');
    }
};
