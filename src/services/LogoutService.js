import NotFound from '../classes/errors/not-found';
import BadRequest from '../classes/errors/bad-request';
import RefreshTokenRepository from '../repositories/RefreshTokenRepository';

class LogoutService {

  async logoutWithJWT(refreshToken) {
    if (!refreshToken) throw new BadRequest();

    let token = RefreshTokenRepository.get({where: { token: token }});
    if (!token) throw new NotFound('token not found');

    await RefreshTokenRepository.destroy(token);

    return;
  }
  
};

export default new LogoutService();