export default class BadRequest extends Error {
    
    constructor(message = 'Bad request') {
        super(message)
        super.name = 'BadRequest'
        this.status = 400
    }
}