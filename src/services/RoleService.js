import RoleRepository from '../repositories/RoleRepository'
import NotFound from '../classes/errors/not-found'

class RoleService {

  async list() {
    return await RoleRepository.readAll();
  }

  async create(role) {
    return await RoleRepository.create(role);
  }

  async readById(id) {
    let role = await RoleRepository.readById(id);

    if (!role) {
      throw new NotFound(`Role not found`);
    }
    
    return role;
  }

  async update(id, role) {
    return await RoleRepository.update(id, role);
  }

  async destroy(id) {
    let role = await RoleRepository.readById(id);

    if (!role) {
      throw new NotFound(`Role not found`);
    }

    await RoleRepository.delete(role);
  }

  async getAll(options) {
    return await RoleRepository.getAll(options);
  }

  async get(options) {
    return await RoleRepository.get(options);
  }
  
};

export default new RoleService();