import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {

    class Tag extends Model {};

    Tag.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        timestamps: false,
        deletedAt: false,
        
        modelName: 'tag',

        // tableName: 'tags', 

        name: {
            simple: 'tag',
            plural: 'tags',
        }
    });

    Tag.associate = function (models) { 
        Tag.belongsToMany(models.post, {
            through: models.post_tag,
            onDelete: 'cascade',
            onUpdate: 'cascade',
            foreignKey: 'tagId',
            as: 'posts'
        })
    }

    return Tag;
}
