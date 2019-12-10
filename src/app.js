import Koa from 'koa'
import appInit from './loaders'

const app = new Koa()

appInit(app)

/*
const sequelize = require('./repositories/connect');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });*/


//const config = require('./config')
module.exports = app.listen(3000, () => {
  console.log(`Listening on http://localhost: 3000`)
})
