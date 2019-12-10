import db from '../models/'

class DeleteRequestRepository {

    async create(deleteDequest) {
        return await db.delete_request.create(deleteDequest)
    }

    async readAll() {
        return await db.delete_request.readAll()
    }

    async readById(id) {
        return await db.delete_request.findByPk(id)
    }

    async update(id, deleteDequest) {
        return await db.delete_request.update(deleteDequest, {where: {id: id}})
    }

    async destroy(id) {
        return await db.delete_request.destroy({where: {id: id}})
    }
}

export default new DeleteRequestRepository()