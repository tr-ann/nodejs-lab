import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {

    class DeleteRequest extends Model {}

    DeleteRequest.init({}, 
    {
        sequelize,
        underscope: true,
        timestamps:false,
        deletedAt: false,
        modelName: 'delete_request',

        // freezeTableName: 'delete_requests', 

        name: {
            simple: 'deleteRequest',
            plural: 'deleteRequests',
        }
    })

    DeleteRequest.associate = function (models) {
        DeleteRequest.belongsTo(models.user, {
            onDelete: 'cascade',
            onUpdate: 'cascade',
        })

    }

    return DeleteRequest;
}
