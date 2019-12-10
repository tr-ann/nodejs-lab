import PostRepository from '../repositories/PostRepository'

export default class PostService {

    _repository = new PostRepository()

    async list() {
        return await this._repository.readAll()
    }

    async create(post) {
        return await this._repository.create(post)
    }

    async findById(id) {
        let post = await this._repository.readById(id)
        if (!post) {
            throw new NotFound(`${objectName} not found`)
        }
        return post
    }

    async update(id, post) {
        return await this._repository.update(id, post)
    }

    async destroy(id) {
        let post = await this._repository.readById(id)
        if (!post) {
            throw new NotFound(`${objectName} not found`)
        }
        await this._repository.delete(post)
    }
};