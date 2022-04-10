const express = require('express');

const router = express.Router();

const Controllers = require('../controllers/Controllers');

const PATH = '/login';

router.post(PATH, Controllers.checkLoginUser, Controllers.loginUser);

module.exports = router;
