import ResponseFormat from '../classes/ResponseFormat'

export default function(err, ctx) {

    switch (err.name) {
        case 'Unauthorized':
        case 'Gone':
        case 'RetryWith':
        case 'NotFound':
        case 'BadRequest':
        case 'InternalServer':
        case 'NotImplemented':
            return ctx.response.status(err.status).json(
                ResponseFormat.error(
                    err,
                    err.message,
                    err.status,
                    'failed'
                )
            )
        default:
            return ctx.response.status(500).json(
                ResponseFormat.error(
                    err,
                    'unexpected error',
                    500,
                    'failed'
                )
            )
    }
}