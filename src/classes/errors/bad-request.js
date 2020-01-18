export default class NotFound extends Error {
    
    constructor(message = 'Bad request') {
        super(message)
        super.name = 'BadRequest'
        this.status = 400
    }
}