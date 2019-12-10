import db from '../models/'

class TagRepository {

    async create(tag) {
        return await db.tag.create(tag)
    }

    async readAll() {
        return await db.tag.readAll()
    }

    async readById(id) {
        return await db.tag.findByPk(id)
    }

    async update(id, tag) {
        return await db.tag.update(tag, {where: {id: id}})
    }

    async destroy(id) {
        return await db.tag.destroy({where: {id: id}})
    }
}

export default new TagRepository()