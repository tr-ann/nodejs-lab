module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.createTable('post', {
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
                }
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
            isDelited: {
                type: sequelize.BOOLEAN
            },
        });
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.dropTable('post');
    }
};
