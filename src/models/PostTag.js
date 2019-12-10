import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {

    class PostTag extends Model {}

    PostTag.init({}, {
        sequelize,
        underscope: true,
        timestamp: false,
        deletedAt: false,

        modelName: 'post_tag',
        freezeTableName: 'posts_tags', 
        name: {
            simple: 'postTag',
            plural: 'postsTags',
        }
    })

    PostTag.associate = function (models) {}
    
    return PostTag
}
