const jwt = require('jsonwebtoken');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const ClientError = require('../../exceptions/ClientError');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({
        status: 'error',
        messsage: 'masukan',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      req.id = decoded.id;
      next();
    } catch {
      throw new AuthenticationError('login kembali');
    }
  } catch (e) {
    if (e instanceof ClientError) {
      res.status(e.statusCode).json({
        status: 'error',
        message: e.message,
      });
    }

    console.log(e);
    res.status(500).json({
      status: 'fail',
      message: 'terjadi kegagalan pada server',
    });
  }
};
