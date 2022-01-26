const router = require('express').Router();

const users = require('../api/users');

router.use('/users', users);

module.exports = router;
