import initKoa from './koa'
import initRoutes from './routes'
import initErrorHandler from '../middleware/error'
import passport from '../middleware/passport'

export default (app) => {
    initErrorHandler(app)
    initKoa(app)
    //app.use(passport.initialize())
    initRoutes(app)
}