import db from '../models'

class PostRepository {

  /**
   * Create an entity in a database
   * 
   * @param {Object} post - body of post that will be created
   * @return {Promise} promise with result of create
   */
  async create(post) {
      return await db.post.create(post)
  }

  /**
   * Read an entity from a database
   * 
   * @param {Number} id - id of post that will be read
   * @return {Promise} promise with result of create
   */
  async readById(id) {        
      return await db.post.findByPk(id, {
          attributes: ['id', 'description', 'image' ],
          include: [
              { 
                  model: db.user,
                  attributes: [ 'id', 'login', 'first_name', 'last_name' ],
                  as: 'user'
              },
              {
                  model: db.tag,
                  attributes: [ 'id', 'name' ],
                  as: 'tags'
              },
              {
                  model: db.user,
                  attributes: [ 'id', 'first_name', 'last_name' ],
                  as: 'likes'
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
    return await db.post.findAll({
      attributes: [ 'id', 'description', 'image' ],
      include: [
        { 
          model: db.user,
          attributes: [ 'id', 'login', 'first_name', 'last_name' ],
          as: 'user'
        },
        {
          model: db.tag,
          attributes: [ 'id', 'name' ],
          as: 'tags'
        },
        {
          model: db.user,
          attributes: [ 'id', 'last_name', 'first_name' ],
          as: 'likes'
        }
      ]
    })
  }

  /**
   * Update an entity from a database
   * 
   * @param {Number} id - id of post that will be updated
   * @param {Object} post - body of post that will be updated
   * @return {Promise} promise with result of update
   */
  async update(id, post) {
      return await db.post.update(post, {where: { id: id }})
  }

  /**
   * Destroy an entity from a database
   * 
   * @param {Number} id - id of post that will be destroyed
   * @return {Promise} promise with result of destroy
   */
  async destroy(id) {
      return await db.post.destroy({where: { id: id }})
  }

  /**
   * Reads entities by description from a database
   * 
   * @param {Object} options - description to read entities
   * @return {Promise} promise with result of create
   */
  async getAll(options) {        
      return await db.post.findAll(options)
  }

  /**
   * Read entity by description from a database
   * 
   * @param {Object} options - description to read entity
   * @return {Promise} promise with result of create
   */
  async get(options) {        
      return await db.post.findOne(options)
  }
}

export default new PostRepository()