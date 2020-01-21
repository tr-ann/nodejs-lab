import jwt from 'jsonwebtoken';
import ResponseFormat from '../classes/ResponseFormat'
import UserRepository from '../repositories/UserRepository'
import RefreshTokenRepository from '../repositories/RefreshTokenRepository'
import db from '../models'
import BadRequest from '../classes/errors/bad-request';
import Unauthorized from '../classes/errors/unauthorized';
import UserService from '../services/UserService';

class Authorization {

  async authorizeUser(ctx, next) {
    const user = await UserRepository.get({ 
      where: { login: ctx.request.body.login },
      attributes: [ 'id', 'login', 'password' ]
    })

    if (!user) {
      return new BadRequest('Incorrect username or password');
    }

    if (await user.checkPassword(ctx.request.body.password)) {
      let roles = await UserService.getUserRoles(user.id)

      let payload = {
        userId: user.id,
        roles: roles,
      }

      let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
      let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10d' });

      await RefreshTokenRepository.create({ token: refreshToken });

      return ctx.body = ResponseFormat.build(
        { 
          accessToken: accessToken, 
          refreshToken: refreshToken, 
          user: {
            login: user.login,
            roles: roles
          } 
        },
        "Successfully logged in",
        200,
        "success"
      );
    }

    return new BadRequest('Incorrect username or password');
  }

  async authenticateToken(ctx, next) {
    const authHeader = ctx.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if (token == null) return new Unauthorized();

    let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    ctx.request.body.user = await UserRepository.readById(payload.id);
    await next();

    return ctx;
  }

  async refreshAccessToken(ctx, next) {
    let token = ctx.request.body.refreshToken.split(' ')[1] || null;
    if (!token) return new BadRequest();

    let tokenFromDB = await RefreshTokenRepository.get({ where: { token: token }})

    try {
      let payload = jwt.verify(tokenFromDB.token, process.env.REFRESH_TOKEN_SECRET);

      let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
      let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

      return ctx.body = ResponseFormat.build(
        {
          accessToken: accessToken,
          refreshToken: refreshToken
        },
        'tokens refresh succesfully',
        200,
        'success'
      )
    } finally {
      await RefreshTokenRepository.destroy(token);
    }
  }

  async logout(ctx, next) {
    let refreshToken = ctx.request.body.refreshToken.split(' ')[1];
    if (!refreshToken) return new BadRequest();

    await RefreshTokenRepository.destroy(refreshToken);

    return ctx.body = ResponseFormat.build(
      {},
      "User logged out",
      200,
      'success'
    );
  }
}

export default new Authorization();