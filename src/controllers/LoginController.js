import LoginService from "../services/LoginService";
import ResponseFormat from '../classes/ResponseFormat'

class LoginController {

  async authenticateWithJWT(ctx, next) {

    let tokens = await LoginService.authenticateWithJWT(ctx.request.body);
    
    return ctx.body = ResponseFormat.build(
      tokens,
      "Successfully logged in",
      200,
      "success"
    );
  }

  async refreshJWT(ctx, next) {

    let token = ctx.request.body.refreshToken.split(' ')[1] || null;
    let newTokens = await LoginService.refreshJWT(token);

    return ctx.body = ResponseFormat.build(
      newTokens,
      'tokens refresh successfully',
      200,
      'success'
    )
  }

}

export default new LoginController();