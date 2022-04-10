const express = require('express');

const router = express.Router();

const Controllers = require('../controllers/Controllers');

const PATH = '/post';

router.post(
  PATH,
  Controllers.checkToken,
  Controllers.checkAddPost,
  Controllers.addPost,
);
router.get(PATH, Controllers.checkToken, Controllers.getAllPosts);

module.exports = router;
