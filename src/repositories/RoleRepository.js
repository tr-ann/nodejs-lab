import db from '../models'

class RoleRepository {

    async create(role) {
        return await db.role.create(role)
    }

    async readById(id) {        
        return await db.role.findByPk(id, {
            attributes: ['id', 'name' ],
            include: [
                { 
                    model: db.user,
                    attributes: [ 'id', 'login', 'first_name', 'last_name' ],
                    as: 'users',
                }
            ]
        })
    }

    async readAll() {
        return await db.role.findAll({
            attributes: ['id', 'name' ]
        })
    }

    async update(id, role) {
        return await db.role.update(role, {where: { id: id }})
    }

    async destroy(id) {
        return await db.role.destroy({where: { id: id }})
    }

    async get(options) {        
        return await db.role.findAll(options)
    }
    
}

export default new RoleRepository()