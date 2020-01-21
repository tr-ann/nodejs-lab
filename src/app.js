const env = require('dotenv').config();

import Koa from 'koa'
import appInit from './loaders'
import { connect as dbConnect } from './config/sequelize'

const app = new Koa();

appInit(app);
dbConnect();

module.exports = app.listen(3000, () => {
  console.log(`Listening on http://localhost: 3000`)
})
