import db from '../models'

class UserRepository {

	async create(user) {
		return await db.user.create(user)
	}

	async readById(id) {        
		return await db.user.findByPk(id, {
			attributes: ['id', 'login', 'first_name', 'last_name' ],
			include: [
				{ 
					model: db.post,
					attributes: [ 'id', 'description', 'image' ],
					as: 'posts',
					include: [
					{
						model: db.tag,
						attributes: [ 'id', 'name' ],
						as: 'tags',
					}
					]
				},
				{
					model: db.role,
					attributes: [ 'id', 'name' ],
					as: 'roles'
				}
			]
		})
	}

	async readAll(pagination, options) {
		return await db.user.findAll({
			attributes: ['id', 'login', 'first_name', 'last_name' ],
			include: [
				{
					model: db.role,
					attributes: [ 'id', 'name' ],
					as: 'roles',
				}
			],
			limit: pagination.limit,
			offset: pagination.offset,
			where: options
		})
	}

	async update(id, user) {
		return await db.user.update(user, {where: { id: id }})
	}

	async destroy(id) {
		return await db.user.destroy({where: { id: id }})
	}

	async get(options) {        
		return await db.user.findAll(options)
	}
	
}

export default new UserRepository()