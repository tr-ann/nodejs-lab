import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {

    class Tag extends Model {}

    Tag.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        underscope: true,
        timestamps:false,
        deletedAt: false,
        modelName: 'tag',

        // freezeTableName: 'tags', 

        name: {
            simple: 'tag',
            plural: 'tags',
        }
    })

    Tag.associate = function (models) { 
        Tag.belongsToMany(models.post, {
            through: models.post_tag,
            onDelete: 'cascade',
            onUpdate: 'cascade',
        })
    }

    return Tag
}
