import TagRepository from '../repositories/TagRepository'
import NotFound from '../classes/errors/not-found'

class TagService {

  async list() {
    return await TagRepository.readAll();
  }

  async create(tag) {
    return await TagRepository.create(tag);
  }

  async readById(id) {
    let tag = await TagRepository.readById(id);

    if (!tag) {
      throw new NotFound(`Tag not found`);
    }
    
    return tag;
  }

  async findOrCreate(options) {
    return await TagRepository.findOrCreate(options);
  }

  async update(id, tag) {
    return await TagRepository.update(id, tag);
  }

  async destroy(id) {
    let tag = await TagRepository.readById(id);

    if (!tag) {
      throw new NotFound(`Tag not found`);
    }

    await TagRepository.delete(tag);
  }

  async getAll(options) {
    return await TagRepository.getAll(options);
  }

  async get(options) {
    return await TagRepository.get(options);
  }
};

export default new TagService();