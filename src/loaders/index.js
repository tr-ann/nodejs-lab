import initKoa from './koa'
import initRoutes from './routes'
import initMiddleware from './middleware'

export default (app) => {
    initKoa(app)
    initRoutes(app)
    initMiddleware(app)
}