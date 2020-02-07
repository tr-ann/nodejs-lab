import jwt from 'jsonwebtoken';
import Unauthorized from '../classes/errors/unauthorized';

export default async (ctx, next) => {

  let token = ctx.headers['authorization'].split(' ')[1] || null;
  if (!token) return new Unauthorized();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  await next();

  return ctx;
}