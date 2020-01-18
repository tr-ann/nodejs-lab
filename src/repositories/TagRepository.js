import db from '../models'

class TagRepository {

    /**
     * Create an entity in a database
     * 
     * @param {Object} tag - body of tag that will be created
     * @return {Promise} promise with result of create
     */
    async create(tag) {
        return await db.tag.create(tag)
    }

    /**
     * Read an entity from a database
     * 
     * @param {Number} id - id of tag that will be read
     * @return {Promise} promise with result of create
     */
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

    /**
     * Read all the entities from a database
     * 
     * @return {Promise} promise with result of read
     */
    async readAll() {
        return await db.tag.findAll({
            attributes: ['id', 'name' ]
        })
    }

    async findOrCreate(options) {
        return await db.tag.findOrCreate(options)
    }

    /**
     * Update an entity from a database
     * 
     * @param {Number} id - id of tag that will be updated
     * @param {Object} tag - body of tag that will be updated
     * @return {Promise} promise with result of update
     */
    async update(id, tag) {
        return await db.tag.update(tag, {where: { id: id }})
    }

    /**
     * Destroy an entity from a database
     * 
     * @param {Number} id - id of tag that will be destroyed
     * @return {Promise} promise with result of destroy
     */
    async destroy(id) {
        return await db.tag.destroy({where: { id: id }})
    }

    /**
     * Reads entities by description from a database
     * 
     * @param {Object} options - description to read entities
     * @return {Promise} promise with result of create
     */
    async getAll(options) {        
        return await db.tag.findAll(options)
    }

    /**
     * Read entity by description from a database
     * 
     * @param {Object} options - description to read entity
     * @return {Promise} promise with result of create
     */
    async get(options) {        
        return await db.tag.findOne(options)
    }
}

export default new TagRepository()