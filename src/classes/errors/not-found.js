export default class NotFound extends Error {
    
    constructor(message = 'The resource is not found') {
        super(message)
        super.name = 'NotFound'
        this.status = 404
    }
}