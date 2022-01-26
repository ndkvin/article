const jwt = require('jsonwebtoken');
const AutehticationsError = require('../../exceptions/AuthenticationError');

const TokenManager = {
  generateAccessToken: (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '5m' }),
  generateRefreshToken: (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '7d' }),
  verifyRefreshToken: (refreshToken) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        throw new AutehticationsError('refresh token yang dimasukan salah');
      }

      return decoded;
    });
  },
};

module.exports = TokenManager;
