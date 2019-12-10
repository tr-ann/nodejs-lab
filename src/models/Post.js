import { Model } from 'sequelize'

export default (sequelize, DataType) => {
    
    class Post extends Model {}
    
    Post.init({
        date: {
            type: DataType.DATE,
            allowNull: false
        },
        description: {
            type: DataType.STRING,
            allowNull: false
        },
        image: {
            type: DataType.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        underscope: true,
        timestamps: true,
        deletedAt: false,
        modelName: 'post',

        // freezeTableName: 'posts', 

        name: {
            simple: 'post',
            plural: 'posts',
        }
    })

    Post.associate = (models) => {
        Post.belongsTo(models.user, {
            onDelete: 'cascade',
            onUpdate: 'cascade',
         })

        Post.belongsToMany(models.tag, {
            through: models.post_tag,
            onDelete: 'cascade',
            onUpdate: 'cascade',
        })
    }

    return Post
}