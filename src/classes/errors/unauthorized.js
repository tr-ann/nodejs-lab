export default class Unauthorized extends Error {
    
    constructor(message = 'To access the requested resource requires authentication') {
        super(message)
        super.name = 'Unauthorized'
        this.status = 401
    }
}