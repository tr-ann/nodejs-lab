import NotFoundError from '../middleware/not-found'
import ErrorHandler from '../middleware/error-handler'

export default (app) => {
    app
        .use(NotFoundError)
        .use(ErrorHandler)
}