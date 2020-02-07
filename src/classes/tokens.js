import jwt from 'jsonwebtoken'

function getTokenPayload(authHeader) {
  let token = authHeader.split(' ')[1];

  return jwt.decode(token);
}

function createTokens(payload) {
  let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
  let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10d' });

  return {
    accessToken,
    refreshToken
  }
}

export { getTokenPayload, createTokens } 