export default class InternalServerError extends Error {
    
    constructor(message = 'Internal server error') {
        super(message)
        super.name = 'InternalServerError'
        this.status = 500
    }
}