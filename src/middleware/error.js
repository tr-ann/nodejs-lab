import ResponseFormat from '../classes/ResponseFormat'
const debug = require('debug')('error:handler');
const httpStatus = require('http-status-codes');

export default (app) => {
    app.use(err)
};

async function err(ctx, next) {
    try {
        await next();
        return ctx.response.status === httpStatus.NOT_FOUND ? ctx.throw(httpStatus.NOT_FOUND) : true;
    } catch (err) {
        debug(err);
        ctx.status = err.statusCode || err.status || httpStatus.INTERNAL_SERVER_ERROR;

        console.log(err.stack);
        ctx.body = ResponseFormat.error(
            {stack: err.stack},
            err.message,
            err.status,
            "failed"
        )
    }
};