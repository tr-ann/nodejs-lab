import { getTokenPayload } from '../classes/tokens'

import BadRequest from '../classes/errors/bad-request';
import UserService from '../services/UserService';
import Forbidden from '../classes/errors/forbidden';
import PostService from '../services/PostService';
import db from '../models';

class Filter {
  async itself(ctx, next) {
    let idFromPayload = getTokenPayload(ctx.headers['authorization']).userId;
    if (idFromPayload === ctx.params.id) {
      await next();
    } 
    else throw new BadRequest('it is not the owner');
  }

  async isPostOwner(ctx, next) {
    let currentUserId = getTokenPayload(ctx.headers['authorization']).userId;
  
    let post = (await PostService.get({ where: { id: ctx.params.id }}))[0];
  
    if (currentUserId === post.userId) {
      await next();
    } 
    else throw new BadRequest('it is not the owner');
  }

  async isAdmin(ctx, next) {
    let userId = getTokenPayload(ctx.headers['authorization']).userId;
    let adminUser = (await UserService.get({
      model: db.user,
      attributes: [ 'id' ],
      include: [{
        model: db.role,
        attributes: [ 'name' ],
        as: 'roles',
        where: { name: 'admin' }
      }],
      where: { id: userId }
    }))[0];
  
    if (adminUser) {
      await next();
    }
    else throw new Forbidden();
  }

}

export default new Filter();