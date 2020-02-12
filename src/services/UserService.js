import UserRepository from '../repositories/UserRepository'
import NotFound from '../classes/errors/not-found'
import Hash from '../classes/hash'
import BadRequest from '../classes/errors/bad-request';
import RoleService from './RoleService';
import DeleteRequestService from './DeleteRequestService';

class UserService {

  async create(reqBody) {
    let isExistingUser = await UserRepository.get({ where: { login: reqBody.login }});

    if (isExistingUser[0]) {
      throw new BadRequest('login must be unique');
    }
    
    if (!this.isConfirmedPassword(reqBody.password, reqBody.confirmedPassword)) {
      throw new BadRequest('password not confirmed');
    }

    let newUser = await UserRepository.create({
      login: reqBody.login,
      firstName: reqBody.firstName,
      lastName: reqBody.lastName,
      password: reqBody.password
    });

    let defaultRole = await RoleService.get({ where: { name: 'authenticated user'}})
    newUser.addRole(defaultRole);

    return newUser.id;
  }

  async list(pagination, options) {
    return await UserRepository.readAll(pagination, options);
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

  async update(id, reqBody) {

    let oldUser = await UserRepository.readById(id);

    if (!oldUser) {
      throw new NotFound('User not found');
    }
    
    if (reqBody.newPassword) {
      oldUser = await this.changePassword(oldUser, reqBody);
    }

    await oldUser.update({
      lastName: reqBody.lastName,
      firstName: reqBody.firstName,
    });

    return oldUser;
  }

  async changePassword(user, newData) {
    if (!(await user.checkPassword(newData.oldPassword))) {
      throw new BadRequest('wrong old password');
    }
    
    if (!(this.isConfirmedPassword(newData.newPassword, newData.confirmedPassword))) {
      throw new BadRequest('password is not confirmed');
    }

    await user.update({ password: newData.newPassword });

    return user;
  }

  async destroy(deleteRequestId) {

    let request = await DeleteRequestService.readById(deleteRequestId);
    if(!request) {
      throw new NotFound('request not found');
    }

    let user = await UserRepository.readById(request.user.id);
    if (!user) {
      throw new NotFound('User not found');
    }

    return await UserRepository.destroy(user.id);
  }

  async get(options) {
    return await UserRepository.get(options);
  }

  async getUserPosts(login, options) {
    let user = await UserRepository.get({ where: { login: login }});

    return await user.getPosts(options);
  }

  isConfirmedPassword(password, confirmedPassword) {
    if (password !== confirmedPassword) {
      return false;
    }
    return true;
  }

  async addRole( userId, roleName) {

    let role = await RoleService.get({ where: { name: roleName }});
    let user = await this.readById(userId);

    await user.addRole(role);

    return;
  }

  async removeRole(userId, roleName) {
    let user = await this.readById(userId);

    let userRole = await user.getRoles({ where: { name: roleName }})

    if(userRole[0]) {
      //let role = await RoleService.get({ where: { name: roleName }});
      await user.removeRole(userRole[0]);
    }
    else throw new BadRequest('user has not such role');
  }
  
}

export default new UserService();