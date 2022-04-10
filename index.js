require('dotenv').config();
require('./lib/database');
const { green, magenta, white } = require('colorette');
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./lib/routes/user.routes');
const login = require('./lib/routes/login.routes');
const categories = require('./lib/routes/categories.routes');
const post = require('./lib/routes/post.routes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/', user, login, categories, post);

app.listen(
  PORT,
  () => console.log(green(`[SUCCESS] - ${white('Listening on port')} ${magenta(PORT)}`)),
  );
