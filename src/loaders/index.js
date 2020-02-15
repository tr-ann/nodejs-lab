import initKoa from './koa'
import initRoutes from './routes'
import initMiddleware from './middleware'
import initErrorHandler from '../middleware/error'
import initCron from '../cron'

export default (app) => {
    initErrorHandler(app)
    initKoa(app)
    initMiddleware(app)
    initRoutes(app)
    initCron()
}