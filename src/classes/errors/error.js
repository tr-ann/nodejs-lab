export default class Err extends Error {
    
    constructor(status, name, message) {
        super(message);
        super.name = name;
        this.status = status;
    }
}