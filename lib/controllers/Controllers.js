const Middlewares = require('../middlewares/Middlewares');
const Services = require('../services/Services');

module.exports = class Controllers {
  static checkAddUser(req, res, next) {
    const { email, password, displayName } = req.body;
    if (!Middlewares.addUserValues(displayName, email, password)) {
      const { status, data } = Middlewares.validateAddUser(req.body);
      return res.status(status).send(data);
    }
    next();
  }

  static checkLoginUser(req, res, next) {
    const { email, password } = req.body;
    if (!Middlewares.loginUserValues(email, password)) {
      const { status, data } = Middlewares.validateLoginUser(req.body);
      return res.status(status).send(data);
    }
    next();
  }

  static checkAddCategory(req, res, next) {
    const { name } = req.body;
    if (!Middlewares.categoryName(name)) {
      const { status, data } = Middlewares.validateAddCategory();
      return res.status(status).send(data);
    }
    next();
  }

  static checkAddPost(req, res, next) {
    const { title, content, categoryIds } = req.body;
    if (!Middlewares.addPostValues(title, content, categoryIds)) {
      const { status, data } = Middlewares.validateAddPost(req.body);
      return res.status(status).send(data);
    }
    next();
  }

  static async checkToken(req, res, next) {
    const { authorization: token } = req.headers;
    const tokenResult = await Middlewares.authenticateToken(token);
    if (tokenResult === false) {
      const { status, data } = Middlewares.tokenMsg(token);
      return res.status(status).send(data);
    }
    req.body.userId = tokenResult.id;
    next();
  }

  static async addUser(req, res) {
    const { status, data } = await Services.createUser(req.body);
    return res.status(status).send(data);
  }

  static async loginUser(req, res) {
    const { email } = req.body;
    const { status, data } = await Services.loginUser(email);
    return res.status(status).send(data);
  }

  static async getAllUsers(_req, res) {
    const { status, data } = await Services.getAllUsers();
    return res.status(status).send(data);
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    const { status, data } = await Services.getUserById(id);
    return res.status(status).send(data);
  }

  static async addCategory(req, res) {
    const { status, data } = await Services.addCategory(req.body);
    return res.status(status).send(data);
  }

  static async getAllCategories(req, res) {
    const { status, data } = await Services.getAllCategories();
    return res.status(status).send(data);
  }

  static async addPost(req, res) {
    const { status, data } = await Services.createPost(req.body);
    return res.status(status).send(data);
  }

  static async getAllPosts(_req, res) {
    const { status, data } = await Services.getAllPosts();
    return res.status(status).send(data);
  }
};
