import RoleRepository from '../repositories/RoleRepository'

export default class RoleService {

    _repository = new RoleRepository()

    async list() {
        return await this._repository.readAll()
    }

    async create(role) {
        return await this._repository.create(role)
    }

    async findById(id) {
        let role = await this._repository.readById(id)
        if (!role) {
            throw new NotFound(`${objectName} not found`)
        }
        return role
    }

    async update(role) {
        return await this._repository.update(role)
    }

    async destroy(id) {
        let role = await this._repository.readById(id)
        if (!role) {
            throw new NotFound(`${objectName} not found`)
        }
        await this._repository.destroy(role)
    }
};