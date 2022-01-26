const router = require('express').Router();
const ClientError = require('../exceptions/ClientError');
const usersValidator = require('../validator/users');
const UserService = require('../service/postgres/UserServices');
const verivyAccessToken = require('../middleware/jwt/verifyAccessToken');
const TokenManager = require('../middleware/jwt/TokenManager');

const userService = new UserService();

router.post('/', verivyAccessToken, async (req, res) => {
  try {
    usersValidator.validateUserPayload(req.body);
    await userService.addUser(req.body);

    const token = TokenManager.generateAccessToken({
      id: 'user-132',
    });
    console.log(req.id);
    res.status(201).json({
      status: 'success',
      message: 'berhasil',
      token,
    });
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
});

module.exports = router;
