import RoleRepository from '../repositories/RoleRepository'
import NotFound from '../classes/errors/not-found'

class RoleService {

  async list() {
    return await RoleRepository.readAll();
  }

  async create(role) {
    let newRole = await RoleRepository.create(role);

    return newRole.id;
  }

  async readById(id) {
    let role = await RoleRepository.readById(id);

    if (!role) {
      throw new NotFound(`Role not found`);
    }
    
    return role;
  }

  async update(id, role) {
    let oldRole = await RoleRepository.readById(id);

    if (!oldRole) {
      throw new NotFound(`Role not found`);
    }

    await oldRole.update(role);

    return oldRole;
  }

  async destroy(id) {
    let role = await RoleRepository.readById(id);

    if (!role) {
      throw new NotFound(`Role not found`);
    }

    await RoleRepository.delete(role);
  }

  async get(options) {
    return await RoleRepository.get(options);
  }
  
};

export default new RoleService();