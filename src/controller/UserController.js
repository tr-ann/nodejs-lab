import UserService from '../services/UserService'
import RoleService from '../services/RoleService'
import ResponseFormat from '../classes/ResponseFormat'
import RefreshTokenRepository from '../repositories/RefreshTokenRepository'
import jwt from 'jsonwebtoken'
import BadRequest from '../classes/errors/bad-request'
import DeleteRequestService from '../services/DeleteRequestService'
import getTokenPayload from '../classes/tokenPayload'

class UserController {

  async create(ctx, next) {
    const user = await UserService.create({
      login: ctx.request.body.login,
      firstName: ctx.request.body.firstName,
      lastName: ctx.request.body.lastName,
      password: ctx.request.body.password
    });

    ctx.state.userId = user.id;
    await next();
    
    ctx.status = 201;
    ctx.body = ResponseFormat.build(
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

    return ctx;
  }

  async register(ctx, next) {
    if (ctx.request.body.password === ctx.request.body.confirmedPassword) {
      await next();
    }
    else throw new BadRequest('password not confirmed');

    let payload = {
      userId: ctx.body.data.id,
      roles: ctx.state.roles
    }

    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

    ctx.body.data['accessToken'] = accessToken;
    ctx.body.data['refreshToken'] = refreshToken;

    await RefreshTokenRepository.create({ token: refreshToken });

    return ctx;
  }

  async addRole(ctx, next) {
    let roleName = ctx.request.body.roleName || 'authorized user';
    let role = await RoleService.get({ where: { name: roleName }});
    let user = await UserService.readById(ctx.state.userId)

    await user.addRole(role);
    ctx.state.roles = await UserService.getUserRoles(ctx.state.userId);
  }
  
  async deleteRole(ctx, next) {
    let role = await RoleService.get({ where: { name: ctx.request.body.roleName }});

    await ctx.state.user.removeRole(role);
    ctx.state.roles = await UserService.getUserRoles(user.id);
  }

  async list(ctx, next) {
    let users = await UserService.list();
    
    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      users, 
      "Users read successfully", 
      200, 
      "success"
    );

    return ctx;
  }

  async readById(ctx, next) {
    let user = await UserService.readById(ctx.params.id);

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      user,
      "User read successfully",
      200,
      "success"
    );

    return ctx;
  }
  
  async update(ctx, next) {
    let user = await UserService.update(ctx.params.id, {
      lastName: ctx.request.body.lastName,
      firstName: ctx.request.body.firstName,
    });

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      user,
      "user Update successfully",
      200,
      "success"
    );

    return ctx;
  }
  
  async destroy (ctx, next) {
    await UserService.destroy(ctx.params.id)
    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      {},
      "User deleted successfully",
      200,
      "success"
    )

    return ctx;
  }

  async sendDeleteRequest(ctx, next) {
    let payload = getTokenPayload(ctx.headers['authorization']);

    await DeleteRequestService.create(payload.userId);

    return ctx.body = ResponseFormat.build(
      {},
      'Delete request created successfully',
      201,
      'success'
    )
  }
}

export default new UserController();