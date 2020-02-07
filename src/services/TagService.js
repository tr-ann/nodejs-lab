import TagRepository from '../repositories/TagRepository'
import NotFound from '../classes/errors/not-found'
import PostService from './PostService';

class TagService {

  async list() {
    return await TagRepository.readAll();
  }

  async addToPost(postId, tags) {
    let post = await PostService.readById(postId);

    await post.setTags([]);

    if (tags) {
      for (let tagName of tags) {
        let tag = await TagRepository.findOrCreate({
          where: { name: tagName }, 
          default: { name: tagName }
        });
        await post.addTag(tag[0]);
      }
    }

    return;
  }

  async create(tag) {
    let newTag = await TagRepository.create(tag);

    return newTag.id;
  }

  async readById(id) {
    let tag = await TagRepository.readById(id);

    if (!tag) {
      throw new NotFound(`Tag not found`);
    }
    
    return tag;
  }

  async update(id, tag) {
    let oldTag = await TagRepository.readById(id);

    if (!oldTag) {
      throw new NotFound(`Tag not found`);
    }

    await oldTag.update(tag);

    return oldTag;
  }

  async destroy(id) {
    let tag = await TagRepository.readById(id);

    if (!tag) {
      throw new NotFound(`Tag not found`);
    }

    await TagRepository.delete(tag);
  }

  async get(options) {
    return await TagRepository.get(options);
  }
  
};

export default new TagService();