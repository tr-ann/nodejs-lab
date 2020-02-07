import db from '../models'

class DeleteRequestRepository {

    async create(deleteRequest) {
        return await db.delete_request.create(deleteRequest)
    }

    async readById(id) {        
        return await db.delete_request.findByPk(id, {
            attributes: ['id', 'user_id' ],
            include: [
                { 
                    model: db.user,
                    attributes: [ 'id', 'login', 'first_name', 'last_name' ],
                    as: 'user'
                }
            ]
        })
    }

    async readAll() {
        return await db.delete_request.findAll({
            attributes: ['id', 'user_id' ],
            include: [
                { 
                    model: db.user,
                    attributes: [ 'id', 'login', 'first_name', 'last_name' ],
                    as: 'user'
                }
            ]
        })
    }

    async update(id, deleteRequest) {
        return await db.delete_request.update(deleteRequest, {where: { id: id }})
    }

    async destroy(id) {
        return await db.delete_request.destroy({where: { id: id }})
    }

    async get(options) {        
        return await db.delete_request.findAll(options)
    }
    
}

export default new DeleteRequestRepository()