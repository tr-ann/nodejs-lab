import UserService from '../services/UserService'
import DeleteRequestsService from '../services/DeleteRequestService'
import RoleService from '../services/RoleService'

import ResponseFormat from '../classes/ResponseFormat'
import getTokenPayload from '../classes/tokenPayload'
import BadRequest from '../classes/errors/bad-request';

class AdminController {

  async usersList(ctx, next) {
    let page = ctx.request.query.page || 1;
    let offset = (page - 1) * +process.env.PAGE_SIZE;

    let options = {};
    if (ctx.request.query.role) {
      options.name = ctx.request.query.role;
    }

    let users = await UserService.list(+process.env.PAGE_SIZE, offset, options);
    
    return ctx.body = ResponseFormat.build(
      users, 
      "Users read successfully", 
      200, 
      "success"
    );
  }

  async deleteRequestsList(ctx, next) {
    let list = await DeleteRequestsService.list();

    return ctx.body = ResponseFormat.build(
      list,
      'Delete requests read succesfully',
      200,
      'success'
    );
  }

  async addRole(ctx, next) {
    let roleName = ctx.request.body.roleName || 'authorized user';
    let role = await RoleService.get({ where: { name: roleName }});
    let userId = ctx.state.userId || ctx.params.id;
    let user = await UserService.readById(userId);

    await user.addRole(role);
    ctx.state.roles = await UserService.getUserRoles(userId);
    
    return ctx.body = ResponseFormat.build(
      { 
        user: user,
        roles: ctx.state.roles
      },
      'role added succesfully',
      200,
      'success'
    );
  }
  
  async deleteRole(ctx, next) {
    if (getTokenPayload(ctx.headers['authorization']).userId == ctx.params.id)
      return new BadRequest();

    let role = await RoleService.get({ where: { name: ctx.request.body.roleName }});

    let user = await UserService.readById(ctx.params.id);

    await user.removeRole(role);
    let roles = await UserService.getUserRoles(user.id);

    return ctx.body = ResponseFormat.build(
      {},
      'role deleted succesfully',
      200,
      'success'
    );
  }

  async create(ctx, next) {
    const user = await UserService.create({
      login: ctx.request.body.login,
      firstName: ctx.request.body.firstName,
      lastName: ctx.request.body.lastName,
      password: ctx.request.body.password
    });

    ctx.state.userId = user.id;
    await next();
    
    return ctx.body = ResponseFormat.build(
      {
        id: user.id,
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: ctx.state.roles
      }, 
      "User created successfully", 
      201, 
      "success"
    );
  }

  async destroy (ctx, next) {
    let request = await DeleteRequestsService.readById(ctx.params.id);

    await UserService.destroy(request.user.id);

    return ctx.body = ResponseFormat.build(
      {},
      "User deleted successfully",
      200,
      "success"
    )
  }
}

export default new AdminController();