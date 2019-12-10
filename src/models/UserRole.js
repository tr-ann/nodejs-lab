import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
    
    class UserRole extends Model {}
    
    UserRole.init({}, {
        sequelize,
        underscope: true,
        timestamp: false,
        deletedAt: false,

        modelName: 'user_role',
        freezeTableName: 'users_roles', 
        name: {
            simple: 'userRole',
            plural: 'UserRoles',
        }
    })
    
    UserRole.associate = function (models) {}
    
    return UserRole
}
