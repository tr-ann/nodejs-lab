import PostRepository from '../repositories/PostRepository'
import UserService from '../services/UserService'
import NotFound from '../classes/errors/not-found'
import BadRequest from '../classes/errors/bad-request';

class PostService {

  async list(pagination, options = {}) {
    return await PostRepository.readAll(pagination, options);
  }

  async create(tokenPayload, reqBody) {

    let user = await UserService.readById(tokenPayload.userId);
    
    let newPost = await PostRepository.create({
      userId: user.id,
      description: reqBody.description,
      image: reqBody.image
    });

    await user.addPost(newPost)

    return newPost.id;
  }

  async readById(id) {
    let post = await PostRepository.readById(id);

    if (!post) {
      throw new NotFound(`Post not found`);
    }
    
    return post;
  }

  async update(id, reqBody) {
    let post = await PostRepository.readById(id);
    
    if (!post) {
      throw new NotFound(`Post not found`);
    }

    if (post.updatedAt - 1000*60*30 <= post.createdAt) {
      await post.update({
        description: reqBody.description,
        image: reqBody.image,
        updatedAt: Date.now()
      });
    }
    else throw new BadRequest('too old post');
    
    return post;
  }

  async putLike(userId, postId) {
    let post = await this.readById(postId);

    let like = (await post.getLikes({ where: { id: userId }}))[0];
    if (like) {
      await post.removeLike(userId);
    }
    else await post.addLike(userId);
    
    return;
  }

  async destroy(id) {
    let post = await PostRepository.readById(id);
  
    if (!post) {
      throw new NotFound(`Post not found`);
    }

    return await PostRepository.delete(post);
  }

  async get(options) {
    return await PostRepository.get(options);
  }
};

export default new PostService();