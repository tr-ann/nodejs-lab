import db from '../models'
import { sequelize } from '../config/sequelize'
import Sequelize from 'sequelize'
import { Op } from 'sequelize'

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

  /*async readAll(limit, offset, options) {
    let _options = {
      type: Sequelize.QueryTypes.SELECT,
      replacements: [ offset, limit, Sequelize.literal(options).val ],
      model: db.post,
      include: [
        {
          model: db.user,
          as: 'user',
        },
        {
          model: db.tag,
          as: 'tags'
        },
        {
          model: db.user,
          as: 'likes',
        },
      ],
      hasJoin: true
    };

    db.post._validateIncludedElements(_options);

    return await sequelize.query(
      'SELECT ' +
      '`post`.*, ' +
      '`user`.`id` AS `user.id`, ' +
      '`user`.`login` AS `user.login`, ' +
      '`user`.`first_name` AS `user.first_name`, ' +
      '`user`.`last_name` AS `user.last_name`, ' +
      '`tags`.`id` AS `tags.id`, ' +
      '`tags`.`name` AS `tags.name`, ' +
      '`tags->post_tag`.`post_id` AS `tags.post_tag.postId`, ' +
      '`tags->post_tag`.`tag_id` AS `tags.post_tag.tagId`, ' +
      '`likes`.`id` AS `likes.id`, ' +
      '`likes`.`last_name` AS `likes.last_name`, ' +
      '`likes`.`first_name` AS `likes.first_name`, ' +
      '`likes->like`.`post_id` AS `likes.like.postId`, ' +
      '`likes->like`.`user_id` AS `likes.like.userId` ' +
      'FROM ( ' +
        'SELECT ' + 
          '`post`.`id`, ' +
          '`post`.`description`, ' +
          '`post`.`image`, ' +
          '`post`.`owner_id` ' +
        'FROM `posts` AS `post` ' +
      ') AS `post` ' +
      'LEFT OUTER JOIN `users` AS `user` ' +
      'ON `post`.`owner_id` = `user`.`id` ' +
      'LEFT OUTER JOIN ( ' +
        '`posts_tags` AS `tags->post_tag` ' +
        'INNER JOIN `tags` AS `tags` ' +
        'ON `tags`.`id` = `tags->post_tag`.`tag_id`) ' +
      'ON `post`.`id` = `tags->post_tag`.`post_id` ' +
      'LEFT OUTER JOIN ( ' +
        '`likes` AS `likes->like` ' +
        'INNER JOIN `users` AS `likes` ' +
        'ON `likes`.`id` = `likes->like`.`user_id` ' +
      ') ' +
      'ON `post`.`id` = `likes->like`.`post_id` ' +
      'JOIN ( ' +
        'SELECT `id` FROM `posts` ORDER BY `id` LIMIT ?, ? ' +
      ') as l ' +
      'ON l.`id` = `post`.`id` ' +
      'WHERE ? ',
      _options
    )
  }*/

  async readAll(limit, offset, options) {
    return await db.post.findAll({
      attributes: [ 'id', 'description', 'image', 'userId' ],
      include: [
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
      limit: limit,
      offset: offset,
      where: options.post
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