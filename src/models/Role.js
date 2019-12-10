import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {

    class Role extends Model {} 

    Role.init({
        name: {
            allowNull: false,
            type: Sequelize.STRING(100),
        },
    }, {
        sequelize,
        underscope: true,
        timestamps:false,
        deletedAt: false,
        modelName: 'role',

        // freezeTableName: 'roles', 

        name: {
            simple: 'role',
            plural: 'roles',
        }
    })

    Role.associate = function (models) { 
        Role.belongsToMany(models.user, {
            through: models.user_role,
            onDelete: 'cascade',
            onUpdate: 'cascade',
        })
    }

    return Role
}
