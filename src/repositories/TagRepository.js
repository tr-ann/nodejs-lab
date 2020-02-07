import db from '../models'

class TagRepository {

    async create(tag) {
        return await db.tag.create(tag)
    }

    async readById(id) {        
        return await db.tag.findByPk(id, {
            attributes: ['id', 'name' ],
            include: [
                { 
                    model: db.post,
                    attributes: [ 'id', 'description', 'image' ],
                    as: 'posts',
                    include: [
                        {
                            model: db.like,
                            as: 'likes',
                        }
                    ]
                }
            ]
        })
    }

    async readAll() {
        return await db.tag.findAll({
            attributes: ['id', 'name' ]
        })
    }

    async findOrCreate(options) {
        return await db.tag.findOrCreate(options)
    }

    async update(id, tag) {
        return await db.tag.update(tag, {where: { id: id }})
    }

    async destroy(id) {
        return await db.tag.destroy({where: { id: id }})
    }

    async get(options) {        
        return await db.tag.findAll(options)
    }
    
}

export default new TagRepository()