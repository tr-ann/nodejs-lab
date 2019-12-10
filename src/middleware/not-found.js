import NotFoundError from '../classes/errors/not-found'

export default (ctx, next) => {
    throw new NotFoundError('Router not found, incorrect request URL')
}