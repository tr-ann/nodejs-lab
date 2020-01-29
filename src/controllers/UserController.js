import UserService from '../services/UserService'
import ResponseFormat from '../classes/ResponseFormat'
import RefreshTokenRepository from '../repositories/RefreshTokenRepository'
import jwt from 'jsonwebtoken'
import BadRequest from '../classes/errors/bad-request'
import DeleteRequestService from '../services/DeleteRequestService'
import getTokenPayload from '../classes/tokenPayload'

class UserController {

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
    let user = await UserService.update(ctx.params.id, {
      lastName: ctx.request.body.lastName,
      firstName: ctx.request.body.firstName,
    });

    ctx.body = ResponseFormat.build(
      user,
      "user Update successfully",
      200,
      "success"
    );

    return ctx;
  }

  async sendDeleteRequest(ctx, next) {
    let payload = getTokenPayload(ctx.headers['authorization']);

    console.log(payload);
    console.log(ctx.params);

    if (payload.userId !== +ctx.params.id) throw new BadRequest();

    await DeleteRequestService.create({ userId: payload.userId });

    return ctx.body = ResponseFormat.build(
      {},
      'Delete request created successfully',
      201,
      'success'
    )
  }
}

export default new UserController();