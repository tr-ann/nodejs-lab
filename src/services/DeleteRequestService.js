import DeleteRequestRepository from '../repositories/DeleteRequestRepository'
import NotFound from '../classes/errors/not-found'

class DeleteRequestService {

  async list() {
    return await DeleteRequestRepository.readAll();
  }

  async create(object) {
    let delRequest = await DeleteRequestRepository.create(object);

    return delRequest.id;
  }

  async readById(id) {
    let deleteRequest = await DeleteRequestRepository.readById(id);

    if (!deleteRequest) {
      throw new NotFound(`DeleteRequest not found`);
    }
    
    return deleteRequest;
  }

  async update(id, object) {
    let deleteRequest = await DeleteRequestRepository.readById(id);

    if (!deleteRequest) {
      throw new NotFound(`DeleteRequest not found`);
    }
    
    await deleteRequest.update(object);

    return deleteRequest;
  }

  async destroy(id) {
    let deleteRequest = await DeleteRequestRepository.readById(id);

    if (!deleteRequest) {
      throw new NotFound(`DeleteRequest not found`);
    }

    return await DeleteRequestRepository.delete(deleteRequest);
  }

  async get(options) {
    return await DeleteRequestRepository.get(options);
  }

};

export default new DeleteRequestService();