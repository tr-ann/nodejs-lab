import jwt from 'jsonwebtoken';
import ResponseFormat from '../classes/ResponseFormat'
import UserRepository from '../repositories/UserRepository'
import RefreshTokenRepository from '../repositories/RefreshTokenRepository'
import db from '../models'
import BadRequest from '../classes/errors/bad-request';
import InternalServerError from '../classes/errors/internal-server';
import Unauthorized from '../classes/errors/unauthorized';

const accessTokenSecret = 'catsarecute'
const refreshTokenSecret = 'dogsaregood'

class Authorization {

  async authorizeUser(ctx, next) {
    const user = await UserRepository.get({ 
      where: { login: ctx.request.body.login },
      attributes: [ 'id', 'login', 'password' ],
      include: [{
        model: db.role,
        attributes: [ 'name' ],
        as: 'roles'
      }]
    })

    if (!user) {
      return new BadRequest('Incorrect username or password');
    }

    if (await user.checkPassword(ctx.request.body.password)) {
      let payload = {
        id: user.id,
        roles: user.roles,
      }

      let accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '10m' });
      let refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: '10d' });

      await RefreshTokenRepository.create({ token: refreshToken });

      return ctx.body = ResponseFormat.build(
        { 
          accessToken: accessToken, 
          refreshToken: refreshToken, 
          user: {
            login: user.login,
            firstName: user.firstName,
            lastName: user.lastName
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

    let payload = jwt.verify(token, accessTokenSecret);
    
    ctx.request.body.user = await UserRepository.readById(payload.id);
    await next();

    return ctx;
  }

  getTokenPayload(ctx) {
    let token = ctx.headers['authorization'].split(' ')[1];

    return jwt.decode(token);
  }

  async refreshAccessToken(ctx, next) {
    let token = ctx.request.body.refreshToken.split(' ')[1] || null;
    if (!token) return new BadRequest();

    let tokenFromDB = await RefreshTokenRepository.get({ where: { token: token }})

    try {
      let payload = jwt.verify(tokenFromDB.token, refreshTokenSecret);

      let accessToken = jwt.sign(payload, accessTokenSecret);
      let refreshToken = jwt.sign(payload, refreshTokenSecret);

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