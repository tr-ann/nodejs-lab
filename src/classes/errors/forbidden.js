export default class Forbidden extends Error {
    
  constructor(message = 'Access is denied') {
      super(message)
      super.name = 'Forbidden'
      this.status = 403
  }
}