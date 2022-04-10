const express = require('express');

const router = express.Router();

const Controllers = require('../controllers/Controllers');

const PATH = '/user';
const PATH_ID = '/user/:id';

router.post(PATH, Controllers.checkAddUser, Controllers.addUser);
router.get(PATH, Controllers.checkToken, Controllers.getAllUsers);
router.get(PATH_ID, Controllers.checkToken, Controllers.getUserById);

module.exports = router;
