import { Model } from 'sequelize'
import bcrypt from 'bcrypt'

module.exports = (sequelize, DataTypes) => {

    class User extends Model {}

    User.init({
        login: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(150),
            allowNull: false,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING(150),
            allowNull: false,
            field: 'last_name'
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        sequelize,
        underscope: true,
        timestamps:false,
        deletedAt: false,
        modelName: 'user',

        // freezeTableName: 'users', 

        name: {
            simple: 'user',
            plural: 'users',
        }
    })

    User.associate = function (models) {
        User.belongsToMany(models.role, {
            through: models.user_role,
            onDelete: 'cascade',
            onUpdate: 'cascade',
        })

        User.hasMany(models.post, {
            onDelete: 'cascade',
            onDelete: 'cascade',
        })
    }

    User.prototype.checkPassword = async function(password) {
        return await bcrypt.compare(password, this.password)
    }

    User.beforeCreate(
        async (user, options) => user.password = await bcrypt.get(user.password)
    )

    return User
}