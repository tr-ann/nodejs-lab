import jwt from 'jsonwebtoken'

export default function getTokenPayload(authHeader) {
  let token = authHeader.split(' ')[1];

  return jwt.decode(token);
}