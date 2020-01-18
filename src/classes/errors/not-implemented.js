export default class NotImplemented extends Error {
    
    constructor(message = 'The server does not support capabilities required to process the request') {
        super(message)
        super.name = 'NotImplemented'
        this.status = 501
    }
}