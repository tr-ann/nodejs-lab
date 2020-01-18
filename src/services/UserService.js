import UserRepository from '../repositories/UserRepository'
import NotFound from '../classes/errors/not-found'
import Hash from '../classes/hash'

class UserService {

  async create(user) {
    let newUser = await UserRepository.create(user);

    // exclude option???

    delete newUser.dataValues.password;
    delete newUser._previousDataValues.password;

    return newUser;
  }

  async list() {
    return await UserRepository.readAll();
  }

  async readById(id) {

    let user = await UserRepository.readById(id);

    if (!user) {
      throw new NotFound('User not found');
    }

    delete user.dataValues.password;
    delete user._previousDataValues.password;
    
    return user;
  }

  async update(id, user) {

    let oldUser = await UserRepository.readById(id);

    if (!oldUser) {
      throw new NotFound('User not found');
    }
    
    if(user.password)
      user.password = Hash.get(user.password);

    await UserRepository.update(id, user);

    return await UserRepository.readById(id);
  }

  async destroy(id) {

    let user = await UserRepository.readById(id);
    
    if (!user) {
      throw new NotFound('User not found');
    }
      
    return await UserRepository.destroy(id);
  }

  async get(options) {        
    return await UserRepository.get(options);
  }

  async getAll(options) {        
    return await UserRepository.getAll(options);
  }
}

export default new UserService();