import Sequelize from 'sequelize'
const configs = require('./database.json')
const env       = process.env.NODE_ENV || 'dev'
const config    = configs[env]

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false
})

async function connect() {
    await sequelize.authenticate()
    await sequelize.sync()
}

export { sequelize, connect }