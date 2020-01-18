import PostRepository from '../repositories/PostRepository'
import NotFound from '../classes/errors/not-found'

class PostService {

  async list() {
    return await PostRepository.readAll();
  }

  async create(post) {
    return await PostRepository.create(post);
  }

  async readById(id) {
    let post = await PostRepository.readById(id);

    if (!post) {
      throw new NotFound(`Post not found`);
    }
    
    return post;
  }

  async update(id, post) {
    await PostRepository.update(id, post);

    return await PostRepository.readById(id);
  }

  async destroy(id) {
    await PostRepository.destroy(id);
  }

  async getAll(options) {
    return await PostRepository.getAll(options);
  }

  async get(options) {
    return await PostRepository.get(options);
  }
};

export default new PostService();