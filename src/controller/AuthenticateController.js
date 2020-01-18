import Unauthorized from '../classes/errors/unauthorized'
import passport from '../middleware/passport'
import jwt from 'jsonwebtoken'

class AuthenticateController {

  async login(ctx, next) {
    await passport.authenticate('local', function (err, user) {
      if (user == false) {
        ctx.body = "Login failed";
      } else {
        const payload = {
          id: user.id,
          login: user.login,
        };
        const token = jwt.sign(payload, 'mysecretkey'); //здесь создается JWT
        
        ctx.body = {user: user.login, token: 'JWT ' + token};
      }
    })(ctx, next);  
  }

  async isAuthenticated(ctx, next) {
    await passport.authenticate('jwt', function (err, user) {
      if (user) {
        next();
      } else {
        new Unauthorized();
      }
    } )(ctx, next)  
  }

  async logout(ctx, next) {
    await ctx.logout();
  }

}

export default new AuthenticateController();