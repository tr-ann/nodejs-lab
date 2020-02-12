import ResponseFormat from '../classes/ResponseFormat'
const httpStatus = require('http-status-codes');

export default (app) => {
    app.use(err)
};

async function err(ctx, next) {
    try {
        await next();

    } catch (err) {
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