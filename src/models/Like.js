import { Model } from 'sequelize'

export default (sequelize, DataType) => {

    class Like extends Model {}
    
    Like.init({}, {
        sequelize,
        underscope: true,
        timestamps:false,
        deletedAt: false,
        modelName: 'like',

        // freezeTableName: 'likes', 

        name: {
            simple: 'like',
            plural: 'likes',
        }
    })

    Like.associate = (models) => {}
    
    return Like;
}
