import db from '../models'

class RefreshTokenRepository {

    async create(token) {
        return await db.refresh_token.create(token)
    }
    
    async destroy(token) {
        return await db.refresh_token.destroy({where: { token: token }})
    }

    async get(options) {        
        return await db.refresh_token.findOne(options)
    }
}

export default new RefreshTokenRepository()