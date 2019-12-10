import db from '../models/'

class UserRepository {

    async create(user) {
        return await db.user.create(user)
    }

    async readAll() {
        return await db.user.readAll()
    }

    async readById(id) {
        return await db.user.findByPk(id)
    }

    async update(id, user) {
        return await db.user.update(user, {where: {id: id}})
    }

    async destroy(id) {
        return await db.user.destroy({where: {id: id}})
    }
}

export default new UserRepository()