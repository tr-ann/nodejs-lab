import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {

  class DeleteRequest extends Model {};

  DeleteRequest.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    }
  }, 
  {
    sequelize,
    timestamps: false,
    deletedAt: false,
    modelName: 'delete_request',

    // tableName: 'delete_requests', 

    name: {
      simple: 'deleteRequest',
      plural: 'deleteRequests',
    }
  });

  DeleteRequest.associate = function (models) {
    DeleteRequest.belongsTo(models.user, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
        foreignKey: 'userId',
    });
  };

  return DeleteRequest;
}
