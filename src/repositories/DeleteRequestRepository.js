import db from '../models'

class DeleteRequestRepository {

    /**
     * Create an entity in a database
     * 
     * @param {Object} deleteRequest - body of deleteRequest that will be created
     * @return {Promise} promise with result of create
     */
    async create(deleteRequest) {
        return await db.delete_request.create(deleteRequest)
    }

    /**
     * Read an entity from a database
     * 
     * @param {Number} id - id of deleteRequest that will be read
     * @return {Promise} promise with result of create
     */
    async readById(id) {        
        return await db.delete_request.findByPk(id, {
            attributes: ['id', 'user_id' ],
            include: [
                { 
                    model: db.user,
                    attributes: [ 'id', 'login', 'first_name', 'last_name' ],
                    as: 'user'
                }
            ]
        })
    }

    /**
     * Read all the entities from a database
     * 
     * @return {Promise} promise with result of read
     */
    async readAll() {
        return await db.delete_request.findAll({
            attributes: ['id', 'user_id' ],
            include: [
                { 
                    model: db.user,
                    attributes: [ 'id', 'login', 'first_name', 'last_name' ],
                    as: 'user'
                }
            ]
        })
    }

    /**
     * Update an entity from a database
     * 
     * @param {Number} id - id of deleteRequest that will be updated
     * @param {Object} deleteRequest - body of deleteRequest that will be updated
     * @return {Promise} promise with result of update
     */
    async update(id, deleteRequest) {
        return await db.delete_request.update(deleteRequest, {where: { id: id }})
    }

    /**
     * Destroy an entity from a database
     * 
     * @param {Number} id - id of deleteRequest that will be destroyed
     * @return {Promise} promise with result of destroy
     */
    async destroy(id) {
        return await db.delete_request.destroy({where: { id: id }})
    }

    /**
     * Reads entities by description from a database
     * 
     * @param {Object} options - description to read entities
     * @return {Promise} promise with result of create
     */
    async getAll(options) {        
        return await db.delete_request.findAll(options)
    }

    /**
     * Read entity by description from a database
     * 
     * @param {Object} options - description to read entity
     * @return {Promise} promise with result of create
     */
    async get(options) {        
        return await db.delete_request.findOne(options)
    }
}

export default new DeleteRequestRepository()