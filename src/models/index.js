import { sequelize } from '../sequelize'
import fs from 'fs'
import path from 'path'
const basename  = path.basename(__filename)
const db        = {}

fs
.readdirSync(__dirname)
.filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
})

Object.keys(db).forEach(modelName => {
    db[modelName].associate && db[modelName].associate(db)
})

export default db