const express = require('express');

const router = express.Router();

const Controllers = require('../controllers/Controllers');

const PATH = '/categories';

router.post(
  PATH,
  Controllers.checkToken,
  Controllers.checkAddCategory,
  Controllers.addCategory,
);
router.get(PATH, Controllers.checkToken, Controllers.getAllCategories);

module.exports = router;
