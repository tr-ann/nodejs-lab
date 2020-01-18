import DeleteRequestRepository from '../repositories/DeleteRequestRepository'
import NotFound from '../classes/errors/not-found'

class DeleteRequestService {

  async list() {
    return await DeleteRequestRepository.readAll();
  }

  async create(deleteRequest) {
    return await DeleteRequestRepository.create(deleteRequest);
  }

  async readById(id) {
    let deleteRequest = await DeleteRequestRepository.readById(id);

    if (!deleteRequest) {
      throw new NotFound(`DeleteRequest not found`);
    }
    
    return deleteRequest;
  }

  async update(id, deleteRequest) {
    return await DeleteRequestRepository.update(id, deleteRequest);
  }

  async destroy(id) {
    let deleteRequest = await DeleteRequestRepository.readById(id);

    if (!deleteRequest) {
      throw new NotFound(`DeleteRequest not found`);
    }

    await DeleteRequestRepository.delete(deleteRequest);
  }

  async getAll(options) {
    return await DeleteRequestRepository.getAll(options);
  }

  async get(options) {
    return await DeleteRequestRepository.get(options);
  }
};

export default new DeleteRequestService();