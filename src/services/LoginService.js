import NotFound from '../classes/errors/not-found'
import UserRepository from '../repositories/UserRepository';
import BadRequest from '../classes/errors/bad-request';
import { createTokens } from '../classes/tokens';
import RefreshTokenRepository from '../repositories/RefreshTokenRepository';
import jwt from 'jsonwebtoken'

class LoginService {

  async authenticateWithJWT(reqBody) {
    let user = (await UserRepository.get({ 
      where: { login: reqBody.login },
      attributes: [ 'id', 'login', 'password' ]
    }))[0];

    if (!user) {
      return new BadRequest('Incorrect username or password');
    }

    if (!(await user.checkPassword(reqBody.password))) {
      throw new BadRequest('Incorrect username or password');
    }

    let payload = {
      userId: user.id,
      login: user.login,
    }

    let tokens = createTokens(payload);

    await RefreshTokenRepository.create({ token: tokens.refreshToken });

    return tokens;
  }

  async refreshJWT(refreshToken) {
    if (!refreshToken) return new BadRequest();

    let tokenFromDB = await RefreshTokenRepository.get({ where: { token: refreshToken }});
    if (!tokenFromDB) throw new NotFound('token not found');

    let payload = jwt.verify(tokenFromDB.token, process.env.REFRESH_TOKEN_SECRET);

    let newTokens = createTokens(payload);

    await RefreshTokenRepository.destroy(token);

    return newTokens;
  }
  
};

export default new LoginService();