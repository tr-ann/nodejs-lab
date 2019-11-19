module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.createTable('role', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: sequelize.STRING,
            },
        })
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.dropTable('role');
    }
}
