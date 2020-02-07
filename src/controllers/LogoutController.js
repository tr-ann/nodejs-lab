import LogoutService from "../services/LogoutService";
import ResponseFormat from '../classes/ResponseFormat';

class LogoutController {

  async logout(ctx, next) {
    
    let refreshToken = ctx.request.body.refreshToken.split(' ')[1];
    await LogoutService.logoutWithJWT(refreshToken);

    return ctx.body = ResponseFormat.build(
      {},
      "User logged out",
      204,
      'success'
    );
  }
  
}

export default new LogoutController();