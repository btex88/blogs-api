const _ = require('lodash');
const Users = require('../models/Users');
const Categories = require('../models/Categories');
const JWT = require('../helpers/JWT');
const Messages = require('../helpers/Messages');
const BlogPosts = require('../models/BlogPosts');
const PostsCategories = require('../models/PostsCategories');

module.exports = class Services {
  static async findUserBy(key, value) {
    const options = { where: { [key]: value } };
    const user = await Users.findOne(options);
    return user;
  }

  static async findPostsCategoriesBy(key, value) {
    const options = { where: { [key]: value } };
    const user = await PostsCategories.findOne(options);
    return user;
  }

  static async findAllUsers() {
    const allUsers = await Users.findAll();
    return allUsers;
  }

  static async findAllCategories() {
    const allCategories = await Categories.findAll();
    return allCategories;
  }

  static async findAllPosts() {
    const allPosts = await BlogPosts.findAll();
    return allPosts;
  }

  static async findCategoryBy(key, value) {
    const options = { where: { [key]: value } };
    const category = await Categories.findOne(options);
    return category;
  }

  static async createUser(body) {
    try {
      if (await this.findUserBy('email', body.email)) {
        return Messages.user().registered;
      }
      const user = await Users.create(body);
      const token = JWT.create(user.dataValues.id);
      return Messages.success({ token });
    } catch (err) {
      return Messages.teapot(err);
    }
  }

  static async createPost(body) {
    try {
      const { categoryIds } = body;
      const categoryValidation = await categoryIds.reduce(async (acc, id) => {
        const category = await this.findCategoryBy('id', id);
        acc.push(!_.isEmpty(category));
        return acc;
      }, []);
      if (categoryValidation.every((category) => category)) {
        const blogPost = await BlogPosts.create(body);
        return Messages.success(blogPost);
      }
      return Messages.addPost().inexistentCategoryIds;
    } catch (err) {
      return Messages.teapot(err);
    }
  }

  static async loginUser(email) {
    try {
      const user = await this.findUserBy('email', email);
      return user
        ? Messages.ok({ token: JWT.create(user.dataValues.id) })
        : Messages.loginUser().invalidFields;
    } catch (err) {
      return Messages.teapot(err);
    }
  }

  static async getAllUsers() {
    try {
      const allUsers = await this.findAllUsers();
      return Messages.ok(allUsers);
    } catch (err) {
      return Messages.teapot(err);
    }
  }

  static async getUserById(id) {
    try {
      const user = await this.findUserBy('id', id);
      return user ? Messages.ok(user.dataValues) : Messages.user().inexistent;
    } catch (err) {
      return Messages.teapot(err);
    }
  }

  static async addCategory(body) {
    try {
      if (await this.findCategoryBy('name', body.name)) {
        return Messages.addCategory().registered;
      }
      const category = await Categories.create(body);
      return Messages.success(category.dataValues);
    } catch (err) {
      return Messages.teapot(err);
    }
  }

  static async getAllCategories() {
    try {
      const allCategories = await this.findAllCategories();
      return Messages.ok(allCategories);
    } catch (err) {
      return Messages.teapot(err);
    }
  }

  static async getAllPosts() {
    try {
      const [posts] = await this.findAllPosts();
      const { dataValues: user } = await this.findUserBy('id', posts.dataValues.userId);
      const { dataValues: { categoryId } } = await this.findPostsCategoriesBy(
        'postId', posts.dataValues.id,
      );
      const { dataValues: { id, name } } = await this.findCategoryBy('id', categoryId);
      const result = [{
          ...posts.dataValues,
          user: { ...user },
          categories: [{ id, name }],
        }];
      return Messages.ok(result);
    } catch (err) {
      return Messages.teapot(err);
    }
  }
};
