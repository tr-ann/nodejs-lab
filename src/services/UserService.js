import UserRepository from '../repositories/UserRepository'
import bcrypt from 'bcrypt'

export default class UserService {

    _repository = new UserRepository()

    async list() {
        return await this._repository.readAll()
    }

    async create(user) {
        user.password = await bcrypt.hash(user.password)
        let newUser = await this._repository.create(user)
        delete newUser.password
        return newUser
    }

    async findById(id) {
        let user = await this._repository.readById(id)
        if (!user) {
            throw new NotFound(`${objectName} not found`)
        }
        return user
    }

    async update(user) {
        return await this._repository.update(user)
    }

    async destroy(id) {
        let user = await this._repository.readById(id)
        if (!user) {
            throw new NotFound(`${objectName} not found`)
        }
        await this._repository.destroy(user)
    }
};