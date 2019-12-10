import db from '../models/'

class PostRepository {

    async create(post) {
        return await db.post.create(post)
    }

    async readAll() {
        return await db.post.readAll({
            include: [
                {
                    model: db.user,
                    attributes: ['id', 'firstName', 'lastName', 'login']
                },
                {
                    model: db.like,
                    attributes: [ 'id' ],
                    include: {
                        model: db.user,
                        attributes: ['id', 'firstName', 'lastName', 'login'],
                    }
                },
                {
                    model: db.tag,
                    attributes: ['id', 'name'],
                }
            ]
        })
    }

    async readById(id) {
        return await db.post.findByPk(id, {
            include: [
                {
                    model: db.user,
                    attributes: ['id', 'firstName', 'lastName', 'login']
                },
                {
                    model: db.like,
                    attributes: [ 'id' ],
                    include: {
                        model: db.user,
                        attributes: ['id', 'firstName', 'lastName', 'login'],
                    }
                },
                {
                    model: db.tag,
                    attributes: ['id', 'name'],
                }
            ]
        })
    }

    async update(id, post) {
        return await db.post.update(post, {where: {id: id}})
    }

    async destroy(id) {
        return await db.post.destroy({where: {id: id}})
    }

    async get(options) {
        return await db.post.findAll(options)
    }
}

export default new PostRepository()