require('dotenv').config();

import Koa from 'koa'
import initApp from './loaders'
import { connect } from './sequelize'

(async () => { await connect() })();

const app = new Koa();

initApp(app);

module.exports = app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on http://localhost: 3000`)
})