import db from '../models'

class PostRepository {

  async create(post) {
      return await db.post.create(post)
  }

  async readById(id) {        
      return await db.post.findByPk(id, {
          attributes: ['id', 'description', 'image', 'createdAt', 'updatedAt' ],
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

  async readAll(pagination, options) {
    return await db.post.findAll({
      attributes: [ 'id', 'description', 'image', 'userId', 'createdAt', 'updatedAt' ],
      include: [
        {
          model: db.post,
          attributes: [ 'id' ],
          as: 'posts',
          limit: pagination.limit,
          offset: pagination.offset,
        },
        { 
          model: db.user,
          attributes: [ 'id', 'login', 'first_name', 'last_name' ],
          as: 'user',
          where: options.user
        },
        {
          model: db.tag,
          attributes: [ 'id', 'name' ],
          as: 'tags'
        },
        {
          model: db.user,
          attributes: [ 'id', 'login', 'first_name', 'last_name' ],
          as: 'likes'
        }
      ],
      where: options.post
    })
  }    

  async update(id, post) {
      return await db.post.update(post, {where: { id: id }})
  }

  async destroy(id) {
      return await db.post.destroy({where: { id: id }})
  }

  async get(options) {        
      return await db.post.findAll(options)
  }
}

export default new PostRepository()