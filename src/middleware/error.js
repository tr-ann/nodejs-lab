import ResponseFormat from '../classes/ResponseFormat'
import NotFound from '../classes/errors/not-found';
const debug = require('debug')('error:handler');
const httpStatus = require('http-status-codes');

export default (app) => {
    app.use(err)
};

async function err(ctx, next) {
    try {
        await next();
        if (ctx.response.status === httpStatus.NOT_FOUND)
            throw new NotFound;
    } catch (err) {
        debug(err);
        ctx.status = err.statusCode || err.status || httpStatus.INTERNAL_SERVER_ERROR;

        console.log(err.stack);

        ctx.body = ResponseFormat.error(
            err,
            err.message,
            err.status,
            "failed"
        )
    }
};