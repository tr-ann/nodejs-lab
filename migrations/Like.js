module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.createTable('like', {
            id: {
                type: sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
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
            postId: {
                allowNull: false,
                type: sequelize.INTEGER,
                references: {
                    model: 'post',
                    key: 'id',
                    as: 'postId',
                },
            },
        });
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.dropTable('like');
    }
};
