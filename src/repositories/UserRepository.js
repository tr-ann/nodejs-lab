import db from '../models'
import { Op } from 'sequelize'

class UserRepository {

    /**
     * Create an entity in a database
     * 
     * @param {Object} user - body of user that will be created
     * @return {Promise} promise with result of create
     */
    async create(user) {
        return await db.user.create(user)
    }

    /**
     * Read an entity from a database
     * 
     * @param {Number} id - id of user that will be read
     * @return {Promise} promise with result of create
     */
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

    /**
     * Read all the entities from a database
     * 
     * @return {Promise} promise with result of read
     */
    async readAll(limit, offset, options) {
        return await db.user.findAll({
            attributes: ['id', 'login', 'first_name', 'last_name' ],
            include: [
                {
                    model: db.role,
                    attributes: [ 'id', 'name' ],
                    as: 'roles',
                }
            ],
            limit: limit,
            offset: offset,
            where: options
        })
    }

    /**
     * Update an entity from a database
     * 
     * @param {Number} id - id of user that will be updated
     * @param {Object} user - body of user that will be updated
     * @return {Promise} promise with result of update
     */
    async update(id, user) {
        return await db.user.update(user, {where: { id: id }})
    }

    /**
     * Destroy an entity from a database
     * 
     * @param {Number} id - id of user that will be destroyed
     * @return {Promise} promise with result of destroy
     */
    async destroy(id) {
        return await db.user.destroy({where: { id: id }})
    }

    /**
     * Reads entities by description from a database
     * 
     * @param {Object} options - description to read entities
     * @return {Promise} promise with result of create
     */
    async getAll(options) {        
        return await db.user.findAll(options)
    }

    /**
     * Read entity by description from a database
     * 
     * @param {Object} options - description to read entity
     * @return {Promise} promise with result of create
     */
    async get(options) {        
        return await db.user.findOne(options)
    }
}

export default new UserRepository()