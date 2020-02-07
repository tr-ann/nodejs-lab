require('dotenv').config();

import Koa from 'koa'
import appInit from './loaders'
import { connect } from './sequelize'

(async () => { await connect() })();

const app = new Koa();

appInit(app);

module.exports = app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on http://localhost: 3000`)
})