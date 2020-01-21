import getTokenPayload from '../classes/tokenPayload'

import BadRequest from '../classes/errors/bad-request';
import UserService from '../services/UserService';
import Forbidden from '../classes/errors/forbidden';
import PostService from '../services/PostService';

async function isOwner(ctx, next) {
  let idFromPayload = getTokenPayload(ctx.headers['authorization']).userId;
  let idFromRequest = ctx.params.id;
  if (idFromPayload === idFromRequest) {
    await next();
  } 
  else throw new BadRequest('it is not the owner');
};

async function isPostOwner(ctx, next) {
  let userIdFromToken = getTokenPayload(ctx.headers['authorization']).userId;
  let postId = ctx.params.id;

  let post = await PostService.readById(postId);

  if (userIdFromToken === post.user.id) {
    await next();
  } 
  else throw new BadRequest('it is not the owner');
};

async function isAdmin(ctx, next) {
  let userId = getTokenPayload(ctx.headers['authorization']).userId;
  let userRoles = await UserService.getUserRoles(userId);

  if (userRoles.includes('admin')) {
    await next();
  }
  else throw new Forbidden();
};

export { isOwner, isPostOwner, isAdmin };