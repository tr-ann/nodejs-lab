import UserService from '../services/UserService'
import ResponseFormat from '../classes/ResponseFormat'
import BadRequest from '../classes/errors/bad-request'
import { getTokenPayload } from '../classes/tokens'
import getPagination from '../classes/pagination'
import Mailer from '../mailer/Mailer'

class UserController {

  async create(ctx, next) {
    let userId = await UserService.create(ctx.request.body);

    ctx.state.userId = userId;

    await next();
    
    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      `user id: ${userId}`, 
      "User created successfully", 
      201, 
      "success"
    );


    return ctx;
  }

  async list(ctx, next) {
    let pagination = getPagination(ctx.request.query);

    let options = {};
    if (ctx.request.query.role) {
      options.name = ctx.request.query.role;
    }

    let users = await UserService.list(pagination, options);
    
    return ctx.body = ResponseFormat.build(
      users, 
      "Users read successfully", 
      200, 
      "success"
    );
  }

  async readById(ctx, next) {
    let user = await UserService.readById(ctx.params.id);

    ctx.body = ResponseFormat.build(
      user,
      "User read successfully",
      200,
      "success"
    );

    return ctx;
  }
  
  async update(ctx, next) {
    let user = await UserService.update(ctx.params.id, ctx.request.body);

    ctx.body = ResponseFormat.build(
      user,
      "user Update successfully",
      200,
      "success"
    );

    return ctx;
  }

  async addRole(ctx, next) {
    let role = ctx.request.body.role || 'authenticate user';
    let userId = ctx.params.id || ctx.state.userId;

    await UserService.addRole(userId, role);
    
    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      {},
      'role added successfully',
      200,
      'success'
    );

    return ctx;
  }
  
  async deleteRole(ctx, next) {
    if (getTokenPayload(ctx.headers['authorization']).userId == ctx.params.id)
      return new BadRequest();

    await UserService.removeRole(ctx.params.id, ctx.request.body.role);

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      {},
      'role deleted successfully',
      200,
      'success'
    );

    return ctx;
  }

  async destroy(ctx, next) {
    
    let userLogin = await UserService.get({
      attributes: [ 'login' ],
      where: { id: ctx.params.id }
    })
    await Mailer.sendMail(userLogin);

    await UserService.destroy(ctx.params.id);

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      {},
      "User deleted successfully",
      200,
      "success"
    );

    return ctx;
  }
}

export default new UserController();