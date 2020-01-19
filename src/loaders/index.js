import initKoa from './koa'
import initRoutes from './routes'
import initErrorHandler from '../middleware/error'

export default (app) => {
    initErrorHandler(app)
    initKoa(app)
    initRoutes(app)
}