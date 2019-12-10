import db from '../models/'

class PostTagRepository {
/*
tagsId.forEach(tag => {
    db.post_tag.create({
        post_id: post.id, 
        tag_id: tag,
    })
})*/
    async create(postTag) {
        return await db.post_tag.create(postTag)
    }

    async readAll() {
        return await db.post_tag.readAll()
    }

    async readById(id) {
        return await db.post_tag.findByPk(id)
    }

    async update(id, postTag) {
        return await db.post_tag.update(post_tag, {where: {id: id}})
    }

    async destroy(id) {
        return await db.post_tag.destroy({where: {id: id}})
    }
}

export default new PostTagRepository()