module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.createTable('postTag', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER,
            },
            postId: {
                allowNull: false,
                type: sequelize.INTEGER,
                references: {
                    model: 'post',
                    key: 'id',
                    as: 'postId',
                }
            },
            tagId: {
                allowNull: false,
                type: sequelize.INTEGER,
                references: {
                    model: 'tag',
                    key: 'id',
                    as: 'tagId',
                },
            },
        })
    },
    down: (queryInterface, sequelize) => {
        return queryInterface.dropTable('postTag');
    },
};
